# [Design System] 아두이노 기반 IoT 바른 자세 코치 UI/UX 디자인 가이드

---

## 1. 디자인 컨셉 및 철학 (Design Concept & Philosophy)

- **핵심 컨셉**: **Futuristic Cyber-Wellness (미래지향적 사이버 웰니스 & 글래스모피즘)**
- **목표**:
  1. **고도화된 시각적 몰입감**: 다크 네이비 테마와 네온 액센트 컬러를 결합하여 전문적인 대시보드 느낌을 줍니다.
  2. **직관적인 실시간 데이터 피드백**: 아두이노 센서(MPU6050)의 Pitch/Roll 각도와 자세 상태를 0.1초 단위로 눈으로 확인할 수 있는 동적 위젯 체계 구축.
  3. **인지적 부담 최소화**: 사용자가 업무나 학습 중 화면을 잠깐 보더라도 현재 상태(좋음/주의/위험)를 색상 및 모션만으로 명확히 인지할 수 있도록 설계.

---

## 2. 컬러 시스템 (Color Palette & Tokens)

### 2.1 메인 테마 & 서페이스 (Background & Surface)
| 토큰명 | CSS 변수명 | Hex 코드 | 사용 용도 |
| :--- | :--- | :--- | :--- |
| **App Background** | `--bg-app` | `#0F172A` | 대시보드 메인 다크 네이비 배경 |
| **Surface Card** | `--bg-card` | `rgba(30, 41, 59, 0.7)` | 반투명 글래스모피즘 카드 배경 |
| **Surface Card Hover**| `--bg-card-hover` | `rgba(51, 65, 85, 0.8)` | 호버 시 서페이스 카드 |
| **Glass Border** | `--border-glass` | `rgba(255, 255, 255, 0.1)` | 카드 및 모달 은은한 테두리 |

### 2.2 자세 상태 시맨틱 컬러 (Posture Status Colors)
| 상태 | 토큰명 | Hex 코드 | 네온 글라우(Glow) 효과 | 사용 용도 |
| :--- | :--- | :--- | :--- | :--- |
| **Good (정상)** | `--status-good` | `#10B981` (Emerald) | `0 0 16px rgba(16, 185, 129, 0.4)` | 각도 ±10° 이내, 바른 자세 유지 중 |
| **Warning (주의)**| `--status-warn` | `#F59E0B` (Amber) | `0 0 16px rgba(245, 158, 11, 0.4)` | 각도 10°~15°, 약간 구부정함 |
| **Danger (위험)** | `--status-danger`| `#EF4444` (Rose) | `0 0 20px rgba(239, 68, 68, 0.6)` | 각도 >15° 3초 이상 지속, 경고 발동 |

### 2.3 브랜드 & 데이터 액센트 (Brand & Accents)
- **Primary Accent**: Cyan Blue (`#06B6D4`) - 시리얼 연결, 버튼, 하이라이트
- **Secondary Accent**: Electric Indigo (`#6366F1`) - 차트 및 타이머
- **Text Main**: Pure White (`#F8FAFC`)
- **Text Muted**: Cool Gray (`#94A3B8`)

---

## 3. 타이포그래피 (Typography System)

- **기본 폰트 (UI Text)**: `Pretendard`, `-apple-system`, `BlinkMacSystemFont`, `sans-serif`
- **수치 & 게이지 폰트 (Numbers & Telemetry)**: `Outfit`, `Roboto Mono`, `monospace` (높은 가독성과 테크니컬한 감성 제공)

### 3.1 폰트 스케일 (Font Scale)
```css
--font-display: 2.75rem (44px) / 700 / line-height 1.1  /* 수치 각도 표시 (Pitch/Roll) */
--font-h1:      2.00rem (32px) / 700 / line-height 1.2  /* 대시보드 메인 타이틀 */
--font-h2:      1.50rem (24px) / 600 / line-height 1.3  /* 카드 헤더 및 서브 섹션 */
--font-h3:      1.25rem (20px) / 600 / line-height 1.4  /* 모달 타이틀 및 위젯 제목 */
--font-body:    1.00rem (16px) / 400 / line-height 1.5  /* 본문 및 안내 문구 */
--font-caption: 0.875rem (14px) / 500 / line-height 1.4 /* 라벨, 뱃지, 캡션 */
```

---

## 4. 레이아웃 아키텍처 (Layout Architecture)

