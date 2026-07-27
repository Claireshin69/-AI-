/**
 * 맘별AI 자기이해 미니리포트 - 15페이지 PDF 생성 및 내보내기 로직
 */

import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export function renderReportHTML(analysis) {
  const {
    profile,
    elementPercentages,
    fullPersonaName,
    primaryInfo,
    secondaryInfo,
    totalEnergyMeter,
    weatherText,
    weatherAdvice,
    coreStrengths,
    relationStyle,
    relationAdvice,
    actionItems,
    customPledge,
    aiLetterText,
    generatedAt
  } = analysis;

  const pages = [
    // Page 1: 표지
    `
    <div class="pdf-page page-cover">
      <div class="cover-border">
        <div class="cover-header">
          <span class="badge" style="background: #EAF5F2; color: #3B9C87; padding: 6px 16px; border-radius: 20px; font-weight: 800; font-size: 0.85rem;">MOMBYEOL AI MINI REPORT</span>
          <h2 class="sub-slogan">"별은 미래를 맞추는 것이 아니라 나를 이해하는 지도입니다."</h2>
        </div>
        <div class="cover-main">
          <div class="star-constellation-icon">⭐✨🌟</div>
          <h1 class="report-main-title">맘별 AI 자기이해<br><span class="highlight">미니 리포트</span></h1>
          <div class="user-persona-box">
            <span class="persona-label">나의 대표 별자리의 기운</span>
            <h3 class="persona-name">${fullPersonaName}</h3>
          </div>
        </div>
        <div class="cover-footer">
          <p class="user-meta" style="color: #1B2A4A; font-weight: 600;"><strong>수신인:</strong> ${profile.name} 님 (${profile.ageGroup || '40~70대'})</p>
          <p class="date-meta" style="color: #5A6B87;"><strong>발행일:</strong> ${generatedAt}</p>
          <p class="brand-meta" style="color: #8C9BAE; font-weight: 700;">맘별 AI 연구소 | Mombyeol Insight</p>
        </div>
      </div>
    </div>
    `,

    // Page 2: 종합 요약
    `
    <div class="pdf-page">
      <div class="page-header">
        <span class="hdr-title">맘별 AI 자기이해 미니리포트</span>
        <span class="hdr-page">PAGE 02 / 15</span>
      </div>
      <div class="page-content">
        <h2 class="section-title">01. 종합 요약 & 나의 북극성</h2>
        <div class="card summary-card" style="background: #FFFFFF; border-radius: 16px; padding: 28px; border: 1px solid rgba(27,42,74,0.1); margin-bottom: 20px;">
          <h3 style="font-size: 1.1rem; color: #5A6B87;">${profile.name}님의 대표 페르소나</h3>
          <p class="big-text" style="font-size: 1.8rem; font-weight: 800; color: #3B9C87; margin: 8px 0 12px;">${fullPersonaName}</p>
          <p style="line-height: 1.7; color: #1B2A4A;">${primaryInfo.desc}</p>
        </div>
        <div class="grid-2">
          <div class="card" style="background: #FFFFFF; padding: 24px; border-radius: 16px; border: 1px solid rgba(27,42,74,0.1);">
            <h4 style="font-size: 1.05rem; color: #5A6B87; margin-bottom: 8px;">주 원소 (Main)</h4>
            <div class="element-badge fire" style="background: #FDF6EC; color: #B87A30; padding: 6px 14px; border-radius: 12px; font-weight: 800; display: inline-block; margin-bottom: 8px;">${primaryInfo.title}</div>
            <p>핵심 에너지: <strong>${primaryInfo.keyword}</strong></p>
          </div>
          <div class="card" style="background: #FFFFFF; padding: 24px; border-radius: 16px; border: 1px solid rgba(27,42,74,0.1);">
            <h4 style="font-size: 1.05rem; color: #5A6B87; margin-bottom: 8px;">보완 원소 (Sub)</h4>
            <div class="element-badge water" style="background: #EAF5F2; color: #3B9C87; padding: 6px 14px; border-radius: 12px; font-weight: 800; display: inline-block; margin-bottom: 8px;">${secondaryInfo.title}</div>
            <p>조화 에너지: <strong>${secondaryInfo.keyword}</strong></p>
          </div>
        </div>
        <div class="card alert-box" style="background: #FDF6EC; border: 1px solid rgba(217,160,91,0.4); padding: 24px; border-radius: 16px; margin-top: 20px;">
          <h4 style="color: #B87A30; font-weight: 800; margin-bottom: 6px;">💡 이번 리포트의 핵심 가이드</h4>
          <p style="color: #1B2A4A; line-height: 1.7;">이 리포트는 점을 치는 것이 아닙니다. 살아온 나날들의 결실을 확인하고, 내 안의 보석 같은 강점과 새로운 삶의 온도를 찾아가는 안내서입니다.</p>
        </div>
      </div>
      <div class="page-footer">맘별 AI | ${profile.name} 님의 마음 지도</div>
    </div>
    `,

    // Page 3: 현재 감정 상태 및 마음 날씨
    `
    <div class="pdf-page">
      <div class="page-header">
        <span class="hdr-title">맘별 AI 자기이해 미니리포트</span>
        <span class="hdr-page">PAGE 03 / 15</span>
      </div>
      <div class="page-content">
        <h2 class="section-title">02. 현재 마음 날씨 및 에너지 수준</h2>
        <div class="card weather-card" style="background: #FFFFFF; padding: 28px; border-radius: 16px; border: 1px solid rgba(27,42,74,0.1); margin-bottom: 24px;">
          <div class="weather-icon" style="font-size: 3rem; margin-bottom: 12px;">🌤️</div>
          <h3 style="font-size: 1.5rem; font-weight: 800; margin-bottom: 10px;">오늘의 마음 날씨: <span class="highlight" style="color: #3B9C87;">${weatherText}</span></h3>
          <p style="line-height: 1.7; color: #1B2A4A;">${weatherAdvice}</p>
        </div>
        <div class="card energy-card" style="background: #FFFFFF; padding: 28px; border-radius: 16px; border: 1px solid rgba(27,42,74,0.1);">
          <h3 style="font-size: 1.3rem; font-weight: 800; margin-bottom: 14px;">마음 에너지 충전도</h3>
          <div class="meter-bar-outer">
            <div class="meter-bar-inner" style="width: ${totalEnergyMeter}%;"></div>
          </div>
          <p class="meter-value" style="font-size: 1.1rem; margin-top: 10px;">현재 에너지: <strong style="color: #3B9C87;">${totalEnergyMeter}%</strong></p>
          <p class="sub-desc" style="color: #5A6B87; font-size: 0.95rem; margin-top: 8px;">에너지가 낮다면 쉬어가라는 마음의 신호이며, 높다면 새로운 활력을 시작할 준비가 된 것입니다.</p>
        </div>
      </div>
      <div class="page-footer">맘별 AI | ${profile.name} 님의 마음 지도</div>
    </div>
    `,

    // Page 4: 감정 밸런스 및 심층 상태
    `
    <div class="pdf-page">
      <div class="page-header">
        <span class="hdr-title">맘별 AI 자기이해 미니리포트</span>
        <span class="hdr-page">PAGE 04 / 15</span>
      </div>
      <div class="page-content">
        <h2 class="section-title">03. 감정 밸런스 & 마음 에너지 분석</h2>
        <div class="card" style="background: #FFFFFF; padding: 32px; border-radius: 16px; border: 1px solid rgba(27,42,74,0.1);">
          <h3 style="font-size: 1.4rem; font-weight: 800; margin-bottom: 16px;">내 안의 솔직한 감정 소리</h3>
          <p style="line-height: 1.8; color: #1B2A4A; margin-bottom: 20px;">
            최근 ${profile.name}님이 가장 깊게 느끼하셨던 마음의 주제는 <strong>[가족/관계 및 내면의 정리]</strong>에 연결되어 있습니다.
          </p>
          <div style="background: #EAF5F2; padding: 20px; border-radius: 14px; border-left: 4px solid #3B9C87;">
            <p style="color: #1B2A4A; font-weight: 600; line-height: 1.7;">
              "마음이 답답할 때는 나를 자책하지 말고 '내가 그동안 참 노력을 많이 했구나'라며 스스로의 등을 따뜻하게 토닥여주세요."
            </p>
          </div>
        </div>
      </div>
      <div class="page-footer">맘별 AI | ${profile.name} 님의 마음 지도</div>
    </div>
    `,

    // Page 5: 내면의 3대 핵심 강점
    `
    <div class="pdf-page">
      <div class="page-header">
        <span class="hdr-title">맘별 AI 자기이해 미니리포트</span>
        <span class="hdr-page">PAGE 05 / 15</span>
      </div>
      <div class="page-content">
        <h2 class="section-title">04. 내면의 3대 핵심 강점</h2>
        <div class="strengths-container" style="display: flex; flex-direction: column; gap: 16px;">
          ${coreStrengths.map((s, idx) => `
            <div class="card strength-card" style="background: #FFFFFF; padding: 24px; border-radius: 16px; border: 1px solid rgba(27,42,74,0.1);">
              <div class="strength-num" style="color: #3B9C87; font-weight: 800; font-size: 0.9rem; margin-bottom: 4px;">강점 0${idx + 1}</div>
              <h3 style="font-size: 1.3rem; font-weight: 800; color: #1B2A4A; margin-bottom: 8px;">${s.title}</h3>
              <p style="line-height: 1.7; color: #5A6B87;">${s.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="page-footer">맘별 AI | ${profile.name} 님의 마음 지도</div>
    </div>
    `,

    // Page 6: 강점 활용 레시피
    `
    <div class="pdf-page">
      <div class="page-header">
        <span class="hdr-title">맘별 AI 자기이해 미니리포트</span>
        <span class="hdr-page">PAGE 06 / 15</span>
      </div>
      <div class="page-content">
        <h2 class="section-title">05. 강점 활용 & 역경 극복 레시피</h2>
        <div class="card" style="background: #FFFFFF; padding: 32px; border-radius: 16px; border: 1px solid rgba(27,42,74,0.1);">
          <h3 style="font-size: 1.4rem; font-weight: 800; margin-bottom: 14px;">수많은 파도를 넘어온 회복탄력성</h3>
          <p style="line-height: 1.8; color: #1B2A4A; margin-bottom: 24px;">
            ${profile.name}님은 인생의 큰 고민이나 시련 앞에서 <strong>인내와 유연성</strong>으로 굳건히 대처해오셨습니다.
          </p>
          <div class="recipe-box" style="background: #FDF6EC; border: 1px solid rgba(217,160,91,0.4); padding: 24px; border-radius: 16px;">
            <h4 style="color: #B87A30; font-weight: 800; margin-bottom: 8px;">💡 강점 스위치 켜기</h4>
            <p style="line-height: 1.7; color: #1B2A4A;">어려운 일이 생길 때 "내가 과거에도 지혜롭게 넘겼듯 이번에도 잘 해낼 수 있어"라고 나 자신을 믿어주세요.</p>
          </div>
        </div>
      </div>
      <div class="page-footer">맘별 AI | ${profile.name} 님의 마음 지도</div>
    </div>
    `,

    // Page 7: 관계 패턴 분석
    `
    <div class="pdf-page">
      <div class="page-header">
        <span class="hdr-title">맘별 AI 자기이해 미니리포트</span>
        <span class="hdr-page">PAGE 07 / 15</span>
      </div>
      <div class="page-content">
        <h2 class="section-title">06. 관계 패턴 & 소통 스타일</h2>
        <div class="card" style="background: #FFFFFF; padding: 32px; border-radius: 16px; border: 1px solid rgba(27,42,74,0.1);">
          <h3 style="font-size: 1.4rem; font-weight: 800; margin-bottom: 14px;">나의 소통 스타일: <span class="highlight" style="color: #3B9C87;">[${relationStyle}]</span></h3>
          <p style="line-height: 1.8; color: #1B2A4A;">${relationAdvice}</p>
        </div>
      </div>
      <div class="page-footer">맘별 AI | ${profile.name} 님의 마음 지도</div>
    </div>
    `,

    // Page 8: 관계 갈등 예방 가이드
    `
    <div class="pdf-page">
      <div class="page-header">
        <span class="hdr-title">맘별 AI 자기이해 미니리포트</span>
        <span class="hdr-page">PAGE 08 / 15</span>
      </div>
      <div class="page-content">
        <h2 class="section-title">07. 가족 & 대인관계 편안한 소통법</h2>
        <div class="card" style="background: #FFFFFF; padding: 32px; border-radius: 16px; border: 1px solid rgba(27,42,74,0.1);">
          <h3 style="font-size: 1.4rem; font-weight: 800; margin-bottom: 20px;">I-Message (나-전달법) 솔루션</h3>
          <div class="compare-box" style="display: flex; flex-direction: column; gap: 14px; margin-bottom: 20px;">
            <div class="bad" style="background: #FEF2F2; color: #991B1B; padding: 18px; border-radius: 12px; font-weight: 700;">❌ "너는 왜 항상 말을 그렇게 하니?"</div>
            <div class="good" style="background: #ECFDF5; color: #065F46; padding: 18px; border-radius: 12px; font-weight: 700;">⭕ "네 말을 들으니 내 마음이 조금 서운하구나."</div>
          </div>
          <p style="line-height: 1.7; color: #5A6B87;">내 감정의 주인이 되어 대화할 때 상처는 줄어들고 마음은 더 깊게 통하게 됩니다.</p>
        </div>
      </div>
      <div class="page-footer">맘별 AI | ${profile.name} 님의 마음 지도</div>
    </div>
    `,

    // Page 9: 4원소 분석 (Chart)
    `
    <div class="pdf-page">
      <div class="page-header">
        <span class="hdr-title">맘별 AI 자기이해 미니리포트</span>
        <span class="hdr-page">PAGE 09 / 15</span>
      </div>
      <div class="page-content">
        <h2 class="section-title">08. 4원소 에너지 분석 (불·물·공기·흙)</h2>
        <div class="grid-2">
          <div class="card chart-card" style="background: #FFFFFF; padding: 24px; border-radius: 16px; border: 1px solid rgba(27,42,74,0.1); text-align: center;">
            <canvas id="pdf-radar-chart"></canvas>
          </div>
          <div class="card" style="background: #FFFFFF; padding: 24px; border-radius: 16px; border: 1px solid rgba(27,42,74,0.1);">
            <h3 style="font-size: 1.2rem; font-weight: 800; margin-bottom: 16px;">4원소 점수 비율</h3>
            <ul class="element-score-list">
              <li>🔥 불 (추진/열정): <strong>${elementPercentages.fire}%</strong></li>
              <li>💧 물 (공감/감성): <strong>${elementPercentages.water}%</strong></li>
              <li>🌬️ 공기 (지혜/소통): <strong>${elementPercentages.air}%</strong></li>
              <li>🌱 흙 (안정/실천): <strong>${elementPercentages.earth}%</strong></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="page-footer">맘별 AI | ${profile.name} 님의 마음 지도</div>
    </div>
    `,

    // Page 10: 4원소 조화 및 보완점
    `
    <div class="pdf-page">
      <div class="page-header">
        <span class="hdr-title">맘별 AI 자기이해 미니리포트</span>
        <span class="hdr-page">PAGE 10 / 15</span>
      </div>
      <div class="page-content">
        <h2 class="section-title">09. 4원소 조화 및 부족한 원소 채우기</h2>
        <div class="card" style="background: #FFFFFF; padding: 32px; border-radius: 16px; border: 1px solid rgba(27,42,74,0.1);">
          <h3 style="font-size: 1.4rem; font-weight: 800; margin-bottom: 14px;">나에게 필요한 원소 보충법</h3>
          <p style="line-height: 1.8; color: #1B2A4A;">가장 비율이 낮은 원소의 기운을 자연 속 산책, 독서, 손쉽게 즐기는 취미나 소소한 습관으로 채워주면 삶에 한층 깊은 균형이 찾아옵니다.</p>
        </div>
      </div>
      <div class="page-footer">맘별 AI | ${profile.name} 님의 마음 지도</div>
    </div>
    `,

    // Page 11: 삶의 방향성
    `
    <div class="pdf-page">
      <div class="page-header">
        <span class="hdr-title">맘별 AI 자기이해 미니리포트</span>
        <span class="hdr-page">PAGE 11 / 15</span>
      </div>
      <div class="page-content">
        <h2 class="section-title">10. 제2의 인생 방향성 & 북극성</h2>
        <div class="card" style="background: #FFFFFF; padding: 32px; border-radius: 16px; border: 1px solid rgba(27,42,74,0.1);">
          <h3 style="font-size: 1.4rem; font-weight: 800; margin-bottom: 14px;">내가 걸어갈 나다운 방향</h3>
          <p style="line-height: 1.8; color: #1B2A4A;">${profile.name}님은 앞으로 <strong style="color: #3B9C87;">[${primaryInfo.keyword}]</strong>의 가치를 지침 삼아 한 걸음씩 나아가실 것입니다.</p>
        </div>
      </div>
      <div class="page-footer">맘별 AI | ${profile.name} 님의 마음 지도</div>
    </div>
    `,

    // Page 12: 3가지 행동 제안
    `
    <div class="pdf-page">
      <div class="page-header">
        <span class="hdr-title">맘별 AI 자기이해 미니리포트</span>
        <span class="hdr-page">PAGE 12 / 15</span>
      </div>
      <div class="page-content">
        <h2 class="section-title">11. 오늘 바로 시작하는 3가지 실천 제안</h2>
        <div class="action-list" style="display: flex; flex-direction: column; gap: 16px;">
          ${actionItems.map(item => `
            <div class="card action-card" style="background: #FFFFFF; padding: 24px; border-radius: 16px; border: 1px solid rgba(27,42,74,0.1); display: flex; gap: 16px; align-items: flex-start;">
              <div class="action-num" style="background: #EAF5F2; color: #3B9C87; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; flex-shrink: 0;">0${item.num}</div>
              <div class="action-body">
                <h3 style="font-size: 1.2rem; font-weight: 800; color: #1B2A4A; margin-bottom: 6px;">${item.title}</h3>
                <p style="line-height: 1.7; color: #5A6B87;">${item.desc}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="page-footer">맘별 AI | ${profile.name} 님의 마음 지도</div>
    </div>
    `,

    // Page 13: 맘별 AI 별빛 편지
    `
    <div class="pdf-page page-letter">
      <div class="page-header">
        <span class="hdr-title">맘별 AI 자기이해 미니리포트</span>
        <span class="hdr-page">PAGE 13 / 15</span>
      </div>
      <div class="page-content">
        <h2 class="section-title">12. 맘별 AI가 보내는 따뜻한 별빛 편지</h2>
        <div class="card letter-card" style="background: #FFFFFF; padding: 36px; border-radius: 16px; border: 1px solid rgba(27,42,74,0.1);">
          <pre class="letter-text">${aiLetterText}</pre>
        </div>
      </div>
      <div class="page-footer">맘별 AI | ${profile.name} 님의 마음 지도</div>
    </div>
    `,

    // Page 14: 전문 상담 & 강의 안내
    `
    <div class="pdf-page">
      <div class="page-header">
        <span class="hdr-title">맘별 AI 자기이해 미니리포트</span>
        <span class="hdr-page">PAGE 14 / 15</span>
      </div>
      <div class="page-content">
        <h2 class="section-title">13. 전문 상담 준비 및 다음 여정 안내</h2>
        <div class="card text-center" style="background: #FFFFFF; padding: 36px; border-radius: 16px; border: 1px solid rgba(27,42,74,0.1); text-align: center;">
          <h3 style="font-size: 1.5rem; font-weight: 800; color: #1B2A4A; margin-bottom: 12px;">혼자 고민하지 마세요</h3>
          <p style="line-height: 1.8; color: #5A6B87; margin-bottom: 24px;">
            맘별 AI 미니리포트는 전문 상담을 받기 전, 내 마음의 지도를 정리하는 최선의 첫걸음입니다.
          </p>
          <div class="cta-box" style="background: #FDF6EC; border: 1px solid rgba(217,160,91,0.4); padding: 24px; border-radius: 16px; color: #B87A30; font-weight: 800;">
            <p style="margin-bottom: 8px;">⭐ 1:1 심층 전문 상담 신청 (맞춤 가이드 제공)</p>
            <p>⭐ 맘별 AI 자기이해 오프라인/온라인 강의 참여</p>
          </div>
        </div>
      </div>
      <div class="page-footer">맘별 AI | ${profile.name} 님의 마음 지도</div>
    </div>
    `,

    // Page 15: 수료증 & 나만의 다짐
    `
    <div class="pdf-page page-cert">
      <div class="cert-border">
        <div class="cert-header">
          <div class="cert-badge">CERTIFICATE OF SELF-DISCOVERY</div>
          <h2>맘별 자기이해 과정 수료증</h2>
        </div>
        <div class="cert-body">
          <p class="cert-to">성명: <strong>${profile.name}</strong> 님</p>
          <p class="cert-desc" style="margin: 20px 0;">
            위 사람은 맘별 AI 자기이해 12개 심층 질문과 4원소 분석을 성공적으로 마치고,
            스스로의 감정과 강점을 발견하여 자기이해 지도를 완성하였으므로 이 수료증을 드립니다.
          </p>
          <div class="pledge-display-box">
            <h4 style="font-size: 1rem; color: #5A6B87; margin-bottom: 6px;">나의 약속 및 다짐</h4>
            <p>"${customPledge}"</p>
          </div>
        </div>
        <div class="cert-footer" style="margin-top: 30px;">
          <p class="cert-date" style="color: #5A6B87; font-weight: 600;">${generatedAt}</p>
          <p class="cert-issuer" style="font-weight: 800; font-size: 1.1rem; color: #1B2A4A; margin-top: 6px;">맘별 AI 연구소 대표 가이드</p>
        </div>
      </div>
    </div>
    `
  ];

  return pages.join('');
}

export async function downloadReportPDF(elementId, filename = '맘별AI_자기이해_미니리포트.pdf', onProgress = null) {
  const reportElem = document.getElementById(elementId);
  if (!reportElem) return;

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pages = reportElem.querySelectorAll('.pdf-page');

  for (let i = 0; i < pages.length; i++) {
    if (typeof onProgress === 'function') {
      onProgress(i + 1, pages.length);
    }
    
    // UI 스레드 렌더링 양보 (small timeout pause)
    await new Promise(r => setTimeout(r, 40));

    const pageElem = pages[i];
    const canvas = await html2canvas(pageElem, {
      scale: 1.5,
      useCORS: true,
      logging: false,
      backgroundColor: '#FAF8F5'
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.92);
    if (i > 0) pdf.addPage();
    pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);
  }

  pdf.save(filename);
}
