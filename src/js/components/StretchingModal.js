/**
 * StretchingModal.js
 * Interactive 1-Minute Stretching Guide Modal Component.
 * Features countdown timer, step-by-step neck/shoulder stretches, and audio cues.
 */

export class StretchingModal {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.timer = null;
    this.secondsLeft = 60;
    this.render();
  }

  render() {
    if (!this.container) return;
    this.container.innerHTML = `
      <div class="modal-overlay" id="stretch-modal-overlay">
        <div class="modal-content-card">
          <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🧘‍♂️</div>
          <h2 style="font-size: 1.5rem; font-weight: 700; color: #fff; margin-bottom: 0.5rem;">
            1분 거북목 & 어깨 힐링 스트레칭
          </h2>
          <p style="font-size: 0.9rem; color: var(--text-muted);">
            지친 목과 척추 근육을 이완시켜 주세요. 카운트다운 동안 천천히 따라 해보세요.
          </p>

          <div class="stretch-timer-countdown num-font" id="modal-stretch-timer">
            01:00
          </div>

          <div style="background: rgba(255,255,255,0.05); padding: 1rem; border-radius: var(--border-radius-md); border: 1px solid var(--border-glass); margin-bottom: 1.5rem; text-align: left;">
            <div style="font-weight: 600; color: var(--cyan-accent); margin-bottom: 0.25rem;">
              📌 단계별 동작 가이드:
            </div>
            <ol style="font-size: 0.88rem; color: var(--text-main); padding-left: 1.2rem; line-height: 1.6;">
              <li>턱을 가슴 쪽으로 천천히 당겨 목 뒤 근육을 15초간 늘려줍니다.</li>
              <li>양 어깨를 뒤로 크게 돌려 견갑골을 쪼여줍니다.</li>
              <li>양손을 머리 뒤로 깍지 끼고 고개를 천천히 뒤로 넘겨 하늘을 봅니다.</li>
            </ol>
          </div>

          <button class="btn btn-primary" id="btn-close-stretch-modal" style="width: 100%;">
            완료하고 대시보드로 돌아가기
          </button>
        </div>
      </div>
    `;

    document.getElementById('btn-close-stretch-modal')?.addEventListener('click', () => this.close());
  }

  open() {
    const overlay = document.getElementById('stretch-modal-overlay');
    if (overlay) overlay.classList.add('active');

    this.secondsLeft = 60;
    this.updateTimerDisplay();

    if (this.timer) clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.secondsLeft--;
      this.updateTimerDisplay();
      if (this.secondsLeft <= 0) {
        clearInterval(this.timer);
        this.timer = null;
      }
    }, 1000);
  }

  close() {
    const overlay = document.getElementById('stretch-modal-overlay');
    if (overlay) overlay.classList.remove('active');
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  updateTimerDisplay() {
    const display = document.getElementById('modal-stretch-timer');
    if (!display) return;
    const mins = String(Math.floor(this.secondsLeft / 60)).padStart(2, '0');
    const secs = String(this.secondsLeft % 60).padStart(2, '0');
    display.textContent = `${mins}:${secs}`;
  }
}
