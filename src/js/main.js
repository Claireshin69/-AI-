/**
 * 맘별AI 자기이해 미니리포트 - 메인 애플리케이션 라우터 및 이벤트 컨트롤러
 */

import { QUESTIONS, QUESTION_CATEGORIES } from './questionsData.js';
import { analyzeAnswers } from './aiAnalyzer.js';
import { StorageManager } from './storageManager.js';
import { renderReportHTML, downloadReportPDF } from './pdfExporter.js';
import { Chart, RadarController, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';

// Chart.js 모듈 등록
Chart.register(RadarController, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

// 애플리케이션 런타임 상태
let currentQIndex = 0;
let profile = StorageManager.getProfile() || { name: '', ageGroup: '50대', interest: '' };
let userAnswers = StorageManager.getAnswers() || {};
let analysisResult = StorageManager.getReport() || null;

// DOM 요소 참조
const views = {
  landing: document.getElementById('view-landing'),
  profile: document.getElementById('view-profile'),
  question: document.getElementById('view-question'),
  loading: document.getElementById('view-loading'),
  report: document.getElementById('view-report')
};

// 1. 화면 전환 함수
function switchView(targetViewKey) {
  Object.keys(views).forEach(key => {
    if (views[key]) views[key].classList.remove('active');
  });
  if (views[targetViewKey]) {
    views[targetViewKey].classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// 2. 글자 크기 조절 컨트롤 (보통, 크게, 더크게)
function initFontControl() {
  const btnSm = document.getElementById('btn-font-sm');
  const btnMd = document.getElementById('btn-font-md');
  const btnLg = document.getElementById('btn-font-lg');

  const buttons = [btnSm, btnMd, btnLg];

  function setActiveFont(btn, sizeClass) {
    buttons.forEach(b => b?.classList.remove('active'));
    btn?.classList.add('active');

    document.documentElement.classList.remove('font-size-sm', 'font-size-md', 'font-size-lg');
    document.body.classList.remove('font-size-sm', 'font-size-md', 'font-size-lg');

    const targetClass = sizeClass || 'font-size-sm';
    document.documentElement.classList.add(targetClass);
    document.body.classList.add(targetClass);
  }

  btnSm?.addEventListener('click', () => setActiveFont(btnSm, 'font-size-sm'));
  btnMd?.addEventListener('click', () => setActiveFont(btnMd, 'font-size-md'));
  btnLg?.addEventListener('click', () => setActiveFont(btnLg, 'font-size-lg'));
}

// 3. 질문 화면 동적 렌더링
function renderQuestionStep(index) {
  const q = QUESTIONS[index];
  if (!q) return;

  const category = QUESTION_CATEGORIES[q.category];
  
  // 진행률 업데이트
  document.getElementById('progress-category').textContent = category.title;
  document.getElementById('progress-step-text').textContent = `${index + 1} / ${QUESTIONS.length}`;
  const progressPercent = ((index + 1) / QUESTIONS.length) * 100;
  document.getElementById('progress-bar-fill').style.width = `${progressPercent}%`;

  // 질문 카드 내용 작성
  const cardBox = document.getElementById('question-card-box');
  const currentAnswer = userAnswers[q.id];

  let inputHTML = '';

  if (q.type === 'choice' || q.type === 'choice_with_text') {
    inputHTML = `
      <div class="options-grid">
        ${q.options.map(opt => {
          const isSelected = currentAnswer && currentAnswer.optionId === opt.id;
          return `
            <div class="option-card ${isSelected ? 'selected' : ''}" data-opt-id="${opt.id}">
              <div class="option-radio"></div>
              <div class="option-content">
                <h4>${opt.text}</h4>
                ${opt.desc ? `<p>${opt.desc}</p>` : ''}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    if (q.type === 'choice_with_text') {
      const customTextVal = currentAnswer ? (currentAnswer.text || '') : '';
      inputHTML += `
        <textarea id="q-custom-text" class="custom-textarea" placeholder="${q.placeholder || ''}">${customTextVal}</textarea>
      `;
    }
  } else if (q.type === 'scale') {
    const defaultVal = currentAnswer ? currentAnswer.scaleValue : q.defaultValue;
    inputHTML = `
      <div class="scale-container">
        <input type="range" id="q-scale-range" class="scale-slider" min="0" max="100" value="${defaultVal}">
        <div class="scale-labels">
          <span>${q.minText}</span>
          <span>${q.maxText}</span>
        </div>
        <div class="scale-value-display"><span id="q-scale-val-num">${defaultVal}</span>%</div>
      </div>
    `;
  } else if (q.type === 'text_input') {
    const textVal = currentAnswer ? currentAnswer.text : q.defaultValue;
    inputHTML = `
      <textarea id="q-text-input" class="custom-textarea" placeholder="${q.placeholder}">${textVal}</textarea>
    `;
  }

  cardBox.innerHTML = `
    <!-- AI 클레어 조언 배지 -->
    <div class="character-guide-box" style="margin-bottom: 20px; padding: 16px 20px;">
      <div class="character-avatar" style="width: 44px; height: 44px; font-size: 1.3rem;">👩‍🏫</div>
      <div class="character-content">
        <div class="character-name">AI 클레어</div>
        <div class="character-message" style="font-size: 0.95rem;">
          질문 ${index + 1}: 가장 마음이 가는 항목을 솔직하게 선택해보세요.
        </div>
      </div>
    </div>

    <div class="question-category-badge">
      ${category.title}
    </div>
    <h2 class="question-title">${q.title}</h2>
    <p class="question-subtitle">${q.subtitle}</p>
    ${inputHTML}
  `;

  // 이전 버튼 활성화 처리
  const btnPrev = document.getElementById('btn-prev-q');
  if (btnPrev) btnPrev.style.visibility = index === 0 ? 'hidden' : 'visible';

  // 카드 이벤트 리스너 연결
  if (q.type === 'choice' || q.type === 'choice_with_text') {
    const optionCards = cardBox.querySelectorAll('.option-card');
    optionCards.forEach(card => {
      card.addEventListener('click', () => {
        optionCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');

        const optId = card.getAttribute('data-opt-id');
        const selectedOpt = q.options.find(o => o.id === optId);

        userAnswers[q.id] = {
          optionId: optId,
          element: selectedOpt.element,
          score: selectedOpt.score,
          emotionTag: selectedOpt.emotionTag,
          concernTag: selectedOpt.concernTag,
          strengthTag: selectedOpt.strengthTag,
          relationTag: selectedOpt.relationTag,
          styleTag: selectedOpt.styleTag,
          text: document.getElementById('q-custom-text')?.value || ''
        };

        StorageManager.saveAnswers(userAnswers);
      });
    });
  } else if (q.type === 'scale') {
    const rangeInput = document.getElementById('q-scale-range');
    const displayNum = document.getElementById('q-scale-val-num');
    rangeInput.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      displayNum.textContent = val;
      userAnswers[q.id] = { scaleValue: val };
      StorageManager.saveAnswers(userAnswers);
    });
  } else if (q.type === 'text_input') {
    const textInput = document.getElementById('q-text-input');
    textInput.addEventListener('input', (e) => {
      userAnswers[q.id] = { text: e.target.value };
      StorageManager.saveAnswers(userAnswers);
    });
  }
}

// 4. AI 분석 로딩 및 결과 렌더링
function startAIAnalysis() {
  switchView('loading');

  const progressBar = document.getElementById('loading-progress');
  const statusText = document.getElementById('loading-status-text');

  let progress = 0;
  const interval = setInterval(() => {
    progress += 10;
    if (progressBar) progressBar.style.width = `${progress}%`;

    if (progress === 30) {
      statusText.textContent = '12개 답변 속 4원소(불·물·공기·흙) 점수를 정밀 계산 중...';
    } else if (progress === 60) {
      statusText.textContent = '나만의 3대 핵심 강점과 마음 날씨를 합성하고 있습니다...';
    } else if (progress === 90) {
      statusText.textContent = '15페이지 맞춤 PDF 미니리포트를 가공하고 있습니다...';
    } else if (progress >= 100) {
      clearInterval(interval);
      finishAnalysis();
    }
  }, 200);
}

function finishAnalysis() {
  analysisResult = analyzeAnswers(profile, userAnswers);
  StorageManager.saveReport(analysisResult);

  // 1. 웹 결과 화면 순서 렌더링 (큰 제목 -> 오늘의 마음 -> 감정 카드 -> 강점 카드 -> 관계 카드 -> 실천 카드)
  const reportTitle = document.getElementById('web-report-title');
  if (reportTitle) reportTitle.textContent = `${analysisResult.profile.name} 님의 마음을 비추는 맘별 AI 자기이해 리포트`;

  // 오늘의 마음
  document.getElementById('web-weather-title').textContent = analysisResult.weatherText;
  document.getElementById('web-weather-desc').textContent = analysisResult.weatherAdvice;
  document.getElementById('web-energy-bar').style.width = `${analysisResult.totalEnergyMeter}%`;
  document.getElementById('web-energy-val').textContent = `${analysisResult.totalEnergyMeter}%`;

  // 감정 카드
  document.getElementById('web-claire-emotion-msg').textContent = `"${analysisResult.weatherAdvice}"`;

  // 강점 카드
  const strengthsGrid = document.getElementById('web-strengths-grid');
  if (strengthsGrid) {
    strengthsGrid.innerHTML = analysisResult.coreStrengths.map((s, idx) => `
      <div style="background: #FFFFFF; border: 1.5px solid var(--border-color); padding: 20px; border-radius: 16px; box-shadow: var(--shadow-soft);">
        <span style="font-size: 0.85rem; font-weight: 800; color: var(--color-mint);">0${idx + 1}</span>
        <h3 style="font-size: 1.2rem; font-weight: 800; color: var(--text-navy); margin: 6px 0;">${s.title}</h3>
        <p style="font-size: 0.95rem; color: var(--text-muted); line-height: 1.6;">${s.desc}</p>
      </div>
    `).join('');
  }

  // 관계 카드
  const relationDesc = document.getElementById('web-relation-desc');
  if (relationDesc) relationDesc.textContent = analysisResult.relationAdvice;

  // 실천 카드
  const actionsContainer = document.getElementById('web-actions-container');
  if (actionsContainer) {
    actionsContainer.innerHTML = analysisResult.actionItems.map(item => `
      <div style="background: #FFFFFF; border: 1.5px solid var(--border-color); padding: 20px 24px; border-radius: 16px; display: flex; gap: 16px; align-items: flex-start; box-shadow: var(--shadow-soft);">
        <div style="background: var(--color-mint-light); color: var(--color-mint); width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; flex-shrink: 0;">0${item.num}</div>
        <div>
          <h3 style="font-size: 1.15rem; font-weight: 800; color: var(--text-navy); margin-bottom: 4px;">${item.title}</h3>
          <p style="font-size: 0.95rem; color: var(--text-muted); line-height: 1.6;">${item.desc}</p>
        </div>
      </div>
    `).join('');
  }

  // 2. 15페이지 PDF 미리보기 HTML 동적 주입
  const reportContainer = document.getElementById('report-pages-container');
  if (reportContainer) reportContainer.innerHTML = renderReportHTML(analysisResult);

  // Chart.js 4원소 차트 생성 (Page 9)
  setTimeout(() => {
    renderRadarChart(analysisResult.elementPercentages);
  }, 150);

  switchView('report');
}

function renderRadarChart(percentages) {
  const canvas = document.getElementById('pdf-radar-chart');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ['🔥 불 (추진/열정)', '💧 물 (공감/치유)', '🌬️ 공기 (지혜/소통)', '🌱 흙 (안정/인내)'],
      datasets: [{
        label: '4원소 에너지 비율 (%)',
        data: [percentages.fire, percentages.water, percentages.air, percentages.earth],
        backgroundColor: 'rgba(59, 156, 135, 0.2)',
        borderColor: '#3B9C87',
        borderWidth: 2.5,
        pointBackgroundColor: '#3B9C87',
        pointRadius: 5
      }]
    },
    options: {
      responsive: true,
      scales: {
        r: {
          angleLines: { color: 'rgba(27, 42, 74, 0.12)' },
          grid: { color: 'rgba(27, 42, 74, 0.12)' },
          pointLabels: { color: '#1B2A4A', font: { size: 12, family: 'Pretendard', weight: 'bold' } },
          ticks: { display: false }
        }
      },
      plugins: {
        legend: { display: false }
      }
    }
  });
}

