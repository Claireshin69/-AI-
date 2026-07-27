/**
 * 맘별AI 자기이해 미니리포트 - LocalStorage 관리 모듈
 */

const STORAGE_KEY_PROFILE = 'mombyeol_user_profile';
const STORAGE_KEY_ANSWERS = 'mombyeol_user_answers';
const STORAGE_KEY_REPORT = 'mombyeol_report_data';

export const StorageManager = {
  saveProfile(profile) {
    try {
      localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.warn('Failed to save profile to localStorage', e);
    }
  },

  getProfile() {
    try {
      const data = localStorage.getItem(STORAGE_KEY_PROFILE);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  },

  saveAnswers(answers) {
    try {
      localStorage.setItem(STORAGE_KEY_ANSWERS, JSON.stringify(answers));
    } catch (e) {
      console.warn('Failed to save answers to localStorage', e);
    }
  },

  getAnswers() {
    try {
      const data = localStorage.getItem(STORAGE_KEY_ANSWERS);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      return {};
    }
  },

  saveReport(reportData) {
    try {
      localStorage.setItem(STORAGE_KEY_REPORT, JSON.stringify(reportData));
    } catch (e) {
      console.warn('Failed to save report to localStorage', e);
    }
  },

  getReport() {
    try {
      const data = localStorage.getItem(STORAGE_KEY_REPORT);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  },

  clearAll() {
    localStorage.removeItem(STORAGE_KEY_PROFILE);
    localStorage.removeItem(STORAGE_KEY_ANSWERS);
    localStorage.removeItem(STORAGE_KEY_REPORT);
  }
};
