// Toast Notification Controller Component

export class ToastController {
  constructor(toastEl) {
    this.toastEl = toastEl;
    this.timer = null;
  }

  show(message, duration = 2800) {
    this.toastEl.textContent = message;
    this.toastEl.classList.remove('hidden');
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.toastEl.classList.add('hidden');
    }, duration);
  }
}
