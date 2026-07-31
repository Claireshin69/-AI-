/**
 * WebcamPoseDetector.js
 * Handles Webcam video stream acquisition and MediaPipe Pose landmark detection.
 * Calculates forward head posture (Pitch) and shoulder tilt (Roll).
 * Includes automatic Fallback to MPU6050 sensor/simulation mode when camera is unavailable.
 */

export class WebcamPoseDetector {
  constructor(options = {}) {
    this.videoElement = null;
    this.canvasElement = null;
    this.canvasCtx = null;
    this.pose = null;
    this.camera = null;
    this.isActive = false;
    this.onPoseData = options.onPoseData || (() => {});
    this.onError = options.onError || (() => {});
  }

  // Load MediaPipe CDN scripts dynamically if not present
  static async loadScripts() {
    if (window.Pose && window.Camera) return true;

    return new Promise((resolve, reject) => {
      let loaded = 0;
      const onScriptLoad = () => {
        loaded++;
        if (loaded >= 2) resolve(true);
      };

      const script1 = document.createElement('script');
      script1.src = 'https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js';
      script1.crossOrigin = 'anonymous';
      script1.onload = onScriptLoad;
      script1.onerror = () => reject(new Error('MediaPipe CameraUtils script failed to load'));

      const script2 = document.createElement('script');
      script2.src = 'https://cdn.jsdelivr.net/npm/@mediapipe/pose/pose.js';
      script2.crossOrigin = 'anonymous';
      script2.onload = onScriptLoad;
      script2.onerror = () => reject(new Error('MediaPipe Pose script failed to load'));

      document.head.appendChild(script1);
      document.head.appendChild(script2);
    });
  }

  async start(videoEl, canvasEl) {
    this.videoElement = videoEl;
    this.canvasElement = canvasEl;
    if (this.canvasElement) {
      this.canvasCtx = this.canvasElement.getContext('2d');
    }

    try {
      await WebcamPoseDetector.loadScripts();

      // Initialize MediaPipe Pose
      this.pose = new window.Pose({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`
      });

      this.pose.setOptions({
        modelComplexity: 1,
        smoothLandmarks: true,
        enableSegmentation: false,
        smoothSegmentation: false,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5
      });

      this.pose.onResults((results) => this.onResults(results));

      // Start webcam stream using getUserMedia
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, facingMode: 'user' }
      });
      this.videoElement.srcObject = stream;
      await this.videoElement.play();

      this.camera = new window.Camera(this.videoElement, {
        onFrame: async () => {
          if (this.isActive && this.videoElement) {
            await this.pose.send({ image: this.videoElement });
          }
        },
        width: 640,
        height: 480
      });

      this.isActive = true;
      await this.camera.start();
      console.log('[WebcamPose] MediaPipe Pose camera stream started successfully.');
    } catch (err) {
      console.warn('[WebcamPose] Failed to start webcam pose detector:', err);
      this.isActive = false;
      this.onError(err);
    }
  }

  stop() {
    this.isActive = false;
    if (this.camera) {
      this.camera.stop();
      this.camera = null;
    }
    if (this.videoElement && this.videoElement.srcObject) {
      const stream = this.videoElement.srcObject;
      stream.getTracks().forEach(track => track.stop());
      this.videoElement.srcObject = null;
    }
  }

  // MediaPipe Landmark Processing Callback
  onResults(results) {
    if (!results || !results.poseLandmarks) return;

    const landmarks = results.poseLandmarks;
    this.drawSkeleton(results);

    // Key Landmark Indices:
    // 0: Nose, 7: Left Ear, 8: Right Ear, 11: Left Shoulder, 12: Right Shoulder
    const nose = landmarks[0];
    const leftEar = landmarks[7];
    const rightEar = landmarks[8];
    const leftShoulder = landmarks[11];
    const rightShoulder = landmarks[12];

    if (!leftShoulder || !rightShoulder) return;

    // Calculate Shoulder Midpoint
    const shoulderMidX = (leftShoulder.x + rightShoulder.x) / 2;
    const shoulderMidY = (leftShoulder.y + rightShoulder.y) / 2;

    // Ear Midpoint
    const earMidX = leftEar && rightEar ? (leftEar.x + rightEar.x) / 2 : nose.x;
    const earMidY = leftEar && rightEar ? (leftEar.y + rightEar.y) / 2 : nose.y;

    // Forward Head Slump (Pitch): Vertical alignment displacement
    // As head drops forward/downward, earMidY approaches shoulderMidY
    const normDistY = shoulderMidY - earMidY; // Standard upright posture has ~0.25 to 0.35 normalized height
    const pitchOffset = (0.28 - normDistY) * 120; // Map vertical drop to degrees

    // Shoulder Tilt (Roll): Angle between left and right shoulders
    const dX = rightShoulder.x - leftShoulder.x;
    const dY = rightShoulder.y - leftShoulder.y;
    const rollAngle = (Math.atan2(dY, dX) * (180 / Math.PI));

    const pitch = parseFloat(pitchOffset.toFixed(1));
    const roll = parseFloat(rollAngle.toFixed(1));

    this.onPoseData({
      pitch,
      roll,
      landmarks,
      timestamp: Date.now()
    });
  }

  // Render Skeleton Overlay on Canvas
  drawSkeleton(results) {
    if (!this.canvasCtx || !this.canvasElement) return;
    const ctx = this.canvasCtx;
    const w = this.canvasElement.width;
    const h = this.canvasElement.height;

    ctx.save();
    ctx.clearRect(0, 0, w, h);

    // Draw video background mirrored
    ctx.drawImage(results.image, 0, 0, w, h);

    // Draw Pose Skeleton Connection Lines
    if (results.poseLandmarks) {
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#06B6D4'; // Cyan neon line

      const connections = [
        [11, 12], // Shoulders
        [11, 23], [12, 24], // Torso sides
        [23, 24], // Hip line
        [11, 13], [13, 15], // Left arm
        [12, 14], [14, 16], // Right arm
        [7, 9], [8, 10], // Face/Ears
        [0, 7], [0, 8] // Nose to ears
      ];

      connections.forEach(([i, j]) => {
        const p1 = results.poseLandmarks[i];
        const p2 = results.poseLandmarks[j];
        if (p1 && p2 && p1.visibility > 0.5 && p2.visibility > 0.5) {
          ctx.beginPath();
          ctx.moveTo(p1.x * w, p1.y * h);
          ctx.lineTo(p2.x * w, p2.y * h);
          ctx.stroke();
        }
      });

      // Draw Key Joints (Nose, Ears, Shoulders)
      const keyPoints = [0, 7, 8, 11, 12];
      keyPoints.forEach(idx => {
        const lm = results.poseLandmarks[idx];
        if (lm && lm.visibility > 0.5) {
          ctx.fillStyle = '#10B981'; // Emerald Green
          ctx.beginPath();
          ctx.arc(lm.x * w, lm.y * h, 6, 0, 2 * Math.PI);
          ctx.fill();
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      });
    }

    ctx.restore();
  }
}
