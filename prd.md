# [PRD] 아두이노 기반 IoT 바른 자세 코치 (Posture Coach) 웹사이트

---

## 1. 프로젝트 개요 (Overview)

- **프로젝트명**: IoT 바른 자세 코치 (Smart Posture Coach IoT & Web)
- **작성자**: IoT 프로덕트 매니저 (Product Manager)
- **타겟 사용자**: 책상에 오래 앉아 공부하거나 일하는 학생, 개발자, 사무직 직장인 (거북목 및 굽은 어깨 예방이 필요한 분)
- **핵심 목표**: 
  1. 아두이노 센서(MPU6050)를 통해 사용자의 목/등 기울기 각도를 실시간으로 감지합니다.
  2. 나쁜 자세가 일정 시간 지속되면 **아두이노(진동/소리)**와 **웹사이트(화면/소리)**에서 즉시 하이브리드 알림을 제공합니다.
  3. 초보자도 쉽게 따라 할 수 있도록 **Web Serial API(USB 직렬 통신)**를 사용하여 별도의 복잡한 백엔드 서버 없이 브라우저에서 직접 아두이노와 연결합니다.
  4. 일간/주간 자세 통계 및 스트레칭 가이드를 제공하여 올바른 자세 습관 형성을 돕습니다.

---

## 2. 시스템 아키텍처 (System Architecture)

### 2.1 하드웨어 구성 (Hardware Stack)
| 구성 요소 | 부품명 | 역할 및 설명 |
| :--- | :--- | :--- |
| **메인 보드** | 아두이노 우노 (Arduino Uno) / ESP32 | 센서 데이터 수집 및 부저/진동 제어 |
| **자세 센서** | MPU-6050 (6축 자이로/가속도 센서) | 사용자의 목/등 기울기(Pitch, Roll) 각도 측정 |
| **알림 부품 A** | 피에조 부저 (Piezo Buzzer) | 나쁜 자세 감지 시 비프음 소리 경고 |
| **알림 부품 B** | 소형 진동 모터 (Vibration Motor) | 나쁜 자세 감지 시 착용자 부드러운 진동 경고 |
| **기타** | 브레드보드, 점퍼선, USB 케이블 | 부품 연결 및 전원/데이터 통신 공급 |

### 2.2 소프트웨어 및 통신 구성 (Software & Communication Stack)
- **통신 방식**: **Web Serial API** (Chrome 브라우저에서 USB 케이블 연동, 별도 Wi-Fi/서버 설정 불필요)
  *(※ 향후 ESP32 Wi-Fi / WebSockets 무선 확장 가능 구조)*
- **Frontend**: HTML5, Vanilla CSS3, Modern JavaScript (ES Modules)
- **데이터 시각화**: Chart.js (자세 유지 비율, 시간대별 나쁜 자세 횟수 그래프)
- **데이터 저장**: 브라우저 `localStorage` (로그인 없이 개인 자세 기록 영속 보관)

---

## 3. 초보자를 위한 아두이노 핀 연결 가이드 (Pin Mapping)

초보자도 브레드보드와 점퍼선으로 5분 만에 조립할 수 있는 표준 핀 맵입니다.

```text
[MPU-6050 센서]
- VCC  ---> Arduino 5V (또는 3.3V)
- GND  ---> Arduino GND
- SCL  ---> Arduino A5 (ESP32: GPIO 22)
- SDA  ---> Arduino A4 (ESP32: GPIO 21)

[피에조 부저]
- (+)  ---> Arduino Digital Pin 8
- (-)  ---> Arduino GND

[진동 모터 모듈]
- VCC  ---> Arduino Digital Pin 9 (PWM 제어)
- GND  ---> Arduino GND
```

---

## 4. 아두이노 ↔ 웹 데이터 통신 프로토콜 (Data Protocol)

아두이노는 1초에 5회(200ms 간격) 시리얼 포트(`Serial.println`)를 통해 아래 형식의 JSON 텍스트를 웹 브라우저로 전송합니다.

