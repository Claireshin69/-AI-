/**
 * 맘별AI 자기이해 미니리포트 - 12개 심층 진단 질문 데이터
 * 대상: 40~70세 (감정, 강점, 관계, 4원소 에너지 분석)
 */

export const QUESTION_CATEGORIES = {
  EMOTION: { id: 'EMOTION', title: '현재 상태 및 감정 날씨', icon: 'cloud-sun', color: '#f59e0b' },
  STRENGTH: { id: 'STRENGTH', title: '내면의 핵심 강점 및 빛', icon: 'sparkles', color: '#f43f5e' },
  RELATIONSHIP: { id: 'RELATIONSHIP', title: '관계 패턴 및 소통 방식', icon: 'heart-handshake', color: '#3b82f6' },
  ELEMENT: { id: 'ELEMENT', title: '4원소 에너지 (불·물·공기·흙)', icon: 'compass', color: '#14b8a6' }
};

export const QUESTIONS = [
  // --- 1구역: 감정 및 현재 상태 (Questions 1~3) ---
  {
    id: 1,
    category: 'EMOTION',
    title: '요즘 아침에 눈을 떴을 때 마음의 가장 솔직한 날씨는 어떤가요?',
    subtitle: '스스로의 마음에 가만히 귀를 기울여보세요.',
    type: 'choice',
    options: [
      { id: '1a', text: '맑고 평온함', desc: '마음이 비교적 잔잔하고 안정을 느끼고 있습니다.', element: 'earth', score: { earth: 4, air: 2 }, emotionTag: '평온' },
      { id: '1b', text: '화창하지만 약간의 설렘/조바심', desc: '새로운 시작이나 하고 싶은 일이 있어 열정이 피어납니다.', element: 'fire', score: { fire: 4, air: 2 }, emotionTag: '열정' },
      { id: '1c', text: '구름 많고 다소 아련함', desc: '지나온 시간에 대한 생각이나 만감이 교차합니다.', element: 'water', score: { water: 4, earth: 2 }, emotionTag: '사색' },
      { id: '1d', text: '안개 끼듯 막막하고 피로함', desc: '내 마음을 어디로 두어야 할지 방향을 찾고 싶습니다.', element: 'air', score: { air: 3, water: 3 }, emotionTag: '재충전 필요' }
    ]
  },
  {
    id: 2,
    category: 'EMOTION',
    title: '최근 나를 가장 고민하게 하거나 마음 에너지를 많이 쓰게 만드는 부분은 무엇인가요?',
    subtitle: '가장 마음에 먼저 떠오르는 항목을 선택해주세요.',
    type: 'choice',
    options: [
      { id: '2a', text: '자식/가족과의 관계 및 커뮤니케이션', desc: '가장 가깝기에 마음처럼 되지 않는 대화와 서운함', element: 'water', score: { water: 4, earth: 2 }, concernTag: '가족소통' },
      { id: '2b', text: '제2의 인생 방향 및 나의 존재감', desc: '은퇴/역할 변화 후 "진짜 나"를 찾고 싶은 마음', element: 'fire', score: { fire: 4, air: 2 }, concernTag: '인생재도약' },
      { id: '2c', text: '건강과 신체적 에너지의 변화', desc: '예전 같지 않은 체력과 활력을 다시 챙기고 싶음', element: 'earth', score: { earth: 5, water: 1 }, concernTag: '건강에너지' },
      { id: '2d', text: '내 안의 오래된 감정 정리 및 마음 평화', desc: '쌓여온 스트레스와 표현하지 못한 마음의 해소', element: 'air', score: { air: 4, water: 2 }, concernTag: '마음정리' }
    ]
  },
  {
    id: 3,
    category: 'EMOTION',
    title: '현재 나의 마음 충전도(에너지 잔여량)는 어느 정도인가요?',
    subtitle: '슬라이더를 움직여 현재 마음의 에너지 수준을 표시해보세요.',
    type: 'scale',
    minText: '0% (휴식이 간절해요)',
    maxText: '100% (활력이 넘쳐요)',
    defaultValue: 50
  },

  // --- 2구역: 내면의 강점 (Questions 4~6) ---
  {
    id: 4,
    category: 'STRENGTH',
    title: '주변 사람들이 나에게 가장 고마워하거나 칭찬하는 나의 모습은 무엇인가요?',
    subtitle: '내가 가진 빛나는 보석 같은 강점입니다.',
    type: 'choice',
    options: [
      { id: '4a', text: '따뜻하게 이야기를 들어주고 공감하는 마음', desc: '상대방의 아픔과 기쁨을 내 일처럼 느껴줍니다.', element: 'water', score: { water: 5, air: 1 }, strengthTag: '깊은 공감력' },
      { id: '4b', text: '풍부한 경험에서 나오는 지혜로운 조언과 판단', desc: '복잡한 문제의 중심을 꿰뚫어보는 식견이 있습니다.', element: 'air', score: { air: 5, earth: 1 }, strengthTag: '통찰과 지혜' },
      { id: '4c', text: '어려움 속에서도 묵묵히 곁을 지키는 든든함', desc: '변함없이 약속을 지키고 한결같이 의지가 됩니다.', element: 'earth', score: { earth: 5, fire: 1 }, strengthTag: '든든한 신뢰' },
      { id: '4d', text: '원하는 일을 적극적으로 이끌고 주도하는 분위기', desc: '새로운 시도를 두려워하지 않고 에너지를 줍니다.', element: 'fire', score: { fire: 5, air: 1 }, strengthTag: '추진력과 열정' }
    ]
  },
  {
    id: 5,
    category: 'STRENGTH',
    title: '내가 삶의 파도(어려운 시기)를 넘겼을 때 나를 지켜준 힘은 무엇이었나요?',
    subtitle: '과거의 수많은 나날들이 증명해 준 나의 회복탄력성입니다.',
    type: 'choice',
    options: [
      { id: '5a', text: '끈기와 인내심', desc: '"시간이 해결해 줄 거야"라는 마음으로 굳건히 견뎠습니다.', element: 'earth', score: { earth: 5, water: 1 }, strengthTag: '인내와 회복력' },
      { id: '5b', text: '긍정적인 희망과 새로운 도전', desc: '"더 좋아질 수 있어"라며 새로운 행동을 시작했습니다.', element: 'fire', score: { fire: 5, earth: 1 }, strengthTag: '긍정적 개척력' },
      { id: '5c', text: '수용과 순리', desc: '흐르는 물처럼 상황을 인정하고 마음을 누그러뜨렸습니다.', element: 'water', score: { water: 5, air: 1 }, strengthTag: '유연한 수용성' },
      { id: '5d', text: '배움과 객관적 정리', desc: '책이나 지혜, 깊은 생각을 통해 문제를 이해하려 했습니다.', element: 'air', score: { air: 5, fire: 1 }, strengthTag: '학습과 지혜' }
    ]
  },
  {
    id: 6,
    category: 'STRENGTH',
    title: '내가 가장 행복하고 나다운 성취감을 느낄 때의 모습은 어떤 순간인가요?',
    subtitle: '내가 좋아하는 소소한 순간을 적어보거나 선택하세요.',
    type: 'choice_with_text',
    options: [
      { id: '6a', text: '소중한 사람들을 정성껏 돌보고 함께 웃을 때', element: 'water', score: { water: 4 } },
      { id: '6b', text: '목표한 일을 깔끔하게 완수하고 나만의 시간을 가질 때', element: 'earth', score: { earth: 4 } },
      { id: '6c', text: '새로운 지식을 배우거나 아름다운 것을 감상할 때', element: 'air', score: { air: 4 } },
      { id: '6d', text: '내 생각과 꿈을 주도적으로 펼칠 때', element: 'fire', score: { fire: 4 } }
    ],
    placeholder: '직접 적어보고 싶은 나만의 행복 순간이 있다면 자유롭게 적어주세요.'
  },

  // --- 3구역: 관계 및 소통 방식 (Questions 7~9) ---
  {
    id: 7,
    category: 'RELATIONSHIP',
    title: '가족이나 지인과의 대화에서 서운하거나 아쉬움을 느낄 때는 언제인가요?',
    subtitle: '관계의 불협화음을 이해하면 소통의 열쇠가 열립니다.',
    type: 'choice',
    options: [
      { id: '7a', text: '내 마음이나 노력에 대해 충분히 인정받지 못할 때', desc: '정성을 다했지만 상대가 무심하게 느낄 때 섭섭함이 큽니다.', element: 'water', score: { water: 4, earth: 2 }, relationTag: '인정 욕구' },
      { id: '7b', text: '말이 안 통하거나 내 의견을 들어주지 않고 일방적일 때', desc: '서로 대화하려 해도 벽을 대하는 듯 느낌을 받을 때', element: 'air', score: { air: 4, fire: 2 }, relationTag: '소통 갈증' },
      { id: '7c', text: '지나치게 참견하거나 내 영역을 존중하지 않을 때', desc: '나만의 나이와 경험에 따른 자율성을 존중받고 싶습니다.', element: 'fire', score: { fire: 4, earth: 2 }, relationTag: '자율성 필요' },
      { id: '7d', text: '규칙이나 약속이 깨지고 예측 불가능해질 때', desc: '안정적이고 편안한 관계를 원하는데 조화가 깨질 때', element: 'earth', score: { earth: 4, water: 2 }, relationTag: '안정 지향' }
    ]
  },
  {
    id: 8,
    category: 'RELATIONSHIP',
    title: '상대방과 의견 차이가 생겼을 때 나의 기본적인 반응 태도는 어떤가요?',
    subtitle: '나의 소통 스타일을 객관적으로 살펴봅니다.',
    type: 'choice',
    options: [
      { id: '8a', text: '일단 상처받지 않기 위해 참고 상황을 부드럽게 넘긴다', element: 'water', score: { water: 5 }, styleTag: '배려형' },
      { id: '8b', text: '왜 그런 생각인지 이성적으로 따져보고 대화로 풀어낸다', element: 'air', score: { air: 5 }, styleTag: '논리소통형' },
      { id: '8c', text: '내 입장과 솔직한 뜻을 분명하고 당당하게 표현한다', element: 'fire', score: { fire: 5 }, styleTag: '솔직주도형' },
      { id: '8d', text: '시간을 두고 묵묵히 본보기를 보이거나 기다린다', element: 'earth', score: { earth: 5 }, styleTag: '신중인내형' }
    ]
  },
  {
    id: 9,
    category: 'RELATIONSHIP',
    title: '내가 앞으로의 대인관계(가족, 친구, 이웃)에서 가장 바라는 모습은 무엇인가요?',
    subtitle: '풍요롭고 편안한 인간관계를 향한 소망입니다.',
    type: 'choice',
    options: [
      { id: '9a', text: '서로의 허물을 감싸주고 조건 없이 아껴주는 깊은 친밀함', element: 'water', score: { water: 4, earth: 2 } },
      { id: '9b', text: '적당한 거리감을 유지하며 유쾌하고 지혜롭게 통하는 관계', element: 'air', score: { air: 4, fire: 2 } },
      { id: '9c', text: '서로의 성장을 응원하고 시너지를 내는 활기찬 관계', element: 'fire', score: { fire: 4, air: 2 } },
      { id: '9d', text: '언제 찾아가도 편안하고 아무 말 없어도 든든한 관계', element: 'earth', score: { earth: 4, water: 2 } }
    ]
  },

  // --- 4구역: 4원소 분석 & 삶의 방향 (Questions 10~12) ---
  {
    id: 10,
    category: 'ELEMENT',
    title: '자연의 4가지 원소 중 나의 마음에 가장 깊은 평안을 주는 기운은 어떤 것인가요?',
    subtitle: '본능적으로 이끌리는 자연의 에너지를 느껴보세요.',
    type: 'choice',
    options: [
      { id: '10a', text: '🔥 불 (Fire): 따뜻한 햇살, 타오르는 장작불, 활기찬 열정', desc: '내 안에 숨겨진 열정과 삶의 동력을 상징합니다.', element: 'fire', score: { fire: 6 } },
      { id: '10b', text: '💧 물 (Water): 잔잔한 호수, 시원한 바다, 따뜻한 찻물', desc: '깊은 공감과 감정의 정화, 순응하는 지혜를 상징합니다.', element: 'water', score: { water: 6 } },
      { id: '10c', text: '🌬️ 공기 (Air): 청량한 바람, 맑은 하늘, 지혜로운 호흡', desc: '자유로운 생각, 소통, 명확한 통찰력을 상징합니다.', element: 'air', score: { air: 6 } },
      { id: '10d', text: '🌱 흙 (Earth): 기름진 땅, 굳건한 바위, 푸른 숲', desc: '변치 않는 안정감, 결실을 맺는 실천력을 상징합니다.', element: 'earth', score: { earth: 6 } }
    ]
  },
  {
    id: 11,
    category: 'ELEMENT',
    title: '제2의 인생을 시작하는 지금, 내가 가장 채우고 싶은 인생의 핵심 가치는 무엇인가요?',
    subtitle: '나의 별자리가 나아갈 북극성 같은 목표입니다.',
    type: 'choice',
    options: [
      { id: '11a', text: '도전과 창조 (새로운 배움, 취미, 자기개발)', element: 'fire', score: { fire: 5, air: 2 } },
      { id: '11b', text: '마음의 평화와 치유 (감정의 회복, 여유)', element: 'water', score: { water: 5, earth: 2 } },
      { id: '11c', text: '지혜의 나눔과 선한 영향력 (상담, 봉사, 소통)', element: 'air', score: { air: 5, water: 2 } },
      { id: '11d', text: '안정적인 삶과 결실 (건강관리, 단단한 일상)', element: 'earth', score: { earth: 5, fire: 2 } }
    ]
  },
  {
    id: 12,
    category: 'ELEMENT',
    title: '나에게 보내는 다짐: 내가 나와의 약속으로 꼭 해보고 싶은 한 가지가 있다면?',
    subtitle: '어떠한 말이라도 좋습니다. 나를 위한 한 줄을 남겨주세요.',
    type: 'text_input',
    placeholder: '예: 하루 20분 내 마음을 위해 산책하기 / 매일 한 번 나 자신 칭찬하기',
    defaultValue: '내 마음을 우선으로 돌보고 매 순간을 따뜻하게 살아가겠습니다.'
  }
];
