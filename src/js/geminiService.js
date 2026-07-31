/**
 * geminiService.js
 * 맘별 AI 자기이해 미니리포트 - Google Gemini API 연동 모듈
 */

export const GEMINI_CONFIG = {
  // 환경변수 VITE_GEMINI_API_KEY 또는 localStorage 키에서 동적으로 로드합니다.
  get apiKey() {
    return (
      (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_GEMINI_API_KEY) ||
      localStorage.getItem('GEMINI_API_KEY') ||
      ''
    );
  },
  model: 'gemini-2.5-flash',
  endpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent'
};

/**
 * Gemini API를 호출하여 유저 맞춤형 맘별 AI 스탈라이트 편지 및 심층 조언을 생성합니다.
 * API 호출 실패/쿼터 소진/키 미설정 시 fallback 엔진 결과로 유연하게 전환합니다.
 */
export async function generateGeminiStarlightLetter(profile, userAnswers, fallbackLetter) {
  const currentKey = GEMINI_CONFIG.apiKey;
  if (!currentKey) {
    return fallbackLetter;
  }

  const prompt = `
당신은 40~70세 시니어를 위한 따뜻하고 우아한 AI 자기이해 가이드 '맘별 AI 클레어'입니다.
다음 사용자의 프로필과 진단 답변을 바탕으로 마음을 치유하고 용기를 주는 4줄 내외의 '맘별 AI 스탈라이트 편지'를 작성해 주세요.

[사용자 프로필]
- 이름: ${profile.name || '내담자'}
- 연령대: ${profile.ageGroup || '40~70대'}
- 다짐: ${userAnswers['12']?.text || '나 자신을 온전히 아끼고 사랑하겠습니다.'}

[작성 지침]
1. 존중과 깊은 따뜻함이 느껴지는 어조(~합니다, ~해요)로 작성해 주세요.
2. 지나온 삶의 노고를 인정하고, 앞으로의 제2의 인생에 대한 희망과 자기 사랑을 전해 주세요.
3. 사용자의 다짐 문구를 자연스럽게 언급하여 북극성처럼 삶을 밝혀줄 것이라 축복해 주세요.
4. 편지 끝에는 "- 맘별 AI 자기이해 가이드 클레어 드림 -"을 포함해 주세요.
  `.trim();

  try {
    const response = await fetch(`${GEMINI_CONFIG.endpoint}?key=${currentKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 600
        }
      })
    });

    if (!response.ok) {
      console.warn(`[Gemini API] 응답 상태 ${response.status}: fallback 엔진을 사용합니다.`);
      return fallbackLetter;
    }

    const data = await response.json();
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (generatedText && generatedText.trim().length > 0) {
      return generatedText.trim();
    }
  } catch (err) {
    console.error('[Gemini API] 호출 오류:', err);
  }

  return fallbackLetter;
}