### 4.1 아두이노 -> 웹 전송 패킷 (JSON)
```json
{
  "pitch": 18.4,
  "roll": 2.1,
  "isBad": 1
}
```
- `pitch`: 앞/뒤 기울기 각도 (거북목/숙임 감지)
- `roll`: 좌/우 기울기 각도 (몸 쏠림 감지)
- `isBad`: 아두이노 임계값 기준 나쁜 자세 여부 (0: 정상, 1: 경고)

### 4.2 웹 -> 아두이노 제어 명령 (Web to Arduino)
- `"CAL" + \n`: 웹에서 '영점 잡기' 버튼 클릭 시 아두이노에 현재 자세 기준점(0도) 설정 요청
- `"BUZZ" + \n`: 웹에서 경고음 테스트 실행 시 아두이노 부저 울림

---

## 5. 핵심 기능 요구사항 (Detailed Feature Specifications)

### 5.1 실시간 자세 모니터링 & 영점 설정 (Calibration & Live View)
- **기준점(영점) 캘리브레이션 기능**:
  - 사용자가 바른 자세를 취하고 웹사이트의 **[바른 자세 등록]** 버튼을 누르면, 그 순간의 센서 각도가 '0도(기준)'로 저장됩니다.
- **실시간 인터랙티브 캐릭터/게이지 visual**:
  - 정상 범위(±10도 이내): 초록색 / "바른 자세 유지 중 😊"
  - 경계 범위(±10도 ~ 15도): 노란색 / "자세가 조금 기울었습니다 😐"
  - 위험 범위(±15도 초과): 빨간색 / "경고! 허리와 목을 펴세요 🚨"

### 5.2 하이브리드 듀얼 알림 시스템 (Dual Alarm System)
- **알림발동 조건**: 나쁜 자세(위험 범위)가 **3초 이상 지속**될 때.
- **아두이노 피드백**: 진동 모터 0.5초 간격 2회 진동 + 부저 1회 비프음.
- **웹사이트 피드백**:
  - 화면 테두리 빨간색 펄스 애니메이션.
  - 웹 브라우저 경고음 재생.
  - "3초째 목이 굽어있습니다!" 토스트 알림 표시.

### 5.3 일간/주간 자세 통계 대시보드 (Analytics & Reports)
- **오늘의 자세 점수**: (바른 자세 유지 시간 / 전체 앉은 시간) × 100점 계산.
- **Chart.js 그래픽 차트**:
  1. **시간대별 자세 상태**: 10분 단위 바른 자세 vs 나쁜 자세 꺾은선 그래프.
  2. **오늘의 나쁜 자세 발생 횟수**: 거북목(Pitch) / 좌우 쏠림(Roll) 요인 분석 파이 차트.

### 5.4 습관 형성 게이미피케이션 & 스트레칭 코칭 (Gamification & Stretching)
- **바른 자세 배지 시스템**:
  - '첫 캘리브레이션 완료', '30분 연속 바른 자세 달성', '오늘의 점수 80점 이상' 등 달성 시 훈장 배지 부여.
- **1분 스트레칭 타이머**:
  - 50분 연속 앉아있을 시 화면에 **[1분 힐링 스트레칭 타임]** 팝업 자동 실행.
  - 목 돌리기, 어깨 펴기 등 가벼운 CSS/GIF 모션 가이드 제공.

---

## 6. UI/UX 디자인 철학 (Design System)

- **디자인 컨셉**: Modern, Healthy, Clean, Interactive
- **컬러 팔레트**:
  - `Primary (정상)`: Emerald Green (`#10B981`)
  - `Warning (경계)`: Amber Yellow (`#F59E0B`)
  - `Alert (위험)`: Rose Red (`#EF4444`)
  - `Background`: Dark Slate Navy (`#0F172A`) - 눈의 피로를 줄여주는 차분한 다크모드
  - `Card / Surface`: Glassmorphism Semi-Transparent Blue-Gray (`rgba(30, 41, 59, 0.7)`)
