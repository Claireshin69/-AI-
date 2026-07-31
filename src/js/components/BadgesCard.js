/**
 * BadgesCard.js
 * Gamification Habit Badges and Stretching Timer Trigger Component.
 */

export class BadgesCard {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.onStartStretchClick = options.onStartStretchClick || (() => {});
    this.render();
  }

  render() {
    if (!this.container) return;
    this.container.innerHTML = `
      <div class="glass-card" style="width: 100%;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <h3 style="font-size: 1.1rem; font-weight: 700; color: #fff;">
            🏆 자세 습관 배지 & 코칭
          </h3>
          <button class="btn btn-primary" id="btn-trigger-stretch" style="font-size: 0.85rem; padding: 0.4rem 0.9rem;">
            🧘 1분 스트레칭 시작
          </button>
        </div>

        <div class="badges-grid">
          <div class="badge-item achieved">
            <div class="badge-icon">🎯</div>
            <div class="badge-name">영점 설정 마스터</div>
            <div style="font-size: 0.7rem; color: var(--text-muted); margin-top: 2px;">기준점 등록 완료</div>
          </div>

          <div class="badge-item achieved">
            <div class="badge-icon">⚡</div>
            <div class="badge-name">30분 바른 자세</div>
            <div style="font-size: 0.7rem; color: var(--text-muted); margin-top: 2px;">연속 유지 달성</div>
          </div>

          <div class="badge-item">
            <div class="badge-icon">👑</div>
            <div class="badge-name">자세 왕 (95점+)</div>
            <div style="font-size: 0.7rem; color: var(--text-muted); margin-top: 2px;">일간 목표 달성 시</div>
          </div>

          <div class="badge-item">
            <div class="badge-icon">🛡️</div>
            <div class="badge-name">거북목 방어자</div>
            <div style="font-size: 0.7rem; color: var(--text-muted); margin-top: 2px;">경고 3회 이하 완료</div>
          </div>
        </div>
      </div>
    `;

    document.getElementById('btn-trigger-stretch')?.addEventListener('click', () => this.onStartStretchClick());
  }
}