// 5. 메인 이벤트 바인딩
document.addEventListener('DOMContentLoaded', () => {
  initFontControl();

  // 시작 버튼
  document.getElementById('btn-start-app')?.addEventListener('click', () => {
    switchView('profile');
  });

  // 프로필 폼 제출
  document.getElementById('profile-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    profile.name = document.getElementById('user-name').value.trim();
    profile.ageGroup = document.getElementById('user-age').value;
    profile.interest = document.getElementById('user-interest').value;

    if (!profile.name) {
      alert('성함 또는 닉네임을 입력해 주세요.');
      return;
    }

    StorageManager.saveProfile(profile);
    currentQIndex = 0;
    renderQuestionStep(currentQIndex);
    switchView('question');
  });

  // 이전 질문 버튼
  document.getElementById('btn-prev-q')?.addEventListener('click', () => {
    if (currentQIndex > 0) {
      currentQIndex--;
      renderQuestionStep(currentQIndex);
    }
  });

  // 다음 질문 버튼
  document.getElementById('btn-next-q')?.addEventListener('click', () => {
    const q = QUESTIONS[currentQIndex];
    
    // 답변 필수 검증
    if (!userAnswers[q.id]) {
      if (q.type === 'scale') {
        userAnswers[q.id] = { scaleValue: q.defaultValue };
      } else if (q.type === 'text_input') {
        userAnswers[q.id] = { text: q.defaultValue };
      } else {
        alert('한 가지 항목을 선택해 주세요.');
        return;
      }
    }

    if (currentQIndex < QUESTIONS.length - 1) {
      currentQIndex++;
      renderQuestionStep(currentQIndex);
    } else {
      // 12개 질문 완성 -> AI 분석 시작
      startAIAnalysis();
    }
  });

  // PDF 다운로드 버튼
  document.getElementById('btn-download-pdf')?.addEventListener('click', () => {
    const btn = document.getElementById('btn-download-pdf');
    if (!btn) return;
    btn.disabled = true;
    btn.textContent = '⏳ PDF 생성 준비 중...';

    const fileName = `${profile.name || '맘별'}_맘별AI_자기이해_미니리포트.pdf`;

    downloadReportPDF(
      'report-pages-container',
      fileName,
      (current, total) => {
        btn.textContent = `⏳ PDF 생성 중... (${current}/${total} 페이지 변환 완료)`;
      }
    )
      .then(() => {
        btn.disabled = false;
        btn.innerHTML = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg><span>📥 PDF 15페이지 다운로드</span>`;
        alert('PDF 다운로드가 완료되었습니다!');
      })
      .catch((err) => {
        console.error(err);
        btn.disabled = false;
        btn.innerHTML = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg><span>📥 PDF 15페이지 다운로드</span>`;
        alert('PDF 다운로드 중 오류가 발생했습니다. 브라우저 인쇄(Ctrl+P)로도 저장 가능합니다.');
      });
  });

  // 모달 제어
  const modalCounsel = document.getElementById('modal-counsel');
  const modalWorkshop = document.getElementById('modal-workshop');

  document.getElementById('btn-open-counsel-modal')?.addEventListener('click', () => modalCounsel?.classList.add('active'));
  document.getElementById('close-counsel-modal')?.addEventListener('click', () => modalCounsel?.classList.remove('active'));
  
  document.getElementById('btn-open-workshop-modal')?.addEventListener('click', () => modalWorkshop?.classList.add('active'));
  document.getElementById('close-workshop-modal')?.addEventListener('click', () => modalWorkshop?.classList.remove('active'));

  document.getElementById('counsel-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('1:1 전문 상담 신청이 성공적으로 완료되었습니다! 맘별 가이드가 조속히 연락드리겠습니다.');
    modalCounsel?.classList.remove('active');
  });

  document.getElementById('workshop-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('맘별 AI 강의 워크숍 신청이 완료되었습니다! 수강 안내 문자를 발송해 드립니다.');
    modalWorkshop?.classList.remove('active');
  });
});