```text
+-----------------------------------------------------------------------------------+
|  [Header] 🌐 IoT Posture Coach | 🔌 Serial Status [Connected: COM3] | ⚙️ Settings   |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  +---------------------------------------+  +----------------------------------+  |
|  |  [Live Posture Avatar & Sensor View]  |  |  [Status Summary & Control Card] |  |
|  |  - 3D/2D Body Telemetry Model         |  |  - Posture Score: 92/100 (GOOD)  |  |
|  |  - Pitch: +4.2° | Roll: -1.1°         |  |  - [🎯 영점 설정 (Calibration)]  |  |
|  |  - Sensor Level Radar Component       |  |  - [🔔 테스트 경고음]            |  |
|  +---------------------------------------+  +----------------------------------+  |
|                                                                                   |
|  +---------------------------------------+  +----------------------------------+  |
|  |  [Real-time Posture Angle Chart]      |  |  [Badges & Daily Goal Progress]  |  |
|  |  - Chart.js Telemetry Waveform        |  |  - 🏆 30분 연속 바른 자세        |  |
|  |  - Live Pitch/Roll Stream             |  |  - 🧘 1분 스트레칭 타이머        |  |
|  +---------------------------------------+  +----------------------------------+  |
|                                                                                   |
+-----------------------------------------------------------------------------------+
```

---

## 5. 아두이노 센서 & 실시간 자세 감지 화면 디자인

### 5.1 센서 각도 게이지 (Angle Telemetry Widget)
- **원형 수평계 (Circular Level Bubble)**:
  - 센서의 Pitch/Roll 각도 데이터를 2D 타깃 내의 이동하는 에메랄드/레드 버블로 시각화.
  - 타깃 중앙(0,0)에 가까울수록 안전, 외곽으로 나갈수록 경고/위험.
- **수치 카운터 컴포넌트**:
  - `Pitch` (목/허리 숙임) 및 `Roll` (어깨 좌우 기울어짐) 데이터를 `Outfit` 폰트로 대형 표기.
  - 변화 발생 시 부드러운 트랜지션 애니메이션 적용 (`transition: transform 0.2s ease-out`).

### 5.2 자세 상태 시각화 아바타 (Posture Avatar View)
- 실시간으로 센서 각도에 맞춰 상체 도형(또는 SVG 아바타)이 실제로 기울어지는 반응형 인터랙션 제공.
- 정상 자세일 때 은은한 초록색 외곽선 후광(Glow), 경고 상태 시 붉은색 파동 펄스 링 발생.

---

## 6. 자세 상태 표시 컴포넌트 (Status Components)

### 6.1 자세 상태 배지 (Status Badge)
```css
/* Good Badge */
.status-badge.good {
  background: rgba(16, 185, 129, 0.15);
  color: #10B981;
  border: 1px solid rgba(16, 185, 129, 0.3);
  box-shadow: 0 0 12px rgba(16, 185, 129, 0.25);
}

/* Alert Badge */
.status-badge.danger {
  background: rgba(239, 68, 68, 0.2);
  color: #EF4444;
  border: 1px solid rgba(239, 68, 68, 0.4);
  animation: badgePulse 1.2s infinite ease-in-out;
}
```

### 6.2 프로그레스 링 & 자세 점수 (Score Ring)
- SVG Circle Dashoffset 기술을 활용한 0~100점 점수 링 시각화.
- 90점 이상(초록), 70~89점(노랑), 70점 미만(빨강) 자동 그라데이션 적용.

---

## 7. 애니메이션 및 마이크로 인터랙션 (Animations & Interactions)

### 7.1 경고 발동 화면 테두리 펄스 (Danger Screen Pulse)
나쁜 자세가 3초 이상 지속될 때 전체 화면 테두리에 붉은색 알림 파동이 울립니다.
```css
@keyframes alertBorderPulse {
  0% { box-shadow: inset 0 0 0px 0px rgba(239, 68, 68, 0); }
  50% { box-shadow: inset 0 0 35px 8px rgba(239, 68, 68, 0.8); }
  100% { box-shadow: inset 0 0 0px 0px rgba(239, 68, 68, 0); }
}
```

### 7.2 버튼 호버 & 클릭 효과 (Interactive Controls)
- `transform: translateY(-2px) scale(1.02)` 적용.
- 클릭 시 네온 라이트 라인 확산 효과.

---

## 8. 모듈화 컴포넌트 목록 (Reusable Component Catalog)

1. **`HeaderNav.js`**: 상단 헤더, 로고, Web Serial 아두이노 연결 상태 버튼, 테마/설정
2. **`PostureTelemetryCard.js`**: 센서 2D 레벨 버블, Pitch/Roll 실시간 각도 표시기
3. **`PostureAvatarView.js`**: 센서 각도와 연동되는 상체 캐릭터/아바타 시각화
4. **`PostureScoreCard.js`**: 실시간 자세 점수 원형 게이지, 영점 설정(Calibration) 버튼
5. **`PostureChartCard.js`**: Chart.js 기반 실시간 시리얼 각도 웨이브폼 차트
6. **`BadgeGoalCard.js`**: 습관 형성 배지 목록 및 1분 스트레칭 타이머 모달 트리거
7. **`StretchingModal.js`**: 1분 거북목/어깨 스트레칭 가이드 모달 인터페이스
