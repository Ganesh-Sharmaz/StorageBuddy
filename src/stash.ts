import { StashOptions, StashData, Stash } from './types';

const Stash: Stash = (() => {
  const isLocalStorageAvailable = (): boolean => {
    try {
      const testKey = '__test__';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  };

  const parseExpiration = (expires?: string | Date): string | null => {
    if (!expires) return null;
    if (expires instanceof Date) return expires.toUTCString();
    const units = { d: 86400, h: 3600, m: 60 };
    const unit = expires.slice(0,-1) as keyof typeof units;
    const value = parseInt(expires.slice(0, -1));
    const seconds = value * (units[unit] || 1);
    return new Date(Date.now() + seconds * 1000).toUTCString();
  };

  return {
    set(key: string, value: any, { type = 'local', expires, fallback = false }: StashOptions): void {
      const data: StashData = { value, expires: parseExpiration(expires) };
      if (type === 'local' && (isLocalStorageAvailable() || !fallback)) {
        localStorage.setItem(key, JSON.stringify(data));
      } else if (type === 'session') {
        sessionStorage.setItem(key, JSON.stringify(data));
      } else {
        document.cookie = `${key}=${JSON.stringify(data)}; expires=${parseExpiration(expires)}; path=/`;
      }
    },

    get(key: string, { type = 'local', fallback = false }: StashOptions): any | null {
      let data: string | null;
      if (type === 'local' && (isLocalStorageAvailable() || !fallback)) {
        data = localStorage.getItem(key);
      } else if (type === 'session') {
        data = sessionStorage.getItem(key);
      } else {
        const cookie = document.cookie.split('; ').find(row => row.startsWith(`${key}=`));
        data = cookie ? cookie.split('=')[1] : null;
      }
      if (!data) return null;
      const { value, expires }: StashData = JSON.parse(data);
      if (expires && new Date(expires) < new Date()) {
        this.remove(key, { type });
        return null;
      }
      return value;
    },

    remove(key: string, { type = 'local' }: StashOptions): void {
      if (type === 'local') {
        localStorage.removeItem(key);
      } else if (type === 'session') {
        sessionStorage.removeItem(key);
      } else {
        document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      }
    },

    clear({ type = 'local' }: StashOptions): void {
      if (type === 'local') {
        localStorage.clear();
      } else if (type === 'session') {
        sessionStorage.clear();
      } else {
        document.cookie.split('; ').forEach(cookie => {
          const key = cookie.split('=')[0];
          document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        });
      }
    }
  };
})();

export default Stash;