- **폰트**: Pretendard, Google Fonts Outfit (숫자/각도 계기판용)

---

## 7. 화면 구조 및 사용자 유저 저니 (User Journey)

1. **대시보드 메인 화면 (`#view-dashboard`)**
   - 상단: 아두이노 시리얼 포트 연결 버튼 `[🔌 아두이노 연결하기]`
   - 중앙: 3D/2D 자세 시각화 아바타 & 실시간 Pitch/Roll 각도 텍스트 (예: Pitch: +14.2°)
   - 우측: [바른 자세 등록(영점)] 버튼, 타이머, 실시간 경고 상태 뱃지
2. **통계 & 리포트 화면 (`#view-stats`)**
   - 오늘 하루 총 측정 시간, 자세 점수(85점), 나쁜 자세 경고 횟수(12회)
   - 시간대별/일간 통계 차트 (Chart.js)
3. **스트레칭 가이드 모달 (`#modal-stretching`)**
   - 1분 스트레칭 카운트다운 타이머 및 단계별 스트레칭 가이드 그림

---

## 8. 데이터 저장 스키마 (LocalStorage Schema)

```json
{
  "posture_settings": {
    "zeroPitch": 12.3,
    "zeroRoll": -1.5,
    "thresholdWarning": 10.0,
    "thresholdAlert": 15.0,
    "soundEnabled": true,
    "vibrationEnabled": true
  },
  "posture_daily_summary": {
    "date": "2026-07-31",
    "totalSeconds": 14400,
    "goodSeconds": 12240,
    "badSeconds": 2160,
    "alertCount": 8,
    "score": 85
  }
}
```

---

## 9. 단계별 개발 로드맵 (Development Roadmap)

- **Phase 1: 하드웨어 & 아두이노 스케치 작성**
  - MPU6050 라이브러리(`Adafruit_MPU6050`) 적용 및 Pitch/Roll 계산 코드 구현
  - 시리얼 통신 출력 및 부저/진동 제어 루틴 검증
- **Phase 2: Web Serial API 연동 & 대시보드 UI**
  - 브라우저 Web Serial연동으로 시리얼 데이터 수신 및 JSON 파싱
  - 영점 설정(Calibration) 및 실시간 각도 렌더링
- **Phase 3: 경고 알림 & 게이미피케이션**
  - 3초 지속 나쁜 자세 모니터링 로직 구현 및 하이브리드 알림 연동
  - 습관 배지 및 1분 스트레칭 타이머 모달 개발
- **Phase 4: 통계 시각화 & 최종 검증**
  - Chart.js 연동 데이터 통계 차트 구현
  - `localStorage` 자동 저장 및 종합 필드 테스트

---

## 10. IoT PM의 초보자를 위한 팁 (Product Manager's Advice)

> 💡 **PM's Note**: 
> 1. MPU6050 센서는 처음 전원을 켤 때 약 1~2초간 가만히 두어야 가속도/자이로 센서 값이 안정화됩니다.
> 2. Web Serial API는 **Chrome, Edge, Opera** 브라우저에서 작동하며, 보안상 반드시 `https://` 환경이거나 `localhost` 환경에서만 연결 팝업이 동작합니다.
> 3. 아두이노 업로드 시 시리얼 포트를 웹브라우저가 점유하고 있으면 업로드 에러가 날 수 있으므로, 보드에 소스코드를 넣을 때는 웹 연결을 잠시 해제하세요!

---

## 11. 기능별 단계적 개발 순서 (Phased Feature Development Order)

단계별로 안정적으로 기능을 구현할 수 있도록 아래의 4단계 흐름으로 개발을 진행하며, 각 단계별 구현 세부 기능 목록은 다음과 같습니다.

