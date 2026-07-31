/**
 * SensorLevelGauge.js
 * 2D Circular Level Target visualization component.
 * Displays Pitch (forward inclination) & Roll (side inclination) with dynamic moving bubble.
 */

export class SensorLevelGauge {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.render();
  }

  render() {
    if (!this.container) return;
    this.container.innerHTML = `
      <div class="glass-card sensor-gauge-card">
        <div style="display: flex; justify-content: space-between; width: 100%; align-items: center;">
          <h3 style="font-size: 1.1rem; font-weight: 700; color: #fff;">🎯 센서 수평계 (2D Level)</h3>
          <span style="font-size: 0.75rem; color: var(--cyan-accent); font-family: var(--font-num);">MPU6050</span>
        </div>

        <div class="radar-target-container">
          <div class="target-crosshair-h"></div>
          <div class="target-crosshair-v"></div>
          <div class="target-safe-zone"></div>
          <div class="sensor-bubble" id="gauge-bubble"></div>
        </div>

        <div class="angle-readout-row">
          <div class="angle-badge">
            <div class="angle-label">Pitch (앞/뒤 숙임)</div>
            <div class="angle-val num-font" id="gauge-pitch-val">+0.0°</div>
          </div>
          <div class="angle-badge">
            <div class="angle-label">Roll (좌/우 쏠림)</div>
            <div class="angle-val num-font" id="gauge-roll-val">+0.0°</div>
          </div>
        </div>
      </div>
    `;
  }

  update(pitch, roll, status = 'good') {
    const bubble = document.getElementById('gauge-bubble');
    const pitchVal = document.getElementById('gauge-pitch-val');
    const rollVal = document.getElementById('gauge-roll-val');

    if (pitchVal && rollVal) {
      pitchVal.textContent = `${pitch >= 0 ? '+' : ''}${pitch.toFixed(1)}°`;
      rollVal.textContent = `${roll >= 0 ? '+' : ''}${roll.toFixed(1)}°`;
    }

    if (bubble) {
      // Map pitch (-30 to +30 deg) to Y offset (-80 to +80 px)
      // Map roll (-30 to +30 deg) to X offset (-80 to +80 px)
      const clampedRoll = Math.max(-30, Math.min(30, roll));
      const clampedPitch = Math.max(-30, Math.min(30, pitch));

      const posX = (clampedRoll / 30) * 80;
      const posY = (clampedPitch / 30) * 80;

      bubble.style.transform = `translate(${posX}px, ${posY}px)`;

      // Class status transition
      bubble.classList.remove('good', 'warn', 'danger');
      if (status === 'warn') bubble.classList.add('warn');
      else if (status === 'danger') bubble.classList.add('danger');
      else bubble.classList.add('good');
    }
  }
}
