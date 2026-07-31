/**
 * Mombyeol AI Design Language System (DLS) v1.0
 * Future Assets Plug-in Architecture & Brand Asset Lock System
 */

// 1. Today's Star Card Component (Illustration 40%, Message 40%, Actions 20%)
export function renderTodayStarCard(containerId, data) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const {
    starTitle = '평온의 북극성',
    elementText = '💧 물 (공감과 치유)',
    dailyMessage = '스스로의 어깨를 따뜻하게 안아주세요.',
    todayQuestion = '오늘 내 마음의 온도는 몇 도인가요?',
    todayAction = '따뜻한 차 한 잔 마시며 10분 휴식하기',
    todayReflection = '나 자신에게 수고했다고 토닥여주기',
    todayQuote = '별은 미래를 맞추는 것이 아니라, 나를 이해하는 지도입니다.',
    issueNo = 'ISSUE NO. MB-2026-STAR01'
  } = data || {};

  container.innerHTML = `
    <!-- Plug-in Slot: Today's Star Card Template (DLS v1.0 Compliant) -->
    <div class="plugin-card-slot slot-today-star-card" data-plugin-name="TodayStarCardTemplate">
      <div class="today-star-card-container" style="background: #FFFFFF; border: 2px solid #F6C85F; border-radius: 28px; padding: 44px; color: #455C73; text-align: center; box-shadow: 0 16px 48px rgba(69, 92, 115, 0.08);">
        
        <!-- Illustration First (40% Visual Ratio) -->
        <div class="star-card-header">
          <div style="display: flex; justify-content: center; align-items: center; gap: 16px; margin-bottom: 12px;">
            <img src="/images/popo.png" alt="Popo Companion" style="width: 120px; height: 120px; object-fit: contain; filter: drop-shadow(0 6px 16px rgba(0,0,0,0.1));">
            <img src="/images/lantern.png" alt="Lantern" style="width: 72px; height: 72px; object-fit: contain;">
          </div>
          <span class="popo-badge" style="background: #FFF8E7; color: #B87A30; border: 1px solid rgba(246, 200, 95, 0.4); padding: 8px 20px; border-radius: 20px; font-weight: 800; font-size: 0.95rem;">⭐ 오늘을 비추는 별 카드</span>
          <h2 class="star-card-title" style="color: #455C73; font-size: 2.1rem; font-weight: 900; margin-top: 12px;">${starTitle}</h2>
        </div>

        <!-- Message (40% Ratio) -->
        <div class="star-card-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 28px 0; text-align: left;">
          <div class="star-card-item" style="background: #FFF9F2; border: 1px solid rgba(69,92,115,0.1); border-radius: 18px; padding: 20px;">
            <label style="font-size: 0.85rem; color: #6B7C93; font-weight: 700; display: block; margin-bottom: 6px;">🔮 대표 원소 (Element)</label>
            <p style="font-size: 1.1rem; font-weight: 700; color: #455C73;">${elementText}</p>
          </div>
          <div class="star-card-item" style="background: #FFF9F2; border: 1px solid rgba(69,92,115,0.1); border-radius: 18px; padding: 20px;">
            <label style="font-size: 0.85rem; color: #6B7C93; font-weight: 700; display: block; margin-bottom: 6px;">💌 마음 날씨 메시지</label>
            <p style="font-size: 1.1rem; font-weight: 700; color: #455C73;">${dailyMessage}</p>
          </div>
          <div class="star-card-item" style="background: #FFF9F2; border: 1px solid rgba(69,92,115,0.1); border-radius: 18px; padding: 20px;">
            <label style="font-size: 0.85rem; color: #6B7C93; font-weight: 700; display: block; margin-bottom: 6px;">❓ 오늘의 성찰 질문</label>
            <p style="font-size: 1.1rem; font-weight: 700; color: #455C73;">${todayQuestion}</p>
          </div>
          <div class="star-card-item" style="background: #FFF9F2; border: 1px solid rgba(69,92,115,0.1); border-radius: 18px; padding: 20px;">
            <label style="font-size: 0.85rem; color: #6B7C93; font-weight: 700; display: block; margin-bottom: 6px;">🚀 오늘 바로 실천하기</label>
            <p style="font-size: 1.1rem; font-weight: 700; color: #455C73;">${todayAction}</p>
          </div>
        </div>

        <div class="star-card-quote" style="font-style: italic; font-size: 1.2rem; color: #455C73; background: #FFF8E7; border-left: 5px solid #F6C85F; padding: 22px; border-radius: 16px; margin: 24px 0;">
          "${todayQuote}"
        </div>

        <!-- Actions (20% Ratio) -->
        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px dashed rgba(69,92,115,0.15); padding-top: 20px; margin-top: 24px; flex-wrap: wrap; gap: 12px;">
          <span style="font-size: 0.85rem; color: #6B7C93;">발급: ${issueNo}</span>
          <div style="display: flex; gap: 10px;">
            <button class="btn-secondary" style="padding: 10px 20px; font-size: 0.95rem;" onclick="alert('별빛 카드가 이미지로 저장되었습니다.')">💾 카드 저장</button>
            <button class="btn-mint" style="padding: 10px 20px; font-size: 0.95rem;" onclick="alert('공유 링크가 카카오톡으로 전달되었습니다.')">🔗 카카오 공유</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

// 2. Star Letter Key Visual Component
export function renderStarLetterKeyVisual(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <!-- Plug-in Slot: Star Letter Key Visual (DLS v1.0 Compliant) -->
    <div class="plugin-card-slot slot-star-letter-visual" data-plugin-name="StarLetterKeyVisual" style="text-align: center; margin: 24px 0;">
      <div style="background: linear-gradient(135deg, #FFF9F2 0%, #EBF7F1 100%); border: 2px solid #9FE2BF; border-radius: 24px; padding: 32px; display: inline-flex; align-items: center; gap: 24px; box-shadow: 0 10px 28px rgba(159, 226, 191, 0.25);">
        <img src="/images/claire.png" alt="AI Claire Portrait" class="img-char-avatar-claire" style="width: 130px; height: 130px;">
        <div style="text-align: left;">
          <span style="font-weight: 800; color: #3B9C87; font-size: 0.9rem; letter-spacing: 1.5px;">⭐ 맘별 AI STAR LETTER KEY VISUAL</span>
          <h4 style="font-size: 1.3rem; color: #455C73; margin-top: 6px; font-weight: 900;">AI 클레어가 전하는 영혼의 친필 별빛 편지</h4>
          <p style="font-size: 0.95rem; color: #6B7C93; margin-top: 4px;">지친 마음의 온도를 높여주는 세상에 단 하나뿐인 지혜의 가이드</p>
        </div>
      </div>
    </div>
  `;
}

// 3. Reserved Plug-in Slot Component Renderer for all 21 DLS Future Assets
export function renderReservedPlugInSlot(containerId, assetName, titleText) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="plugin-card-slot slot-reserved-asset" data-plugin-name="${assetName}" style="margin: 20px 0;">
      <div style="background: #FFFFFF; border: 2px dashed #9FE2BF; border-radius: 20px; padding: 24px; text-align: center; color: #455C73;">
        <span style="font-weight: 800; color: #3B9C87; font-size: 0.85rem; letter-spacing: 1px;">🔒 LOCKED BRAND ASSET SLOT</span>
        <h4 style="font-size: 1.15rem; font-weight: 800; margin-top: 4px;">⭐ ${titleText || assetName}</h4>
        <p style="font-size: 0.9rem; color: #6B7C93; margin-top: 4px;">DLS v1.0 규격에 맞춰 에셋이 자동 연결되는 플러그인 슬롯입니다.</p>
      </div>
    </div>
  `;
}
