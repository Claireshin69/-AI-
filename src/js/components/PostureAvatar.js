/**
 * PostureAvatar.js
 * 2D Posture Avatar component.
 * Physically tilts SVG character model according to pitch & roll sensor input.
 */

export class PostureAvatar {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.render();
  }

  render() {
    if (!this.container) return;
    this.container.innerHTML = `
      <div class="glass-card avatar-view-container">
        <h3 style="font-size: 1.1rem; font-weight: 700; color: #fff; width: 100%; margin-bottom: 0.5rem;">
          👤 실시간 자세 아바타
        </h3>

        <div class="avatar-wrapper">
          <div class="avatar-halo" id="avatar-halo"></div>

          <!-- SVG Posture Character -->
          <svg class="avatar-svg" id="avatar-svg" viewBox="0 0 120 150" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- Spine base -->
            <rect x="52" y="110" width="16" height="35" rx="4" fill="rgba(255,255,255,0.15)"/>
            
            <!-- Shoulders / Torso -->
            <path d="M 25 75 Q 60 65 95 75 L 85 110 Q 60 115 35 110 Z" fill="url(#torso-grad)" stroke="var(--cyan-accent)" stroke-width="1.5"/>
            
            <!-- Neck Spine Joint -->
            <line id="avatar-spine" x1="60" y1="65" x2="60" y2="45" stroke="#06B6D4" stroke-width="6" stroke-linecap="round"/>
            
            <!-- Head Circle -->
            <circle id="avatar-head" cx="60" cy="30" r="18" fill="#1E293B" stroke="var(--cyan-accent)" stroke-width="2.5"/>
            <!-- Visor / Face expression -->
            <ellipse id="avatar-eyes" cx="60" cy="28" rx="8" ry="4" fill="var(--cyan-accent)"/>

            <defs>
              <linearGradient id="torso-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#334155"/>
                <stop offset="100%" stop-color="#1E293B"/>
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div id="avatar-status-label" class="status-badge good" style="margin-top: 0.5rem;">
          😊 바른 자세 유지 중
        </div>
      </div>
    `;
  }

  update(pitch, roll, status = 'good') {
    const avatarSvg = document.getElementById('avatar-svg');
    const avatarHalo = document.getElementById('avatar-halo');
    const statusLabel = document.getElementById('avatar-status-label');

    if (avatarSvg) {
      // Physical rotation mapping
      const tiltForward = pitch * 1.2; // Pitch simulates forward slump
      const tiltSide = roll * 0.8;      // Roll simulates side leaning

      avatarSvg.style.transform = `rotate(${tiltSide}deg) translateY(${Math.max(0, tiltForward * 0.5)}px)`;
    }

    if (avatarHalo && statusLabel) {
      avatarHalo.classList.remove('warn', 'danger');
      statusLabel.classList.remove('good', 'warn', 'danger');

      if (status === 'danger') {
        avatarHalo.classList.add('danger');
        statusLabel.classList.add('danger');
        statusLabel.innerHTML = '🚨 거북목/구부정한 자세 감지!';
      } else if (status === 'warn') {
        avatarHalo.classList.add('warn');
        statusLabel.classList.add('warn');
        statusLabel.innerHTML = '😐 자세가 다소 기울었습니다';
      } else {
        statusLabel.classList.add('good');
        statusLabel.innerHTML = '😊 바른 자세 유지 중';
      }
    }
  }
}
