/**
 * PostureScoreCard.js
 * SVG Posture Score Ring & Control Actions Component.
 * Handles zero-point calibration and buzzer sound alert test.
 */

export class PostureScoreCard {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.onCalibrateClick = options.onCalibrateClick || (() => {});
    this.onTestBuzzerClick = options.onTestBuzzerClick || (() => {});
    this.render();
  }

  render() {
    if (!this.container) return;
    this.container.innerHTML = `
      <div class="glass-card" style="text-align: center;">
        <h3 style="font-size: 1.1rem; font-weight: 700; color: #fff; margin-bottom: 0.5rem;">
          📊 자세 점수 & 제어
        </h3>

        <div class="score-ring-container">
          <svg class="score-ring-svg" viewBox="0 0 140 140">
            <circle class="score-ring-bg" cx="70" cy="70" r="60"/>
            <circle class="score-ring-progress" id="score-ring-bar" cx="70" cy="70" r="60"/>
          </svg>
          <div class="score-text-overlay">
            <div class="score-num num-font" id="score-num-val">95</div>
            <div class="score-unit">POSTURE SCORE</div>
          </div>
        </div>

        <div style="margin: 0.75rem 0; font-size: 0.85rem; color: var(--text-muted);" id="score-summary-text">
          목과 허리가 훌륭한 각도를 유지하고 있습니다.
        </div>

        <div style="display: flex; gap: 0.5rem; justify-content: center; margin-top: 1rem;">
          <button class="btn btn-primary" id="btn-calibrate-zero" style="flex: 1;">
            🎯 영점 설정 (Calibrate)
          </button>
          <button class="btn btn-secondary" id="btn-test-buzzer" title="경고음 및 아두이노 부저 테스트">
            🔔 테스트 알림
          </button>
        </div>
      </div>
    `;

    document.getElementById('btn-calibrate-zero')?.addEventListener('click', () => this.onCalibrateClick());
    document.getElementById('btn-test-buzzer')?.addEventListener('click', () => this.onTestBuzzerClick());
  }

  update(score, summaryText = '') {
    const scoreVal = document.getElementById('score-num-val');
    const ringBar = document.getElementById('score-ring-bar');
    const summary = document.getElementById('score-summary-text');

    if (scoreVal) scoreVal.textContent = Math.round(score);
    if (summary && summaryText) summary.textContent = summaryText;

    if (ringBar) {
      // Circumference = 2 * PI * 60 = 376.99
      const maxOffset = 376.99;
      const progressOffset = maxOffset - (maxOffset * (score / 100));
      ringBar.style.strokeDashoffset = progressOffset;

      if (score >= 85) {
        ringBar.style.stroke = 'var(--status-good)';
      } else if (score >= 70) {
        ringBar.style.stroke = 'var(--status-warn)';
      } else {
        ringBar.style.stroke = 'var(--status-danger)';
      }
    }
  }
}
