export interface StashOptions {
  type?: 'local' | 'session' | 'cookie';
  expires?: string | Date;
  fallback?: boolean;
}

export interface StashData {
  value: any;
  expires: string | null;
}

export interface Stash {
  set(key: string, value: any, options: StashOptions): void;
  get(key: string, options: StashOptions): any | null;
  remove(key: string, options: StashOptions): void;
  clear(options: StashOptions): void;
}
