# [PRD] 맘별 AI 자기이해 미니리포트 (Mombyeol AI Senior Self-Insight Report)

---

## 1. 프로젝트 개요 (Project Overview)

- **프로젝트명**: 맘별 AI 자기이해 미니리포트 (Mombyeol AI Senior Self-Insight Report)
- **서비스 컨셉**: 40~70세 시니어 및 액티브 시니어를 위한 따뜻하고 우아한 AI 자기이해 & 심리 치유 리포트 웹 애플리케이션
- **타겟 사용자**: 
  - 자녀 양육 후 삶의 2막을 준비하며 내면의 성찰과 자기이해가 필요한 40~70대 시니어
  - 감정적 번아웃을 경험하고 따뜻한 위로와 긍정 확신(Affirmation)이 필요한 분
- **핵심 가치 제안 (Value Proposition)**:
  - 복잡한 회원가입이나 앱 설치 없이 브라우저에서 12개 질문에 답하면, **Google Gemini AI**가 나만의 4원소(불·물·바람·대지) 성향을 분석하고 찬란한 'AI 스탈라이트 편지'와 A4 15페이지 PDF 완전판 리포트를 선물합니다.

---

## 2. 해결하고자 하는 문제 & 솔루션 (Problem & Solution)

| 기존 시장의 문제점 (Problem) | 맘별 AI의 솔루션 (Solution) |
| :--- | :--- |
| **1. 텍스트가 작고 복잡한 디지털 서비스** | **시니어 친화적 UI/UX**: 차분한 라이트 크림/네이비 색상 및 **3단계 실시간 글자 크기 확대 시스템** (보통, 크게, 더크게) 제공 |
| **2. 단편적이고 상업적인 운세/심리 테스트** | **4원소 에너지 심층 진단**: 불, 물, 바람, 대지 4원소 밸런스 측정 및 **3대 핵심 강점 & 감정 날씨 분석** |
| **3. 차갑고 기계적인 AI 답변** | **Google Gemini AI 감성 스탈라이트 편지**: 사용자의 다짐과 삶의 경험을 존중하는 감성 맞춤형 AI 편지 자동 생성 |
| **4. 저장 및 소장이 어려운 웹 화면** | **15페이지 A4 PDF 자동 생성기**: 수료증, 4원소 차트, 실천 가이드가 담긴 소장용 PDF 리포트 제공 |

---

## 3. 핵심 기능 세부 요구사항 (Core Feature Specifications)

### 3.1 시니어 친화적 진단 인터페이스 (UX & Accessibility)
- **12가지 심층 문항**: 현재 감정 상태, 관계 소통 태도, 에너지 잔여량 게이지, 삶의 다짐 문항 구성
- **접근성 컨트롤바**: 상단 헤더에 글자 크기 조절 버튼 (`보통` / `크게` / `더크게 +55%`) 상시 배치

### 3.2 4원소 AI 진단 및 성향 분석 엔진 (AI & Analytics Engine)
- **4원소 밸런스 계산**: 답변 데이터에 따른 불(Fire), 물(Water), 바람(Air), 대지(Earth) 점수 및 백분율 자동 산출
- **별자리 페르소나 결정**: 주 원소 및 부 원소 조합에 따른 4가지 유형 타이틀 부여
  - *예: 타오르는 열정의 불꽃 별, 깊은 맑음의 바다 별, 지혜로운 청량 바람 별, 단단한 대지의 바위 별*

### 3.3 Google Gemini AI 스탈라이트 편지 생성 (Gemini API Integration)
- **연동 모델**: `Google Gemini 2.5 Flash` (`generativelanguage.googleapis.com`)
- **생성 로직**: 사용자의 이름, 연령대, 4원소 주원소, 삶의 다짐 문구를 분석하여 감동적인 4줄 내외의 개인화 편지 생성
- **Fail-Safe 이중화 (Fallback System)**: API 쿼터 소진/네트워크 단절 시에도 룰베이스 엔진으로 자동 전환되어 리포트가 중단 없이 완성됨

### 3.4 15페이지 A4 PDF 완전판 리포트 (PDF Export Engine)
- **출력 구성**:
  1. 표지 & 별자리 수호 배지
  2. 4원소 밸런스 레이더 차트
  3. 오늘의 감정 날씨 & 에너지 충전 게이지
  4. 내면의 3대 핵심 강점 분석
  5. 관계 소통 패턴 및 I-Message 솔루션
  6. 오늘 시작하는 3가지 실천 제안
  7. Gemini AI 스탈라이트 편지 & 자기이해 수료증
- **기술 구현**: `html2canvas` 캔버스 렌더링 + `jsPDF` 페이지 분할 생성

---

## 4. 시스템 아키텍처 & 기술 스택 (Technical Architecture)

- **Frontend**: HTML5, Vanilla CSS3 (Custom Design System), Modern Modern JavaScript (ES Modules)
- **Build & Dev Tool**: Vite
- **AI Core**: Google Gemini API (`gemini-2.5-flash`)
- **Libraries**: `jsPDF` (PDF 생성), `html2canvas` (DOM 캡처), `Chart.js` (데이터 시각화)
- **Hosting & Infra**: Vercel Cloud Platform (`VITE_GEMINI_API_KEY` 환경변수 배포)

---

## 5. PPT 발표 슬라이드 구성안 (Recommended 10-Slide Outline)

| 슬라이드 번호 | 슬라이드 제목 | 주요 발표 내용 & 핵심 키워드 |
| :--- | :--- | :--- |
| **Slide 1** | **표지** | 맘별 AI 자기이해 미니리포트 - 4070 시니어를 위한 AI 심리 치유 서비스 |
| **Slide 2** | **기획 배경 & 타겟** | 시니어 디지털 소외 해결 & 100세 시대 제2의 인생 성찰 필요성 |
| **Slide 3** | **기존 서비스 문제점** | 복잡한 UI, 작고 보기 힘든 글씨, 차갑고 기계적인 무료 운세 서비스의 한계 |
| **Slide 4** | **핵심 솔루션 (Value)** | 시니어 친화적 글자 확대 UI + 4원소 진단 + Google Gemini AI 감성 편지 |
| **Slide 5** | **주요 기능 ①: 진단 UX** | 12가지 심층 인터랙티브 질문 & 3단계 글자 크기 확대 시스템 |
| **Slide 6** | **주요 기능 ②: 4원소 분석** | 불/물/바람/대지 성향 분석 & 별자리 페르소나 및 3대 핵심 강점 |
| **Slide 7** | **주요 기능 ③: AI 편지** | Google Gemini 2.5 Flash 연동실시간 개인화 'AI 스탈라이트 편지' |
| **Slide 8** | **주요 기능 ④: PDF 리포트**| 소장 가능한 A4 15페이지 고화질 자기이해 수료증 및 리포트 다운로드 |
| **Slide 9** | **시스템 구조 & 기술 스택** | Vanilla JS, Vite, Google Gemini API, jsPDF, Vercel 클라우드 배포 |
| **Slide 10** | **기대 효과 & 비전** | 시니어 삶의 질 향상, 따뜻한 인공지능(Humanoid AI) 웰니스 플랫폼 발전 방향 |

---

## 6. 배포 현황 (Deployment Status)

- **운영 URL**: [`https://ai-umber-ten-34.vercel.app/`](https://ai-umber-ten-34.vercel.app/)
- **소스코드 저장소**: [`https://github.com/Claireshin69/-AI-.git`](https://github.com/Claireshin69/-AI-.git)
