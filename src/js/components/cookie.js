// Interactive Cookie Engine & Crumb Particle System Component
import confetti from 'canvas-confetti';
import { audioSynth } from '../utils/audio.js';

export class FortuneCookieEngine {
  constructor(containerEl, canvasEl, onOpenCallback) {
    this.container = containerEl;
    this.canvas = canvasEl;
    this.ctx = canvasEl.getContext('2d');
    this.onOpen = onOpenCallback;
    this.state = 'idle'; // 'idle', 'animating', 'opened'

    this.particles = [];
    this.animId = null;

    this.initCanvas();
    this.renderCookieDOM();
    this.bindEvents();
    this.startParticleLoop();
  }

  initCanvas() {
    const resize = () => {
      const rect = this.container.getBoundingClientRect();
      this.canvas.width = rect.width || 400;
      this.canvas.height = rect.height || 400;
    };
    resize();
    window.addEventListener('resize', resize);
  }

  renderCookieDOM() {
    this.container.innerHTML = `
      <div class="cookie-stage" id="cookieStage">
        <div class="glow-aura"></div>
        <div class="cookie-wrapper" id="cookieWrapper">
          <!-- Left Half -->
          <div class="cookie-half left-half" id="cookieLeft">
            <svg viewBox="0 0 200 200" class="cookie-svg">
              <defs>
                <linearGradient id="cookieGradLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#FDE68A" />
                  <stop offset="50%" stop-color="#F59E0B" />
                  <stop offset="100%" stop-color="#B45309" />
                </linearGradient>
                <filter id="shadowLeft">
                  <feDropShadow dx="-2" dy="8" stdDeviation="6" flood-color="#000" flood-opacity="0.4"/>
                </filter>
              </defs>
              <path d="M 100 25 C 50 25 15 65 15 115 C 15 160 55 185 98 185 C 95 140 85 95 98 25 Z" fill="url(#cookieGradLeft)" filter="url(#shadowLeft)"/>
              <path d="M 30 90 C 55 125 75 150 95 178" stroke="#FEE2E2" stroke-width="4" stroke-linecap="round" opacity="0.4" fill="none"/>
              <path d="M 60 45 C 80 80 90 120 96 175" stroke="#78350F" stroke-width="3" stroke-linecap="round" opacity="0.3" fill="none"/>
            </svg>
          </div>

          <!-- Right Half -->
          <div class="cookie-half right-half" id="cookieRight">
            <svg viewBox="0 0 200 200" class="cookie-svg">
              <defs>
                <linearGradient id="cookieGradRight" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#FEF08A" />
                  <stop offset="50%" stop-color="#D97706" />
                  <stop offset="100%" stop-color="#92400E" />
                </linearGradient>
                <filter id="shadowRight">
                  <feDropShadow dx="4" dy="8" stdDeviation="6" flood-color="#000" flood-opacity="0.4"/>
                </filter>
              </defs>
              <path d="M 100 25 C 103 95 105 140 102 185 C 145 185 185 160 185 115 C 185 65 150 25 100 25 Z" fill="url(#cookieGradRight)" filter="url(#shadowRight)"/>
              <path d="M 170 90 C 145 125 125 150 105 178" stroke="#FEF08A" stroke-width="4" stroke-linecap="round" opacity="0.4" fill="none"/>
              <path d="M 140 45 C 120 80 110 120 104 175" stroke="#78350F" stroke-width="3" stroke-linecap="round" opacity="0.3" fill="none"/>
            </svg>
          </div>

          <!-- Paper Slip Peek inside cookie -->
          <div class="paper-peek" id="paperPeek">
            <span>🥠 오늘을 위한 특별한 포춘...</span>
          </div>
        </div>

        <div class="click-hint" id="clickHint">
          <span class="pulse-icon">👆</span> 포춘 쿠키를 클릭해서 쪼개보세요!
        </div>
      </div>
    `;

    this.wrapper = this.container.querySelector('#cookieWrapper');
    this.leftHalf = this.container.querySelector('#cookieLeft');
    this.rightHalf = this.container.querySelector('#cookieRight');
    this.paperPeek = this.container.querySelector('#paperPeek');
    this.clickHint = this.container.querySelector('#clickHint');
  }

  bindEvents() {
    this.wrapper.addEventListener('click', () => this.handleCookieClick());
    this.wrapper.addEventListener('mouseenter', () => {
      if (this.state === 'idle') {
        audioSynth.playTap();
      }
    });
  }

  handleCookieClick() {
    if (this.state !== 'idle') return;
    this.state = 'animating';

    // Sound
    audioSynth.playCrack();

    // Trigger Crumb particles
    const rect = this.wrapper.getBoundingClientRect();
    const cRect = this.canvas.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2 - cRect.left;
    const centerY = rect.top + rect.height / 2 - cRect.top;
    this.spawnCrumbs(centerX, centerY, 45);

    // CSS Splitting animation classes
    this.wrapper.classList.add('cracking');
    this.clickHint.style.opacity = '0';

    setTimeout(() => {
      this.wrapper.classList.add('split-open');
      audioSynth.playUnroll();
    }, 200);

    setTimeout(() => {
      // Confetti Sparkle
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F59E0B', '#FDE68A', '#F59E0B', '#FFFFFF', '#EC4899']
      });

      audioSynth.playRevealJingle();
      this.state = 'opened';
      if (this.onOpen) this.onOpen();
    }, 600);
  }

  spawnCrumbs(x, y, count) {
    const colors = ['#FDE68A', '#F59E0B', '#D97706', '#92400E', '#FFFFFF'];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 8 + 2;
      this.particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2, // upward initial push
        size: Math.random() * 6 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI,
        vRot: (Math.random() - 0.5) * 0.3,
        alpha: 1,
        life: 1
      });
    }
  }

  startParticleLoop() {
    const update = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.35; // gravity
        p.rotation += p.vRot;
        p.life -= 0.02;
        p.alpha = Math.max(0, p.life);

        if (p.life <= 0) {
          this.particles.splice(i, 1);
          continue;
        }

        this.ctx.save();
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate(p.rotation);
        this.ctx.globalAlpha = p.alpha;
        this.ctx.fillStyle = p.color;
        this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        this.ctx.restore();
      }

      this.animId = requestAnimationFrame(update);
    };
    update();
  }

  reset() {
    this.state = 'idle';
    this.wrapper.classList.remove('cracking', 'split-open');
    this.clickHint.style.opacity = '1';
  }
}
