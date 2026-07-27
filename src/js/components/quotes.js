// Fortune Quotes DB & Generator Component

export const QUOTE_CATEGORIES = [
  { id: 'all', label: '✨ 전체 (All)', icon: '🔮' },
  { id: 'wisdom', label: '🌿 인생 & 지혜 (Wisdom)', icon: '📜' },
  { id: 'success', label: '🚀 성공 & 재물 (Success)', icon: '💎' },
  { id: 'love', label: '💖 사랑 & 인연 (Love)', icon: '💌' },
  { id: 'funny', label: '😂 유머 & 재치 (Humor)', icon: '⚡' },
  { id: 'future', label: '🌌 미래 & 직관 (Future)', icon: '🪐' }
];

export const QUOTES_DB = [
  // Wisdom
  {
    id: 1,
    category: 'wisdom',
    text: "오늘 가장 늦었다고 생각할 때가 당신이 도약할 가장 완벽한 순간입니다.",
    author: "오늘의 포춘 쿠키",
    english: "The moment you think it's too late is the perfect time to leap."
  },
  {
    id: 2,
    category: 'wisdom',
    text: "작은 물결이 모여 거대한 파도를 이루듯, 오늘의 작은 노력이 내일의 기적을 만듭니다.",
    author: "지혜의 포춘",
    english: "Small ripples gather to make great waves; small efforts today create tomorrow's miracle."
  },
  {
    id: 3,
    category: 'wisdom',
    text: "바람이 불지 않을 때 노를 저어라. 기회는 준비된 자의 손을 잡는다.",
    author: "윈스턴 처칠 (바탕)",
    english: "Row the boat when there is no wind. Opportunity takes the hand of the prepared."
  },
  {
    id: 4,
    category: 'wisdom',
    text: "당신이 걸어가는 모든 길에 당신만의 따스한 빛이 함께할 것입니다.",
    author: "빛의 포춘",
    english: "Warm light of your own will accompany every path you walk."
  },
  {
    id: 5,
    category: 'wisdom',
    text: "마음의 평정심을 유지하면 엉킨 문제들도 스스로 풀어지기 시작합니다.",
    author: "명상의 포춘",
    english: "Keep peace of mind, and tangled problems will begin to solve themselves."
  },

  // Success
  {
    id: 6,
    category: 'success',
    text: "곧 상상하지도 못했던 뜻밖의 재물과 성공의 기회가 찾아옵니다!",
    author: "행운의 신",
    english: "An unexpected opportunity for wealth and success is coming your way very soon!"
  },
  {
    id: 7,
    category: 'success',
    text: "당신이 지난달 씨앗을 심은 노력이 이번 주 결실을 맺을 것입니다.",
    author: "결실의 포춘",
    english: "The efforts you planted past days will bear fruit this week."
  },
  {
    id: 8,
    category: 'success',
    text: "실패는 성공으로 가는 길의 이정표일 뿐, 당신의 목적지는 대승리입니다.",
    author: "성공학 법칙",
    english: "Failure is just a signpost on the road to success; your destination is a great victory."
  },
  {
    id: 9,
    category: 'success',
    text: "오늘 중요한 결정을 내리면 긍정적인 반전이 일어납니다. 자신을 믿으세요!",
    author: "용기의 포춘",
    english: "Making an important decision today will lead to a positive twist. Trust yourself!"
  },
  {
    id: 10,
    category: 'success',
    text: "망설이지 말고 추진하세요. 지금이 당신의 골든 타임입니다.",
    author: "황금 포춘",
    english: "Do not hesitate, move forward. Right now is your golden time."
  },

  // Love
  {
    id: 11,
    category: 'love',
    text: "당신의 따뜻한 미소가 누군가의 하루에 온기를 불어넣고 있습니다.",
    author: "사랑의 포춘",
    english: "Your warm smile is breathing warmth into someone's day."
  },
  {
    id: 12,
    category: 'love',
    text: "가장 가까운 곳에 당신을 진심으로 응원하고 아끼는 우연한 인연이 기다립니다.",
    author: "인연의 큐피드",
    english: "In the closest place, a serendipitous connection waiting to cherish you is near."
  },
  {
    id: 13,
    category: 'love',
    text: "스스로를 솔직하게 사랑할 때, 온 세상이 당신을 사랑하게 될 것입니다.",
    author: "자애의 포춘",
    english: "When you genuinely love yourself, the whole world will love you too."
  },
  {
    id: 14,
    category: 'love',
    text: "달콤한 대화 한 마디가 묵묵히 품어왔던 오해를 눈 녹듯 사라지게 만듭니다.",
    author: "화해의 포춘",
    english: "A single sweet word will melt away long-held misunderstandings."
  },

  // Funny
  {
    id: 15,
    category: 'funny',
    text: "오늘의 칼로리는 0kcal! 맛있게 먹으면 다 행복이 됩니다.",
    author: "미식가 포춘",
    english: "Today's calories count as 0! Eating joyfully makes everything happiness."
  },
  {
    id: 16,
    category: 'funny',
    text: "복권보다는 소소한 디저트 한 조각에 더 큰 행복이 숨어있을지도 몰라요.",
    author: "달콤한 포춘",
    english: "A small slice of dessert might hold bigger happiness than a lottery ticket."
  },
  {
    id: 17,
    category: 'funny',
    text: "오늘 야식을 먹는 것에 죄책감을 갖지 마세요. 쿠키가 허락했습니다!",
    author: "포춘쿠키의 승인",
    english: "Don't feel guilty about late night snacks today. The fortune cookie approved it!"
  },
  {
    id: 18,
    category: 'funny',
    text: "버그는 코딩의 일부일 뿐, 퇴근 시간이 오면 저절로 풀리는 마법이 생길 수도?",
    author: "개발자 포춘",
    english: "Bugs are just part of coding. Maybe magic happens right at clock-out time?"
  },

  // Future
  {
    id: 19,
    category: 'future',
    text: "가장 거대한 유성이 당신의 밤하늘을 지나며 세 가지 소원을 이루어 줍니다.",
    author: "우주 직관 포춘",
    english: "A shooting star crosses your night sky, granting three of your wishes."
  },
  {
    id: 20,
    category: 'future',
    text: "곧 완전히 새로운 문이 열립니다. 주저 말고 그 문을 열고 들어가세요.",
    author: "차원의 포춘",
    english: "A brand new door will open soon. Do not hesitate to step inside."
  },
  {
    id: 21,
    category: 'future',
    text: "당신이 꿈꾸는 미래의 모습은 이미 현실이 될 준비를 마쳤습니다.",
    author: "미래의 나",
    english: "The future version of you is already prepared to become reality."
  }
];

