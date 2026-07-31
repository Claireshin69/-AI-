/**
 * PostureAnalyzer.js
 * Posture Analysis & Status Evaluation Engine (Phase 3).
 * Evaluates posture angles (Pitch/Roll), maintains zero calibration,
 * tracks 3-second bad posture alert timer, plays Web Audio chime,
 * calculates live posture score (0-100), and persists stats to localStorage.
 */

export class PostureAnalyzer {
  constructor(options = {}) {
    this.zeroPitch = 0;
    this.zeroRoll = 0;
    this.thresholdWarn = 10.0;
    this.thresholdDanger = 15.0;

    // Analytics counters
    this.totalSeconds = 0;
    this.goodSeconds = 0;
    this.badSeconds = 0;
    this.sustainedBadCount = 0; // Tick counter for 3-second alert trigger
    this.alertCount = 0;
    this.audioCtx = null;

    this.onStatusEvaluated = options.onStatusEvaluated || (() => {});
    this.onAlertTriggered = options.onAlertTriggered || (() => {});

    this.loadSettings();
  }

  // Set current raw angles as 0-point calibration
  calibrate(rawPitch, rawRoll) {
    this.zeroPitch = rawPitch;
    this.zeroRoll = rawRoll;
    this.saveSettings();
    console.log(`[PostureAnalyzer] Zero Point Calibrated -> Pitch Offset: ${this.zeroPitch}°, Roll Offset: ${this.zeroRoll}°`);
  }

  // Main Angle Processing & Evaluation Engine
  evaluate(rawPitch, rawRoll) {
    const pitch = rawPitch - this.zeroPitch;
    const roll = rawRoll - this.zeroRoll;

    const absPitch = Math.abs(pitch);
    const absRoll = Math.abs(roll);

    let status = 'good';
    if (absPitch > this.thresholdDanger || absRoll > this.thresholdDanger) {
      status = 'danger';
    } else if (absPitch > this.thresholdWarn || absRoll > this.thresholdWarn) {
      status = 'warn';
    }

    // Time & Alert Tracking (Assuming ~5 ticks per second / 200ms)
    this.totalSeconds += 0.2;

    if (status === 'danger') {
      this.badSeconds += 0.2;
      this.sustainedBadCount += 0.2;

      // 3-Second Sustained Danger Alert Trigger
      if (this.sustainedBadCount >= 3.0) {
        this.alertCount++;
        this.sustainedBadCount = 0; // Reset timer for next alert interval
        this.triggerAlert();
      }
    } else if (status === 'warn') {
      this.sustainedBadCount = 0;
    } else {
      this.goodSeconds += 0.2;
      this.sustainedBadCount = 0;
    }

    // Calculate Live Posture Score (0-100)
    const ratio = this.totalSeconds > 0 ? (this.goodSeconds / this.totalSeconds) : 1;
    const score = Math.max(0, Math.min(100, Math.round(ratio * 100 - (this.alertCount * 2))));

    const result = {
      pitch: parseFloat(pitch.toFixed(1)),
      roll: parseFloat(roll.toFixed(1)),
      rawPitch,
      rawRoll,
      status,
      score,
      totalSeconds: Math.round(this.totalSeconds),
      goodSeconds: Math.round(this.goodSeconds),
      badSeconds: Math.round(this.badSeconds),
      alertCount: this.alertCount,
      summaryText: this.getSummaryText(status, absPitch)
    };

    this.onStatusEvaluated(result);
    this.saveDailySummary(result);
    return result;
  }

  getSummaryText(status, absPitch) {
    if (status === 'danger') {
      return `🚨 경고! 목이 ${absPitch.toFixed(1)}° 앞으로 구부정합니다. 허리를 세우세요!`;
    } else if (status === 'warn') {
      return `😐 자세가 조금 기울었습니다. 턱을 가슴 쪽으로 당겨주세요.`;
    }
    return `😊 바른 척추 및 목 각도를 잘 유지하고 있습니다.`;
  }

  // Play Web Audio API Beep Chime
  playBeepSound() {
    try {
      if (!this.audioCtx) {
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(880, this.audioCtx.currentTime); // A5
      osc.frequency.exponentialRampToValueAtTime(440, this.audioCtx.currentTime + 0.4); // Drop pitch
      gain.gain.setValueAtTime(0.3, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.4);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.45);
    } catch (e) {}
  }

  // Trigger Hybrid Alert (Screen Border Pulse + Sound + Toast Callback)
  triggerAlert() {
    document.body.classList.add('alert-active');
    this.playBeepSound();

    setTimeout(() => {
      document.body.classList.remove('alert-active');
    }, 1500);

    this.onAlertTriggered('🚨 3초 이상 구부정한 자세가 지속되었습니다! 허리와 목을 펴세요.');
  }

  // LocalStorage Persistence
  saveSettings() {
    try {
      localStorage.setItem('posture_settings', JSON.stringify({
        zeroPitch: this.zeroPitch,
        zeroRoll: this.zeroRoll,
        thresholdWarn: this.thresholdWarn,
        thresholdDanger: this.thresholdDanger
      }));
    } catch (e) {}
  }

  loadSettings() {
    try {
      const data = localStorage.getItem('posture_settings');
      if (data) {
        const parsed = JSON.parse(data);
        this.zeroPitch = parsed.zeroPitch || 0;
        this.zeroRoll = parsed.zeroRoll || 0;
        this.thresholdWarn = parsed.thresholdWarn || 10.0;
        this.thresholdDanger = parsed.thresholdDanger || 15.0;
      }
    } catch (e) {}
  }

  saveDailySummary(result) {
    try {
      const today = new Date().toISOString().split('T')[0];
      localStorage.setItem('posture_daily_summary', JSON.stringify({
        date: today,
        score: result.score,
        totalSeconds: result.totalSeconds,
        goodSeconds: result.goodSeconds,
        badSeconds: result.badSeconds,
        alertCount: result.alertCount
      }));
    } catch (e) {}
  }
}
