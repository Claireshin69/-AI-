/**
 * 맘별AI 자기이해 미니리포트 - AI 심층 분석 및 문구 합성 엔진
 */
import { generateGeminiStarlightLetter } from './geminiService.js';

export function analyzeAnswers(profile, userAnswers) {
  // 1. 기본 4원소 에너지 점수 계산
  const elementScores = { fire: 10, water: 10, air: 10, earth: 10 };
  let totalEnergyMeter = profile.energyMeter || 50;

  // 태그 및 선택 모음
  const selectedTags = {
    emotions: [],
    concerns: [],
    strengths: [],
    relations: [],
    styles: []
  };

  // 답변 데이터 파싱 및 점수 합산
  Object.keys(userAnswers).forEach((qIdStr) => {
    const answer = userAnswers[qIdStr];
    if (!answer) return;

    // 슬라이더 (질문 3: 에너지 잔여량)
    if (qIdStr === '3' && typeof answer.scaleValue === 'number') {
      totalEnergyMeter = answer.scaleValue;
    }

    // 선택지 점수 가산
    if (answer.score) {
      Object.keys(answer.score).forEach((el) => {
        if (elementScores[el] !== undefined) {
          elementScores[el] += answer.score[el];
        }
      });
    }

    if (answer.emotionTag) selectedTags.emotions.push(answer.emotionTag);
    if (answer.concernTag) selectedTags.concerns.push(answer.concernTag);
    if (answer.strengthTag) selectedTags.strengths.push(answer.strengthTag);
    if (answer.relationTag) selectedTags.relations.push(answer.relationTag);
    if (answer.styleTag) selectedTags.styles.push(answer.styleTag);
  });

  // 백분율 계산
  const totalScoreSum = elementScores.fire + elementScores.water + elementScores.air + elementScores.earth;
  const elementPercentages = {
    fire: Math.round((elementScores.fire / totalScoreSum) * 100),
    water: Math.round((elementScores.water / totalScoreSum) * 100),
    air: Math.round((elementScores.air / totalScoreSum) * 100),
    earth: Math.round((elementScores.earth / totalScoreSum) * 100)
  };

  // 주 원소 & 부 원소 판별
  const sortedElements = Object.keys(elementPercentages).sort(
    (a, b) => elementPercentages[b] - elementPercentages[a]
  );
  const primaryElement = sortedElements[0];
  const secondaryElement = sortedElements[1];

  // 별자리 페르소나 타이틀 결정
  const personaTitles = {
    fire: { title: '타오르는 열정의 별', keyword: '추진력과 용기', desc: '새로운 가능성을 밝히는 따뜻한 불빛처럼 주변에 희망을 줍니다.' },
    water: { title: '깊은 맑음의 바다 별', keyword: '공감과 치유', desc: '상대방의 마음을 살포시 품어주는 잔잔한 호수 같은 정성을 가졌습니다.' },
    air: { title: '지혜로운 청량 바람 별', keyword: '통찰과 소통', desc: '복잡한 상황 속에서도 맑은 이성과 따스한 언어로 대화를 풉니다.' },
    earth: { title: '단단한 대지의 바위 별', keyword: '안정과 인내', desc: '풍파 속에서도 한결같은 든든함으로 가정과 주변의 기둥이 되어줍니다.' }
  };

  const primaryInfo = personaTitles[primaryElement];
  const secondaryInfo = personaTitles[secondaryElement];

  const fullPersonaName = `${primaryInfo.keyword}의 [${primaryInfo.title}]`;

  // 3대 핵심 강점 정의
  const coreStrengths = [
    {
      title: selectedTags.strengths[0] || primaryInfo.keyword,
      desc: `${profile.name}님의 내면에 새겨진 가장 커다란 빛입니다. 어떠한 순간에도 스스로와 주변을 지켜내는 핵심 자산입니다.`,
      icon: 'star'
    },
    {
      title: selectedTags.strengths[1] || '유연한 적응과 배움',
      desc: '살아온 시간 동안 겪은 수많은經驗과 지혜가 나를 수호하는 든든한 방패가 되어줍니다.',
      icon: 'shield-check'
    },
    {
      title: selectedTags.strengths[2] || secondaryInfo.keyword,
      desc: `부원소인 ${secondaryInfo.keyword}의 에너지가 조화를 이루어, 깊이감 있는 삶을 완성합니다.`,
      icon: 'sparkles'
    }
  ];

  // 감정 날씨 요약
  let weatherText = '맑고 조화로운 햇살';
  let weatherAdvice = '마음 에너지가 안정적입니다. 나 자신에게 푹 쉬는 포상을 선물해보세요.';
  if (totalEnergyMeter < 40) {
    weatherText = '구름 많고 촉촉한 가을비';
    weatherAdvice = '그동안 너무 남을 위해 사느라 지쳤을 수 있습니다. 아무것도 하지 않아도 괜찮은 하루를 허락하세요.';
  } else if (totalEnergyMeter > 75) {
    weatherText = '화창하고 생기 넘치는 봄날';
    weatherAdvice = '충분한 에너지로 새로운 꿈이나 취미를 도전하기에 아주 좋은 시기입니다.';
  }

  // 관계 소통 가이드
  const relationStyle = selectedTags.styles[0] || '배려형 소통';
  const relationAdvice = `
    ${profile.name}님은 기본적으로 '${relationStyle}'의 아름다운 태도를 갖고 계십니다. 
    다만, 내 마음을 너무 참거나 상대에게 미안해하지 않고, 
    "나의 마음은 이러해"라고 솔직하게 '나-전달법(I-Message)'으로 표현하실 때 더욱 행복해집니다.
  `;

  // 실행 제안 3가지
  const actionItems = [
    { num: 1, title: '나를 위한 15분 차(茶) 명상', desc: '매일 아침 따뜻한 차 한 잔을 마시며 휴대폰을 내려놓고 내 마음에 "오늘 기분 어때?"라고 물어봐주세요.' },
    { num: 2, title: '감정 표현 노트 3줄 쓰기', desc: '오늘 고마웠던 일 1가지, 서운했던 일 1가지, 나 자신에게 칭찬 1가지를 적어보세요.' },
    { num: 3, title: '가장 편안한 1명과의 깊은 대화', desc: '조언이나 솔루션 없이 그저 서로 마음을 털어놓는 솔직한 20분의 시간을 가져보세요.' }
  ];

  // 따뜻한 AI 스탈라이트 편지 작성
  const customPledge = userAnswers['12']?.text || '나 자신을 온전히 아끼고 사랑하겠습니다.';
  const aiLetterText = `
사랑하는 ${profile.name}님께,

우주의 수많은 별들 중에서도 ${profile.name}님의 삶이라는 별은 참으로 묵묵하고 아름답게 빛나왔습니다.
${profile.ageGroup || '40~70대'}의 수많은 계절을 건너오며, 때로는 강한 바람에 흔들리기도 하고 때로는 홀로 눈물을 훔치기도 하셨겠지요.

그러나 오늘 확인한 ${profile.name}님의 별자리 지도는 증명하고 있습니다.
${profile.name}님의 안에는 '${primaryInfo.keyword}'라는 위대한 선물과, '${secondaryInfo.keyword}'라는 따뜻한 품이 깊게 자리 잡고 있음을요.

별은 미래를 억지로 맞추는 것이 아니라, 
내가 어디에 서 있는지, 내 마음이 어디를 향하는지 일깨워주는 지도입니다.

${profile.name}님이 다짐하신 말, 
"${customPledge}" 
이 한 줄이 앞으로의 날들에서 가장 찬란한 북극성이 되어줄 것입니다.

언제나 마음의 별자리가 어두워질 때 맘별 AI의 이 리포트를 펼쳐보세요.
${profile.name}님의 제2의 인생 여정을 진심으로 응원합니다.

- 맘별 AI 자기이해 가이드 드림 -
  `.trim();

  return {
    profile,
    elementScores,
    elementPercentages,
    primaryElement,
    secondaryElement,
    fullPersonaName,
    primaryInfo,
    secondaryInfo,
    totalEnergyMeter,
    weatherText,
    weatherAdvice,
    coreStrengths,
    relationStyle,
    relationAdvice,
    actionItems,
    customPledge,
    aiLetterText,
    generatedAt: new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })
  };
}

/**
 * Gemini API를 활용한 비동기 분석 및 편지 합성 함수
 */
export async function analyzeAnswersAsync(profile, userAnswers) {
  const result = analyzeAnswers(profile, userAnswers);
  const geminiLetter = await generateGeminiStarlightLetter(profile, userAnswers, result.aiLetterText);
  result.aiLetterText = geminiLetter;
  return result;
}

