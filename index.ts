// Define the types of storage that can be used
type StorageType = "local" | "session" | "cookie";

class Stash {
  /**
   * Checks if the code is running in a browser environment.
   * This prevents errors when running on the server (e.g., in SSR/Next.js).
   */
  private isBrowser(): boolean {
    return typeof window !== "undefined";
  }

  /**
   * Stores a key-value pair in the specified storage type (localStorage, sessionStorage, or cookies).
   *
   * @param type - Type of storage ("local", "session", or "cookie").
   * @param key - The key under which the data is stored.
   * @param value - The value to store (can be any data type).
   * @param expiryDays - (Optional) Number of days before the cookie expires.
   */
  set(type: StorageType, key: string, value: any, expiryDays?: number) {
    if (!this.isBrowser()) {
      console.error(`Storage is not available: Cannot set ${key}`);
      return;
    }

    try {
      const data = JSON.stringify(value); // Convert data to a string before storing

      // Using switch-case to handle different storage types efficiently
      switch (type) {
        case "local":
          localStorage.setItem(key, data);
          break;
        case "session":
          sessionStorage.setItem(key, data);
          break;
        case "cookie":
          let cookieString = `${encodeURIComponent(key)}=${encodeURIComponent(
            data
          )}; path=/`;

          // If an expiry date is provided, add it to the cookie
          if (expiryDays) {
            const expiryDate = new Date();
            expiryDate.setDate(expiryDate.getDate() + expiryDays);
            cookieString += `; expires=${expiryDate.toUTCString()}`;
          }
          document.cookie = cookieString;
          break;
        default:
          console.warn(`Invalid storage type: ${type}`);
      }
    } catch (error) {
      console.error(`Error setting ${key} in ${type}:`, error);
    }
  }

  /**
   * Retrieves a stored value from the specified storage type.
   *
   * @param type - The storage type ("local", "session", or "cookie").
   * @param key - The key of the stored item.
   * @returns The stored value, or null if not found.
   */
  get<T>(type: StorageType, key: string): T | null {
    if (!this.isBrowser()) {
      console.error(`Storage is not available: Cannot get ${key}`);
      return null;
    }

    try {
      switch (type) {
        case "local":
          return this.parseValue(localStorage.getItem(key));
        case "session":
          return this.parseValue(sessionStorage.getItem(key));
        case "cookie":
          return this.getCookie<T>(key);
        default:
          console.warn(`Invalid storage type: ${type}`);
          return null;
      }
    } catch (error) {
      console.error(`Error retrieving ${key} from ${type}:`, error);
      return null;
    }
  }

  /**
   * Removes a specific key from the given storage type.
   *
   * @param type - The storage type ("local", "session", or "cookie").
   * @param key - The key to remove.
   */
  remove(type: StorageType, key: string): void {
    if (!this.isBrowser()) {
      console.error(`Storage is not available: Cannot remove ${key}`);
      return;
    }

    try {
      switch (type) {
        case "local":
          localStorage.removeItem(key);
          break;
        case "session":
          sessionStorage.removeItem(key);
          break;
        case "cookie":
          // Deleting a cookie by setting an expired date
          document.cookie = `${encodeURIComponent(
            key
          )}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
          break;
        default:
          console.warn(`Invalid storage type: ${type}`);
      }
    } catch (error) {
      console.error(`Error removing ${key} from ${type}:`, error);
    }
  }

  /**
   * Clears all stored data from the specified storage type.
   *
   * @param type - The storage type ("local", "session", or "cookie").
   */
  clear(type: StorageType): void {
    if (!this.isBrowser()) {
      console.error(`Storage is not available: Cannot clear ${type}`);
      return;
    }

    try {
      switch (type) {
        case "local":
          localStorage.clear();
          break;
        case "session":
          sessionStorage.clear();
          break;
        case "cookie":
          this.clearCookies();
          break;
        default:
          console.warn(`Invalid storage type: ${type}`);
      }
    } catch (error) {
      console.error(`Error clearing ${type}:`, error);
    }
  }

  /**
   * Helper method to safely parse JSON values.
   *
   * @param value - The string value retrieved from storage.
   * @returns The parsed value, or null if parsing fails.
   */
  private parseValue<T>(value: string | null): T | null {
    return value ? (JSON.parse(value) as T) : null;
  }

  /**
   * Retrieves a specific cookie value.
   *
   * @param key - The key of the cookie.
   * @returns The cookie value, or null if not found.
   */
  private getCookie<T>(key: string): T | null {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
      const [storedKey, storedValue] = cookie.split("=");
      if (decodeURIComponent(storedKey) === key) {
        return this.parseValue<T>(decodeURIComponent(storedValue));
      }
    }
    return null;
  }

  /**
   * Clears all cookies by setting their expiration dates to the past.
   */
  private clearCookies(): void {
    document.cookie.split("; ").forEach((cookie) => {
      const key = cookie.split("=")[0].trim();
      document.cookie = `${key}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
    });
  }
}

// Create a single instance of Stash (singleton pattern)
const stash = new Stash();

// Export a function to use the stash instance
export const useStash = () => stash;