const LUCKY_COLORS = [
  { name: "엠버 골드 (Amber Gold)", hex: "#F59E0B" },
  { name: "에메랄드 그린 (Emerald Green)", hex: "#10B981" },
  { name: "사파이어 블루 (Sapphire Blue)", hex: "#3B82F6" },
  { name: "코랄 핑크 (Coral Pink)", hex: "#EC4899" },
  { name: "바이올렛 퍼플 (Violet Purple)", hex: "#8B5CF6" },
  { name: "크림슨 레드 (Crimson Red)", hex: "#EF4444" }
];

export function getRandomQuote(category = 'all') {
  let filtered = QUOTES_DB;
  if (category !== 'all') {
    filtered = QUOTES_DB.filter(q => q.category === category);
    if (filtered.length === 0) filtered = QUOTES_DB;
  }
  const index = Math.floor(Math.random() * filtered.length);
  const quote = filtered[index];

  const luckyNumbers = Array.from({ length: 6 }, () => Math.floor(Math.random() * 45) + 1)
    .sort((a, b) => a - b);

  const luckyColor = LUCKY_COLORS[Math.floor(Math.random() * LUCKY_COLORS.length)];

  const scores = {
    total: Math.floor(Math.random() * 20) + 81,
    wealth: Math.floor(Math.random() * 3) + 3,
    love: Math.floor(Math.random() * 3) + 3,
    success: Math.floor(Math.random() * 3) + 3,
    health: Math.floor(Math.random() * 2) + 4
  };

  return {
    ...quote,
    luckyNumbers,
    luckyColor,
    scores,
    timestamp: new Date().toISOString()
  };
}