### 1단계: 메인 화면 제작 (Main Dashboard UI Creation)
- **대시보드 메인 레이아웃 구축**: 글래스모피즘 테마 및 다크 네이비 반응형 12컬럼 그리드 레이아웃 구현
- **상단 헤더 & 컨트롤바**: 로고, 아두이노 연결 상태 뱃지, 연결/시뮬레이터 토글 버튼 배치
- **실시간 데이터 시각화 위젯 마크업**:
  - 2D 센서 수평계 타깃 (Level Bubble Gauge) 및 Pitch/Roll 각도 배지
  - 2D 자세 시각화 아바타 (Tilting Posture Character)
  - SVG 원형 자세 점수 링 (Posture Score Ring)
- **제어 버튼 & 보조 컴포넌트**: `[🎯 영점 설정]`, `[🔔 테스트 알림]` 버튼 및 실시간 각도 텔레메트리 캔버스 차트 영역 구성

### 2단계: 웹캠 실행 및 MediaPipe 자세 감지 (Webcam Launch & MediaPipe Posture Detection)
- **웹캠 비디오 스트림 획득**: `navigator.mediaDevices.getUserMedia({ video: true })` 기반 사용자 카메라 연동
- **MediaPipe Pose 랜드마크 모델 비동기 로드**: 웹 브라우저 상에서 실시간 신체 33개 포즈 랜드마크 추출
- **상체 핵심 관절 좌표 추적 & 각도 계산**:
  - 귀(Ear) - 어깨(Shoulder) - 골반 수평축 간의 3차원 기울기 계산을 통한 거북목 및 숙임 각도 추정
  - 비디오 화면 위 랜드마크 스켈레톤 라인 real-time 캔버스 오버레이 렌더링
- **폴백(Fallback) 예외 처리**: 웹캠 권한 거부/카메라 부재 시 아두이노 센서 텔레메트리 또는 가상 시뮬레이터 모드로 자동 전환

### 3단계: 자세 분석 및 상태 판정 (Posture Analytics & Status Evaluation)
- **실시간 기준점(영점) 캘리브레이션**: 바른 자세 상태에서 '영점 잡기' 클릭 시 현재 센서/웹캠 각도를 0도로 영점 보정
- **3단계 자세 상태 판정 엔진**:
  - `정상 (Good)`: 오차 범주 ±10° 이내 (초록색 후광 & "바른 자세 유지 중 😊")
  - `주의 (Warning)`: 오차 범주 10°~15° (노란색 후광 & "자세가 조금 기울었습니다 😐")
  - `위험 (Danger)`: 오차 범주 >15° (붉은색 파동 & "경고! 허리와 목을 펴세요 🚨")
- **하이브리드 알림 발동 타이머**: 위험 상태가 3초 이상 지속 시 화면 테두리 붉은색 펄스 애니메이션 + 브라우저 경고음 재생
- **자세 점수 계산 & 데이터 보관**: 총 앉은 시간 대비 바른 자세 비율 기반 100점 만점 점수 계산 및 `localStorage` 자동 영속 저장

### 4단계: 아두이노 연결 및 네오픽셀 / 센서 제어 (Arduino Connection & NeoPixel / Sensor Control)
- **Web Serial API 연동**: Chrome/Edge 브라우저에서 USB 시리얼 포트를 통해 아두이노와 실시간 양방향 데이터 통신 구축
- **센서 수신 데이터 파싱**: 아두이노 MPU6050 6축 자이로 센서의 JSON 패킷(`{"pitch":..., "roll":..., "isBad":...}`) 수신 및 화면 동기화
- **네오픽셀(WS2812B) LED 시각 피드백 제어**:
  - 자세 상태에 따라 아두이노에 연결된 네오픽셀 LED 바 색상 즉시 변경 (`정상: Emerald Green`, `주의: Amber Yellow`, `위험: Rose Red`)
- **하드웨어 하이브리드 피드백 제어**:
  - 위험 상태 3초 지속 시 아두이노로 제어 명령(`"BUZZ\n"`)을 전송하여 피에조 부저 비프음 및 진동 모터 물리 알림 출력

