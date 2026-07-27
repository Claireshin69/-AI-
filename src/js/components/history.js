// History Drawer UI Renderer Component

export class HistoryDrawerController {
  constructor(drawerEl, containerEl, countLabelEl, historyManager, onToast) {
    this.drawerEl = drawerEl;
    this.containerEl = containerEl;
    this.countLabelEl = countLabelEl;
    this.historyManager = historyManager;
    this.onToast = onToast;
  }

  open() {
    this.render();
    this.drawerEl.classList.remove('hidden');
  }

  close() {
    this.drawerEl.classList.add('hidden');
  }

  render() {
    const list = this.historyManager.getAll();
    this.countLabelEl.textContent = `총 ${list.length}개의 포춘이 보관되었습니다.`;

    if (list.length === 0) {
      this.containerEl.innerHTML = `
        <div style="text-align: center; padding: 40px 10px; color: #6B7280;">
          <p style="font-size: 2rem; margin-bottom: 8px;">🥠</p>
          <p>아직 보관된 포춘 쿠키가 없습니다.<br/>포춘 쿠키를 클릭해 명언을 모아보세요!</p>
        </div>
      `;
      return;
    }

    this.containerEl.innerHTML = list.map(item => `
      <div class="history-card" data-ts="${item.timestamp}">
        <div class="h-date">${item.savedAt}</div>
        <div class="h-quote">"${item.text}"</div>
        <div class="h-footer">
          <span>- ${item.author}</span>
          <button class="h-del-btn" data-ts="${item.timestamp}">&times; 삭제</button>
        </div>
      </div>
    `).join('');

    this.containerEl.querySelectorAll('.h-del-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const ts = e.currentTarget.dataset.ts;
        this.historyManager.delete(ts);
        this.render();
        if (this.onToast) this.onToast('포춘 항목이 삭제되었습니다.');
      });
    });
  }
}
