# Working Documentation for Stash Library

## Overview
This document serves as an internal reference for understanding the **Stash** library, how it works, and the decisions behind its implementation. Unlike `README.md`, this file is **for my personal use** to track what I have done and why.

---

## 🛠 What This Library Does
The **Stash** library provides a **unified API** to manage three types of storage:
- `localStorage`
- `sessionStorage`
- `cookies`

Instead of manually writing `localStorage.setItem()` or handling cookies separately, this library provides a cleaner abstraction.

---

## 🔑 Core Features
1. **Unified API** for setting, getting, removing, and clearing storage.
2. **Handles JSON parsing** internally to prevent errors.
3. **Supports expiration for cookies** (optional `expiryDays` parameter).
4. **Works only in the browser** (prevents SSR-related crashes by checking `window`).
5. **Singleton pattern** ensures only one instance is used throughout the app.

---

## 📌 Key Implementation Details
### 1️⃣ `set(type, key, value, expiryDays?)`
- Stores the given `value` in the selected storage (`local`, `session`, or `cookie`).
- Converts the `value` to JSON before saving.
- Handles cookie expiration if `expiryDays` is provided.
- Uses a **switch-case** for scalability and readability.

### 2️⃣ `get<T>(type, key)`
- Retrieves data from storage and parses it back to its original type.
- Uses a private helper method `parseValue()` to safely handle JSON parsing.
- For cookies, it loops through `document.cookie` to find the matching key.

### 3️⃣ `remove(type, key)`
- Removes the key from the specified storage.
- For cookies, sets an **expired timestamp** to delete it.

### 4️⃣ `clear(type)`
- Clears **all entries** in the selected storage.
- Uses a private `clearCookies()` method to remove all stored cookies.

### 5️⃣ Private Helper Methods
- `isBrowser()`: Ensures the code runs only in the browser.
- `parseValue()`: Safely parses JSON values.
- `getCookie()`: Extracts a single cookie.
- `clearCookies()`: Deletes all cookies.

---

## 🧐 Why Certain Choices Were Made
### ✅ Why Use `switch-case` Instead of `if-else`?
- **Scalability**: Easier to extend when adding more storage options.
- **Performance**: `switch` is optimized for multi-branch conditions.
- **Readability**: More structured and easier to navigate.

### ✅ Why Use Private Methods?
- **Encapsulation**: Prevents external access to internal logic.
- **Code Reusability**: Avoids repeating `JSON.parse()` in multiple places.
- **Improved Readability**: Keeps the main functions clean and concise.

### ✅ Why a Singleton Instance?
- Prevents unnecessary multiple instances.
- Ensures consistent state throughout the application.
- Simplifies usage by always using `useStash()`.

---

## 🔄 Future Improvements / Ideas
- [ ] Add **TypeScript Generics** for stricter type safety.
- [ ] Support **IndexedDB** for larger storage needs.
- [ ] Option to **encrypt stored data** for added security.
- [ ] Improve error handling with **custom exceptions**.

---

## 📝 Personal Notes
- Everything works as expected, but **cookie storage** needs more testing across different browsers.
- Need to test how this handles **storage limits** (e.g., `QuotaExceededError` in localStorage).
- Potential optimization: use a **cache mechanism** to reduce frequent `JSON.parse()` calls.

---

## 🔗 Related Files
- `stash.ts` → Core library implementation
- `README.md` → Public-facing documentation for usage
- `tests/` → Unit tests for different storage types

---

## 🚀 Quick Recap
### How to Use Stash in the Project
```ts
const stash = useStash();
stash.set("local", "username", "Ganesh Sharma");
const user = stash.get<string>("local", "username");
console.log(user); // Outputs: Ganesh Sharma
```

## 📌 Points to Remember
- Changed module from **CommonJS** to **ESNext** for better compatibility with React.
- Target set to **ES2016** instead of ES6 for modern JavaScript features.
- Optimized code by replacing `if-else` blocks with `switch-case` to improve readability and performance.
- Handles **QuotaExceededError** in `localStorage` to prevent crashes.
- **Red Hat Dependency Analytics** was the cause of recursive `node_modules` installations, now removed.

## 🛠 How to Install the Project

1. Initialize the project:
   ```sh
   npm init -y
   ```
2. Install TypeScript:
   ```sh
   npm i typescript --save-dev
   ```
3. Initialize TypeScript configuration:
   ```sh
   npm --init
   ```
4. Compile TypeScript:
   ```sh
   npx tsc
   ```

This file is for **internal tracking only**. If I revisit this project after months, this document will remind me exactly how everything works! 😎

