# StorageBuddy

![npm](https://img.shields.io/npm/v/storagebuddy)
![Bundle Size](https://img.shields.io/bundlephobia/minzip/storagebuddy)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)
![License](https://img.shields.io/badge/license-MIT-green)

> A lightweight, zero-dependency TypeScript library that provides a unified API for managing browser storage mechanisms.

StorageBuddy simplifies working with `localStorage`, `sessionStorage`, and `cookies` through a single, intuitive interface. It handles all the complexity of data serialization, storage management, and expiration handling so you can focus on building your application.

## ✨ Highlights

- **Unified API** - Consistent methods across all storage types
- **Type Safety** - Full TypeScript support with generic type inference
- **Automatic JSON Handling** - No manual parsing or stringifying
- **Zero Dependencies** - Lightweight and bloat-free
- **Browser-Optimized** - Designed for client-side applications

## 📦 Installation

Choose your preferred package manager:

```bash
# npm
npm install storagebuddy

# yarn
yarn add storagebuddy

# pnpm
pnpm add storagebuddy
```

## 🚀 Quick Start

```typescript
import useStash from "storagebuddy";

// Initialize StorageBuddy
const stash = useStash();

// Store data in different storage types
stash.set("local", "user", { name: "Ganesh Sharma", age: 23 });
stash.set("session", "theme", "dark");
stash.set("cookie", "token", "123abc", 7); // Expires in 7 days

// Retrieve data with type safety
const user = stash.get<{ name: string; age: number }>("local", "user");
console.log(user.name); // "Ganesh Sharma"

// Remove specific items
stash.remove("session", "theme");

// Clear all data for a storage type
stash.clear("local");
```

## 📖 Detailed Usage Guide

### Storage Types

StorageBuddy supports three storage mechanisms:

- `"local"` - Uses `localStorage` (persists across browser sessions)
- `"session"` - Uses `sessionStorage` (persists until browser/tab is closed)
- `"cookie"` - Uses document cookies (configurable expiration)

### Setting Values

```typescript
// Basic usage
stash.set("local", "username", "ganesh");

// Store complex objects (automatically serialized)
stash.set("local", "settings", {
  darkMode: true,
  fontSize: 16,
  notifications: {
    email: true,
    push: false
  }
});

// Store in session storage
stash.set("session", "currentPage", "/dashboard");

// Store cookies with expiration (in days)
stash.set("cookie", "auth", "token123", 7); // Expires in 7 days
stash.set("cookie", "visitor", "true", 365); // Expires in 1 year
stash.set("cookie", "popup", "seen", 0.5); // Expires in 12 hours
```

### Retrieving Values

```typescript
// Basic retrieval
const username = stash.get<string>("local", "username");

// Retrieve with type safety for complex objects
interface UserSettings {
  darkMode: boolean;
  fontSize: number;
  notifications: {
    email: boolean;
    push: boolean;
  };
}

const settings = stash.get<UserSettings>("local", "settings");
console.log(settings.darkMode); // true
console.log(settings.notifications.email); // true

// Retrieve from different storage types
const currentPage = stash.get<string>("session", "currentPage");
const authToken = stash.get<string>("cookie", "auth");

// Handling non-existent values (returns null)
const nonExistent = stash.get("local", "nonExistentKey");
if (nonExistent === null) {
  console.log("Value doesn't exist");
}
```

### Removing Values

```typescript
// Remove a single item
stash.remove("local", "username");
stash.remove("session", "currentPage");
stash.remove("cookie", "auth");
```

### Clearing Storage

```typescript
// Clear all localStorage items
stash.clear("local");

// Clear all sessionStorage items
stash.clear("session");

// Clear all cookies
stash.clear("cookie");
```

## 🛠️ API Reference

### `useStash()`

Creates a new StorageBuddy instance.

**Returns**: StorageBuddy instance with the following methods:

### `set(type, key, value, expiryDays?)`

Stores a value in the specified storage type.

| Parameter | Type | Description |
|-----------|------|-------------|
| `type` | `"local"` \| `"session"` \| `"cookie"` | Storage mechanism to use |
| `key` | `string` | Key to store the value under |
| `value` | `any` | Value to store (automatically serialized) |
| `expiryDays` | `number` (optional) | Days until expiration (cookies only) |

**Returns**: `void`

### `get<T>(type, key)`

Retrieves a value from the specified storage type.

| Parameter | Type | Description |
|-----------|------|-------------|
| `type` | `"local"` \| `"session"` \| `"cookie"` | Storage mechanism to use |
| `key` | `string` | Key to retrieve |

**Returns**: `T | null` - The stored value (parsed if JSON) or null if not found

### `remove(type, key)`

Removes a value from the specified storage type.

| Parameter | Type | Description |
|-----------|------|-------------|
| `type` | `"local"` \| `"session"` \| `"cookie"` | Storage mechanism to use |
| `key` | `string` | Key to remove |

**Returns**: `void`

### `clear(type)`

Clears all values from the specified storage type.

| Parameter | Type | Description |
|-----------|------|-------------|
| `type` | `"local"` \| `"session"` \| `"cookie"` | Storage mechanism to clear |

**Returns**: `void`

## 🧪 Advanced Usage

### Type Safety with TypeScript

StorageBuddy works seamlessly with TypeScript to provide type safety:

```typescript
// Define your types
interface User {
  id: number;
  name: string;
  roles: string[];
}

// Type-safe storage and retrieval
stash.set("local", "currentUser", {
  id: 123,
  name: "Ganesh",
  roles: ["admin", "developer"]
} as User);

const user = stash.get<User>("local", "currentUser");
// User is now fully typed
console.log(user?.roles.includes("admin")); // true
```

### Browser Compatibility

StorageBuddy works in all modern browsers:

| Browser | Version |
|---------|---------|
| Chrome | 42+ |
| Firefox | 38+ |
| Safari | 9+ |
| Edge | 12+ |
| Opera | 29+ |

### Error Handling

StorageBuddy includes built-in error handling:

```typescript
try {
  const result = stash.get("local", "complexData");
  // Use result
} catch (error) {
  console.error("Storage operation failed:", error);
}
```

## 🎯 Use Cases

### User Preferences

```typescript
// Save user preferences
stash.set("local", "preferences", {
  theme: "dark",
  fontSize: "medium",
  notifications: true
});

// Retrieve preferences when needed
const prefs = stash.get("local", "preferences");
applyTheme(prefs.theme);
```

### Authentication

```typescript
// Store auth token as a cookie with expiration
function login(username, password) {
  // Authenticate with API...
  const token = "jwt-token-from-server";
  stash.set("cookie", "authToken", token, 7); // Expires in 7 days
}

// Check if user is logged in
function isLoggedIn() {
  return stash.get("cookie", "authToken") !== null;
}

// Logout
function logout() {
  stash.remove("cookie", "authToken");
}
```

### Form Persistence

```typescript
// Save form data as user types
formElement.addEventListener("input", (e) => {
  const formData = getFormValues();
  stash.set("session", "draftForm", formData);
});

// Restore form data when page loads
window.addEventListener("load", () => {
  const savedForm = stash.get("session", "draftForm");
  if (savedForm) {
    populateForm(savedForm);
  }
});
```

## 🔮 Roadmap

StorageBuddy is actively maintained, with the following features planned:

1. **🔐 Encryption Support**
   - Add optional encryption for sensitive data
   - AES-256 encryption for secure storage

2. **📡 Storage Event Listeners**
   - Support for listening to storage changes across tabs
   - Custom event system for real-time updates

3. **⏱️ Advanced Expiration Options**
   - Custom expiration units (hours, minutes, seconds)
   - Support for absolute expiration timestamps

4. **🧰 Storage Utilities**
   - Batch operations for improved performance
   - Storage quota management and monitoring

5. **🧩 Plugin System**
   - Extensible architecture for custom storage adapters
   - Support for third-party storage mechanisms

## 🤝 Contributing

Contributions are always welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

Please make sure to update tests as appropriate and adhere to the code style.

## 📜 License

StorageBuddy is [MIT licensed](LICENSE).

## 💬 Community & Support

- **GitHub Issues**: Report bugs or request features
- **Twitter**: Follow [@GaneshSharma](https://twitter.com/username) for updates
- **Discord**: Join our [community channel](https://discord.gg/channel)

---

<p align="center">
  Built with ❤️ by <a href="https://github.com/username">Ganesh Sharma</a>
</p>