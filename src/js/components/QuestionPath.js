/**
 * 맘별 AI Brand Core Component: QuestionPath (질문의 길)
 * 
 * 맘별 3대 핵심 시각 언어:
 * ⭐ 북극성 (North Star) - 목표와 자기이해의 상징
 * 💚 질문의 길 (QuestionPath / Mint Line) - 질문과 성장의 여정
 * 🏮 포포의 등불 (Popo's Lantern) - 희망과 동행의 상징
 */

export function createQuestionPathHTML(options = {}) {
  const { 
    subtitle = "질문의 시작 · 자기이해의 여정", 
    compact = false,
    showBadge = true 
  } = options;

  if (compact) {
    return `
      <div class="question-path-component compact-path">
        <div class="question-path-line-container">
          <img src="/images/mint-line-sky.png" alt="질문의 길 Mint Line" class="question-path-img">
          <div class="question-path-shimmer-beam"></div>
        </div>
      </div>
    `;
  }

  return `
    <div class="question-path-component master-path">
      <div class="question-path-line-container">
        <img src="/images/mint-line-sky.png" alt="질문의 길 Mint Line" class="question-path-img">
        <div class="question-path-shimmer-beam"></div>
      </div>
      ${showBadge ? `
        <div class="question-path-badge-tag">
          <span class="path-icon">💚</span>
          <span class="path-text">질문의 길 (Mint Line)</span>
          <span class="path-sub">— ${subtitle}</span>
        </div>
      ` : ''}
    </div>
  `;
}

export function renderQuestionPath(container, options = {}) {
  const target = typeof container === 'string' ? document.querySelector(container) : container;
  if (!target) return;
  target.innerHTML = createQuestionPathHTML(options);
}
