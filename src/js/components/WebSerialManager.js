/**
 * WebSerialManager.js
 * Manages Web Serial API communication with Arduino (MPU6050 telemetry)
 * Includes a simulation mode for demo and testing without physical hardware.
 */

export class WebSerialManager {
  constructor(onDataReceived, onStatusChange) {
    this.port = null;
    this.reader = null;
    this.isConnected = false;
    this.isSimulating = false;
    this.simulationTimer = null;
    this.onDataReceived = onDataReceived || (() => {});
    this.onStatusChange = onStatusChange || (() => {});

    // Calibration offsets
    this.zeroPitch = 0;
    this.zeroRoll = 0;
  }

  // Check if Web Serial API is supported in the browser
  static isSupported() {
    return 'serial' in navigator;
  }

  // Set current sensor angles as 0-point calibration
  calibrate(currentRawPitch, currentRawRoll) {
    this.zeroPitch = currentRawPitch;
    this.zeroRoll = currentRawRoll;
    console.log(`[WebSerial] Calibrated Zero Offset -> Pitch: ${this.zeroPitch.toFixed(1)}°, Roll: ${this.zeroRoll.toFixed(1)}°`);
  }

  // Connect to Arduino via Web Serial API
  async connect() {
    if (!WebSerialManager.isSupported()) {
      alert('이 브라우저는 Web Serial API를 지원하지 않습니다. Chrome 또는 Edge 브라우저를 사용해 주세요. (데모 시뮬레이션을 시작합니다)');
      this.startSimulation();
      return;
    }

    try {
      this.port = await navigator.serial.requestPort();
      await this.port.open({ baudRate: 115200 });
      this.isConnected = true;
      this.stopSimulation();
      this.onStatusChange(true, 'Arduino (USB) 연결됨');
      this.readLoop();
    } catch (err) {
      console.warn('[WebSerial] Connection failed or cancelled:', err);
      this.onStatusChange(false, '연결 안 됨 (시뮬레이션 가동 중)');
      this.startSimulation();
    }
  }

  // Disconnect serial port
  async disconnect() {
    this.stopSimulation();
    if (this.reader) {
      await this.reader.cancel();
      this.reader = null;
    }
    if (this.port) {
      await this.port.close();
      this.port = null;
    }
    this.isConnected = false;
    this.onStatusChange(false, '연결 해제됨');
  }

  // Continuous read loop for incoming serial stream
  async readLoop() {
    const textDecoder = new TextDecoderStream();
    const readableStreamClosed = this.port.readable.pipeTo(textDecoder.writable);
    this.reader = textDecoder.readable.getReader();

    let buffer = '';
    try {
      while (true) {
        const { value, done } = await this.reader.read();
        if (done) break;
        if (value) {
          buffer += value;
          const lines = buffer.split('\n');
          buffer = lines.pop(); // Keep incomplete line

          for (const line of lines) {
            this.parseLine(line.trim());
          }
        }
      }
    } catch (err) {
      console.error('[WebSerial] Read error:', err);
    } finally {
      this.reader.releaseLock();
    }
  }

  // Parse JSON packet sent by Arduino
  parseLine(line) {
    if (!line) return;
    try {
      // Expected format: {"pitch": 12.4, "roll": -1.2, "isBad": 0}
      const data = JSON.parse(line);
      const calibratedPitch = (data.pitch || 0) - this.zeroPitch;
      const calibratedRoll = (data.roll || 0) - this.zeroRoll;
      
      this.onDataReceived({
        pitch: parseFloat(calibratedPitch.toFixed(1)),
        roll: parseFloat(calibratedRoll.toFixed(1)),
        rawPitch: data.pitch,
        rawRoll: data.roll,
        isBad: data.isBad || 0,
        timestamp: Date.now()
      });
    } catch (e) {
      // Ignore non-JSON serial logs
    }
  }

  // Telemetry simulation for testing without physical Arduino
  startSimulation() {
    if (this.isSimulating) return;
    this.isSimulating = true;
    this.onStatusChange(true, '시뮬레이터 (가상 아두이노 모드)');

    let tick = 0;
    this.simulationTimer = setInterval(() => {
      tick += 0.2;
      // Generate synthetic sine wave pitch/roll angles with occasional bad posture spikes
      let basePitch = Math.sin(tick) * 4;
      let baseRoll = Math.cos(tick * 0.7) * 3;

      // Force bad posture every 20 seconds for testing alerts
      if (Math.floor(tick) % 20 > 14) {
        basePitch += 18.5; // Simulate neck slumping forward
      }

      const calibratedPitch = basePitch - this.zeroPitch;
      const calibratedRoll = baseRoll - this.zeroRoll;
      const isBad = Math.abs(calibratedPitch) > 15 || Math.abs(calibratedRoll) > 15 ? 1 : 0;

      this.onDataReceived({
        pitch: parseFloat(calibratedPitch.toFixed(1)),
        roll: parseFloat(calibratedRoll.toFixed(1)),
        rawPitch: basePitch,
        rawRoll: baseRoll,
        isBad: isBad,
        timestamp: Date.now()
      });
    }, 200);
  }

  stopSimulation() {
    if (this.simulationTimer) {
      clearInterval(this.simulationTimer);
      this.simulationTimer = null;
    }
    this.isSimulating = false;
  }
}
