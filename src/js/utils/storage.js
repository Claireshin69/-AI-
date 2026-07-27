// LocalStorage Data Manager Utility

const STORAGE_KEY = 'fortune_cookie_history_v1';

export class HistoryManager {
  constructor() {
    this.history = this.load();
  }

  load() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.warn("Failed to load history from LocalStorage", e);
      return [];
    }
  }

  save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.history));
    } catch (e) {
      console.warn("Failed to save history", e);
    }
  }

  add(fortune) {
    const item = {
      ...fortune,
      savedAt: new Date().toLocaleString('ko-KR', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      favorite: false
    };
    this.history.unshift(item);
    this.save();
    return item;
  }

  toggleFavorite(timestamp) {
    const item = this.history.find(h => h.timestamp === timestamp);
    if (item) {
      item.favorite = !item.favorite;
      this.save();
    }
    return item ? item.favorite : false;
  }

  delete(timestamp) {
    this.history = this.history.filter(h => h.timestamp !== timestamp);
    this.save();
  }

  clearAll() {
    this.history = [];
    this.save();
  }

  getAll() {
    return this.history;
  }
}
