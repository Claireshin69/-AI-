// Fortune Result Card Modal & Custom Maker Modal Controllers Component
import { QUOTE_CATEGORIES } from './quotes.js';

export class ModalController {
  constructor(elements) {
    this.elements = elements;
  }

  showResult(fortune) {
    const f = fortune;
    const el = this.elements;

    el.slipDate.textContent = new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' });
    el.slipQuoteText.textContent = f.text;
    el.slipQuoteAuthor.textContent = `- ${f.author} -`;
    el.slipEnglishText.textContent = f.english ? `"${f.english}"` : '';

    const catObj = QUOTE_CATEGORIES.find(c => c.id === f.category);
    el.slipCategoryTag.textContent = catObj ? catObj.label : '✨ 오늘의 명언';

    // Scores
    el.slipTotalLuckScore.textContent = `${f.scores.total}%`;
    el.slipLuckBar.style.width = `${f.scores.total}%`;
    el.slipWealthStars.textContent = '★'.repeat(f.scores.wealth) + '☆'.repeat(5 - f.scores.wealth);
    el.slipLoveStars.textContent = '★'.repeat(f.scores.love) + '☆'.repeat(5 - f.scores.love);
    el.slipSuccessStars.textContent = '★'.repeat(f.scores.success) + '☆'.repeat(5 - f.scores.success);
    el.slipHealthStars.textContent = '★'.repeat(f.scores.health) + '☆'.repeat(5 - f.scores.health);

    // Lucky Numbers & Colors
    el.slipLuckyNumbers.innerHTML = f.luckyNumbers.map(n => `<span class="ball">${n}</span>`).join('');
    el.slipColorDot.style.backgroundColor = f.luckyColor.hex;
    el.slipColorName.textContent = f.luckyColor.name;

    setTimeout(() => {
      el.resultModal.classList.remove('hidden');
    }, 400);
  }

  hideResult() {
    this.elements.resultModal.classList.add('hidden');
  }

  openCustomModal() {
    this.elements.customCookieModal.classList.remove('hidden');
  }

  closeCustomModal() {
    this.elements.customCookieModal.classList.add('hidden');
  }
}
