// Card Exporter & Clipboard Helper Utility

export function exportFortuneCard(fortune) {
  const canvas = document.createElement('canvas');
  canvas.width = 600;
  canvas.height = 420;
  const ctx = canvas.getContext('2d');

  // Background Gradient
  const grad = ctx.createLinearGradient(0, 0, 600, 420);
  grad.addColorStop(0, '#1F2937');
  grad.addColorStop(1, '#111827');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 600, 420);

  // Paper Slip
  ctx.fillStyle = '#FFFDF5';
  ctx.shadowColor = 'rgba(0,0,0,0.5)';
  ctx.shadowBlur = 20;
  ctx.shadowOffsetY = 10;
  ctx.beginPath();
  ctx.roundRect(40, 40, 520, 340, 16);
  ctx.fill();
  ctx.shadowBlur = 0;

  // Red Border Frame
  ctx.strokeStyle = '#DC2626';
  ctx.lineWidth = 3;
  ctx.strokeRect(55, 55, 490, 310);

  // Header Title
  ctx.fillStyle = '#991B1B';
  ctx.font = 'bold 22px "Noto Serif KR", serif';
  ctx.textAlign = 'center';
  ctx.fillText('🥠 FORTUNE COOKIE', 300, 100);

  // Quote Text
  ctx.fillStyle = '#1F2937';
  ctx.font = '500 20px "Pretendard", sans-serif';

  // Wrap text helper
  const words = fortune.text.split(' ');
  let line = '';
  let y = 160;
  const maxWidth = 440;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && n > 0) {
      ctx.fillText(line, 300, y);
      line = words[n] + ' ';
      y += 32;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, 300, y);

  // Author / English Quote
  if (fortune.english) {
    ctx.fillStyle = '#6B7280';
    ctx.font = 'italic 14px "Outfit", sans-serif';
    ctx.fillText(`"${fortune.english}"`, 300, y + 40);
  }

  // Lucky Numbers & Color Footer
  ctx.fillStyle = '#D97706';
  ctx.font = 'bold 16px "Pretendard", sans-serif';
  const luckyText = `🍀 행운의 숫자: ${fortune.luckyNumbers.join(', ')}  |  🎨 행운의 색: ${fortune.luckyColor.name}`;
  ctx.fillText(luckyText, 300, 340);

  // Download Trigger
  const dataUrl = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.download = `Fortune_Cookie_${Date.now()}.png`;
  link.href = dataUrl;
  link.click();
}

export async function copyQuoteToClipboard(fortune) {
  const text = `🥠 [오늘의 포춘 쿠키 명언]\n\n"${fortune.text}"\n- ${fortune.author}\n\n🍀 행운의 숫자: ${fortune.luckyNumbers.join(', ')}\n🎨 행운의 색상: ${fortune.luckyColor.name}`;
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (e) {
    console.warn("Copy failed", e);
    return false;
  }
}
