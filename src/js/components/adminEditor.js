/**
 * 맘별AI 자기이해 미니리포트 - 관리자 페이지 대시보드 컴포넌트
 */

import { StorageManager } from '../storageManager.js';
import { QUESTIONS, QUESTION_CATEGORIES } from '../questionsData.js';

export function renderAdminDashboard(containerElem) {
  if (!containerElem) return;

  let currentQuestions = StorageManager.getCustomQuestions() || JSON.parse(JSON.stringify(QUESTIONS));
  let selectedQIndex = 0;
  let activeTab = 'editor'; // 'editor' | 'password'

  function renderUI() {
    const q = currentQuestions[selectedQIndex];

    containerElem.innerHTML = `
      <div class="admin-header-card">
        <div class="admin-title-group">
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 6px;">
            <h1>🛠️ 맘별 AI 관리자 콘솔</h1>
            <span class="admin-badge-active">관리자 세션 활성</span>
          </div>
          <p>12개 심층 질문과 선택지, 4원소 가중치를 실시간으로 편집하고 로컬 스토리지에 저장합니다.</p>
        </div>

        <div style="display: flex; gap: 10px;">
          <button id="btn-admin-save" class="btn-mint">
            <span>💾 저장하기</span>
          </button>
          <button id="btn-admin-reset" class="btn-secondary">
            <span>🔄 기본값 복원</span>
          </button>
          <button id="btn-admin-logout" class="btn-secondary" style="color: #DC2626; border-color: #FCA5A5;">
            <span>🚪 로그아웃</span>
          </button>
        </div>
      </div>

      <!-- 탭 네비게이션 -->
      <div class="admin-nav-tabs">
        <button class="tab-btn ${activeTab === 'editor' ? 'active' : ''}" data-tab="editor">
          📝 12개 질문 & 선택지 편집기
        </button>
        <button class="tab-btn ${activeTab === 'password' ? 'active' : ''}" data-tab="password">
          🔒 관리자 비밀번호 변경
        </button>
      </div>

      ${activeTab === 'editor' ? renderEditorTab(q) : renderPasswordTab()}
    `;

    bindEvents();
  }

  function renderEditorTab(q) {
    if (!q) return '<div class="card"><p>선택된 질문이 없습니다.</p></div>';

    return `
      <!-- 질문 칩 탐색 바 -->
      <div class="question-selector-bar">
        ${currentQuestions.map((item, idx) => `
          <button class="q-chip ${idx === selectedQIndex ? 'active' : ''}" data-q-idx="${idx}">
            Q${idx + 1}. ${item.title.substring(0, 10)}...
          </button>
        `).join('')}
      </div>

      <!-- 질문 상세 편집 카탈로그 -->
      <div class="card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
          <span class="question-category-badge">질문 ${q.id} / ${currentQuestions.length}</span>
          <span style="font-size: 0.9rem; color: var(--text-muted);">유형: <strong>${q.type}</strong></span>
        </div>

        <div class="form-group">
          <label>질문 제목 (Title)</label>
          <input type="text" id="admin-q-title" class="form-input" value="${q.title || ''}">
        </div>

        <div class="form-group">
          <label>질문 부제목 및 가이드 (Subtitle)</label>
          <input type="text" id="admin-q-subtitle" class="form-input" value="${q.subtitle || ''}">
        </div>

        <div class="form-group">
          <label>카테고리</label>
          <select id="admin-q-category" class="form-select">
            ${Object.keys(QUESTION_CATEGORIES).map(catKey => `
              <option value="${catKey}" ${q.category === catKey ? 'selected' : ''}>
                ${QUESTION_CATEGORIES[catKey].title}
              </option>
            `).join('')}
          </select>
        </div>
      </div>

      <!-- 선택지 편집 섹션 -->
      ${q.options ? `
        <div class="card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
            <h3 style="font-size: 1.3rem; font-weight: 800; color: var(--text-navy);">
              📋 선택지 및 4원소 가중치 편집 (${q.options.length}개)
            </h3>
            <button id="btn-add-option" class="btn-mint" style="padding: 10px 20px; min-height: 44px; font-size: 0.9rem;">
              <span>+ 선택지 추가</span>
            </button>
          </div>

          <div id="options-editor-list">
            ${q.options.map((opt, optIdx) => `
              <div class="option-editor-card" data-opt-idx="${optIdx}">
                <div class="option-editor-header">
                  <span class="option-editor-num">선택지 0${optIdx + 1} (ID: ${opt.id})</span>
                  <button class="btn-danger-sm btn-delete-opt" data-opt-idx="${optIdx}">🗑️ 삭제</button>
                </div>

                <div class="form-group" style="margin-bottom: 14px;">
                  <label style="font-size: 0.95rem;">선택지 텍스트</label>
                  <input type="text" class="form-input opt-input-text" value="${opt.text || ''}">
                </div>

                <div class="form-group" style="margin-bottom: 14px;">
                  <label style="font-size: 0.95rem;">상세 설명 (Desc)</label>
                  <input type="text" class="form-input opt-input-desc" value="${opt.desc || ''}">
                </div>

                <!-- 4원소 가중치 -->
                <div class="element-scores-grid">
                  <div class="element-score-field">
                    <label>🔥 불 점수</label>
                    <input type="number" class="opt-score-fire" min="0" max="10" value="${opt.score?.fire || 0}">
                  </div>
                  <div class="element-score-field">
                    <label>💧 물 점수</label>
                    <input type="number" class="opt-score-water" min="0" max="10" value="${opt.score?.water || 0}">
                  </div>
                  <div class="element-score-field">
                    <label>🌬️ 공기 점수</label>
                    <input type="number" class="opt-score-air" min="0" max="10" value="${opt.score?.air || 0}">
                  </div>
                  <div class="element-score-field">
                    <label>🌱 흙 점수</label>
                    <input type="number" class="opt-score-earth" min="0" max="10" value="${opt.score?.earth || 0}">
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      ` : '<div class="card"><p style="color: var(--text-muted);">이 질문은 슬라이더/텍스트 입력 전용 유형입니다.</p></div>'}
    `;
  }

  function renderPasswordTab() {
    return `
      <div class="card" style="max-width: 540px; margin: 0 auto;">
        <h2 style="font-size: 1.4rem; font-weight: 800; color: var(--text-navy); margin-bottom: 12px;">🔒 관리자 비밀번호 변경</h2>
        <p style="color: var(--text-muted); margin-bottom: 24px; font-size: 0.95rem;">
          변경한 비밀번호는 로컬 스토리지에 안전하게 보관됩니다.
        </p>

        <form id="admin-pw-form">
          <div class="form-group">
            <label>현재 비밀번호</label>
            <input type="password" id="pw-current" class="form-input" required>
          </div>
          <div class="form-group">
            <label>새 비밀번호</label>
            <input type="password" id="pw-new" class="form-input" placeholder="새 비밀번호 입력" required>
          </div>
          <div class="form-group">
            <label>새 비밀번호 확인</label>
            <input type="password" id="pw-confirm" class="form-input" placeholder="새 비밀번호 다시 입력" required>
          </div>
          <button type="submit" class="btn-mint" style="width: 100%;">비밀번호 변경하기</button>
        </form>
      </div>
    `;
  }

  function updateCurrentQFromInputs() {
    const q = currentQuestions[selectedQIndex];
    if (!q) return;

    const titleInput = document.getElementById('admin-q-title');
    const subtitleInput = document.getElementById('admin-q-subtitle');
    const categorySelect = document.getElementById('admin-q-category');

    if (titleInput) q.title = titleInput.value.trim();
    if (subtitleInput) q.subtitle = subtitleInput.value.trim();
    if (categorySelect) q.category = categorySelect.value;

    if (q.options) {
      const optCards = containerElem.querySelectorAll('.option-editor-card');
      optCards.forEach((card, idx) => {
        if (!q.options[idx]) return;

        const textInput = card.querySelector('.opt-input-text');
        const descInput = card.querySelector('.opt-input-desc');
        const fireInput = card.querySelector('.opt-score-fire');
        const waterInput = card.querySelector('.opt-score-water');
        const airInput = card.querySelector('.opt-score-air');
        const earthInput = card.querySelector('.opt-score-earth');

        if (textInput) q.options[idx].text = textInput.value;
        if (descInput) q.options[idx].desc = descInput.value;

        q.options[idx].score = {
          fire: parseInt(fireInput?.value || 0, 10),
          water: parseInt(waterInput?.value || 0, 10),
          air: parseInt(airInput?.value || 0, 10),
          earth: parseInt(earthInput?.value || 0, 10)
        };
      });
    }
  }

  function bindEvents() {
    // 탭 변경
    containerElem.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        updateCurrentQFromInputs();
        activeTab = btn.getAttribute('data-tab');
        renderUI();
      });
    });

    // 질문 Q1~Q12 칩 선택
    containerElem.querySelectorAll('.q-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        updateCurrentQFromInputs();
        selectedQIndex = parseInt(btn.getAttribute('data-q-idx'), 10);
        renderUI();
      });
    });

    // 선택지 추가
    document.getElementById('btn-add-option')?.addEventListener('click', () => {
      updateCurrentQFromInputs();
      const q = currentQuestions[selectedQIndex];
      if (!q.options) q.options = [];
      const newId = `${q.id}_opt_${Date.now().toString().slice(-4)}`;
      q.options.push({
        id: newId,
        text: '새 선택지 항목',
        desc: '선택지 설명을 입력하세요',
        element: 'fire',
        score: { fire: 3, water: 0, air: 0, earth: 0 }
      });
      renderUI();
    });

    // 선택지 삭제
    containerElem.querySelectorAll('.btn-delete-opt').forEach(btn => {
      btn.addEventListener('click', (e) => {
        updateCurrentQFromInputs();
        const optIdx = parseInt(e.target.getAttribute('data-opt-idx'), 10);
        const q = currentQuestions[selectedQIndex];
        if (q && q.options) {
          q.options.splice(optIdx, 1);
          renderUI();
        }
      });
    });

    // 저장 버튼
    document.getElementById('btn-admin-save')?.addEventListener('click', () => {
      updateCurrentQFromInputs();
      StorageManager.saveCustomQuestions(currentQuestions);
      alert('관리자 질문 및 선택지 수정사항이 성공적으로 저장되었습니다!');
    });

    // 기본값 복원 버튼
    document.getElementById('btn-admin-reset')?.addEventListener('click', () => {
      if (confirm('기초 질문 데이터로 복원하시겠습니까? 커스텀 설정이 초기화됩니다.')) {
        StorageManager.resetCustomQuestions();
        currentQuestions = JSON.parse(JSON.stringify(QUESTIONS));
        alert('기초 질문 데이터로 복원되었습니다.');
        renderUI();
      }
    });

    // 로그아웃 버튼
    document.getElementById('btn-admin-logout')?.addEventListener('click', () => {
      StorageManager.setAdminSession(false);
      alert('관리자 세션이 종료되었습니다.');
      window.location.reload();
    });

    // 비밀번호 변경 폼
    document.getElementById('admin-pw-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const curr = document.getElementById('pw-current').value;
      const next = document.getElementById('pw-new').value;
      const confirmPw = document.getElementById('pw-confirm').value;

      const actualCurrent = StorageManager.getAdminPassword();
      if (curr !== actualCurrent) {
        alert('현재 비밀번호가 일치하지 않습니다.');
        return;
      }

      if (next !== confirmPw) {
        alert('새 비밀번호와 비밀번호 확인이 일치하지 않습니다.');
        return;
      }

      StorageManager.setAdminPassword(next);
      alert('관리자 비밀번호가 성공적으로 변경되었습니다!');
      activeTab = 'editor';
      renderUI();
    });
  }

  renderUI();
}
