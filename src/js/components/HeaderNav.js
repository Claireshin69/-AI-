/**
 * HeaderNav.js
 * Header component with brand logo, Web Serial & MediaPipe status indicator, and mode toggle buttons.
 */

export class HeaderNav {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.onConnectClick = options.onConnectClick || (() => {});
    this.onWebcamClick = options.onWebcamClick || (() => {});
    this.onSimulateClick = options.onSimulateClick || (() => {});
    this.render();
  }

  render() {
    if (!this.container) return;
    this.container.innerHTML = `
      <header class="header-nav">
        <div class="brand-logo">
          <div class="brand-icon">🧘</div>
          <div>
            <div class="brand-title">IoT 바른 자세 코치</div>
            <div style="font-size: 0.72rem; color: var(--text-muted);">MediaPipe AI Pose & Arduino MPU6050</div>
          </div>
        </div>

        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <div class="serial-status-indicator" id="header-status-badge">
            <span class="status-dot" id="header-status-dot"></span>
            <span id="header-status-text">감지 대기 중</span>
          </div>

          <button class="btn btn-primary" id="btn-webcam-toggle" title="MediaPipe AI 웹캠 자세 감지 시작">
            📷 AI 웹캠 감지
          </button>

          <button class="btn btn-secondary" id="btn-serial-connect" title="아두이노 USB 시리얼 포트 연동">
            🔌 아두이노 연결
          </button>

          <button class="btn btn-secondary" id="btn-simulation-toggle" title="가상 센서 수치로 테스트">
            ⚡ 시뮬레이터
          </button>
        </div>
      </header>
    `;

    document.getElementById('btn-webcam-toggle')?.addEventListener('click', () => this.onWebcamClick());
    document.getElementById('btn-serial-connect')?.addEventListener('click', () => this.onConnectClick());
    document.getElementById('btn-simulation-toggle')?.addEventListener('click', () => this.onSimulateClick());
  }

  updateStatus(isConnected, statusMessage) {
    const dot = document.getElementById('header-status-dot');
    const text = document.getElementById('header-status-text');
    if (dot && text) {
      text.textContent = statusMessage;
      if (isConnected) {
        dot.classList.add('connected');
      } else {
        dot.classList.remove('connected');
      }
    }
  }
}
