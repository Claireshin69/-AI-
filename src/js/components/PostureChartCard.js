/**
 * PostureChartCard.js
 * Real-time serial telemetry line chart canvas component.
 * Plots Pitch & Roll angle history dynamically.
 */

export class PostureChartCard {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.historyPitch = [];
    this.historyRoll = [];
    this.maxPoints = 40;
    this.render();
  }

  render() {
    if (!this.container) return;
    this.container.innerHTML = `
      <div class="glass-card" style="width: 100%;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
          <h3 style="font-size: 1.1rem; font-weight: 700; color: #fff;">
            📈 실시간 각도 텔레메트리 (Pitch / Roll)
          </h3>
          <div style="display: flex; gap: 1rem; font-size: 0.8rem;">
            <span style="color: var(--cyan-accent); font-weight: 600;">─ Pitch (앞/뒤)</span>
            <span style="color: var(--indigo-accent); font-weight: 600;">─ Roll (좌/우)</span>
          </div>
        </div>

        <div class="chart-container-box">
          <canvas id="telemetry-chart-canvas"></canvas>
        </div>
      </div>
    `;

    this.initCanvas();
  }

  initCanvas() {
    this.canvas = document.getElementById('telemetry-chart-canvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
  }

  resizeCanvas() {
    if (!this.canvas) return;
    const parent = this.canvas.parentElement;
    this.canvas.width = parent.clientWidth;
    this.canvas.height = parent.clientHeight || 200;
    this.draw();
  }

  pushData(pitch, roll) {
    this.historyPitch.push(pitch);
    this.historyRoll.push(roll);

    if (this.historyPitch.length > this.maxPoints) {
      this.historyPitch.shift();
      this.historyRoll.shift();
    }

    this.draw();
  }

  draw() {
    if (!this.ctx || !this.canvas) return;
    const w = this.canvas.width;
    const h = this.canvas.height;
    const ctx = this.ctx;

    ctx.clearRect(0, 0, w, h);

    // Draw background grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    const gridYStep = h / 4;
    for (let y = gridYStep; y < h; y += gridYStep) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Zero degree center line
    const zeroY = h / 2;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.beginPath();
    ctx.setLineDash([4, 4]);
    ctx.moveTo(0, zeroY);
    ctx.lineTo(w, zeroY);
    ctx.stroke();
    ctx.setLineDash([]);

    if (this.historyPitch.length < 2) return;

    const stepX = w / (this.maxPoints - 1);

    // Function to map angle (-30..+30) to Y pixel coordinate
    const angleToY = (deg) => {
      const clamped = Math.max(-30, Math.min(30, deg));
      return zeroY - (clamped / 30) * (h / 2 - 20);
    };

    // Draw Pitch Line (Cyan)
    ctx.strokeStyle = '#06B6D4';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    this.historyPitch.forEach((val, i) => {
      const x = i * stepX;
      const y = angleToY(val);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Draw Roll Line (Indigo)
    ctx.strokeStyle = '#6366F1';
    ctx.lineWidth = 2;
    ctx.beginPath();
    this.historyRoll.forEach((val, i) => {
      const x = i * stepX;
      const y = angleToY(val);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
  }
}
