# StorageBuddy - Simplified LocalStorage, SessionStorage & Cookies Management





StorageBuddy is a lightweight, **zero-dependency** JavaScript library that provides a **unified API** for handling `localStorage`, `sessionStorage`, and cookies effortlessly.

🔹 **Cleaner & More Readable Code**\
🔹 **Automatic JSON Handling**\
🔹 **Cookie Expiration Support**\
🔹 **Works Seamlessly in the Browser**

## 🚀 Installation

Install via **npm**:

```sh
npm install storagebuddy
```

or via **yarn**:

```sh
yarn add storagebuddy
```

## 📌 Features

✔️ Unified API for all storage types\
✔️ Get, set, remove, and clear storage effortlessly\
✔️ Automatic JSON serialization & parsing\
✔️ Supports cookie expiration\
✔️ Works only in browser environments (prevents SSR issues)\
✔️ Small bundle size and optimized for performance

## 📖 Usage

### Import StorageBuddy

```ts
import useStash from "storagebuddy";
const stash = useStash();
```

### Set Data

```ts
stash.set("local", "user", { name: "Ganesh Sharma", age: 23 });
stash.set("session", "theme", "dark");
stash.set("cookie", "token", "123abc", 7); // Expires in 7 days
```

### Get Data

```ts
const user = stash.get<{ name: string; age: number }>("local", "user");
console.log(user.name); // "Ganesh Sharma"
```

### Remove Data

```ts
stash.remove("session", "theme");
```

### Clear All Data

```ts
stash.clear("local"); // Clears all localStorage entries
stash.clear("cookie"); // Clears all cookies
```

## 🛠 API Reference

| Method                               | Description                                                                             |
| ------------------------------------ | --------------------------------------------------------------------------------------- |
| `set(type, key, value, expiryDays?)` | Saves data to localStorage, sessionStorage, or cookies. Expiry is optional for cookies. |
| `get<T>(type, key)`                  | Retrieves stored data and parses JSON automatically.                                    |
| `remove(type, key)`                  | Removes the specified key from the selected storage type.                               |
| `clear(type)`                        | Clears all data for the given storage type.                                             |

## 🧐 Why Choose StorageBuddy?

🔹 **Reduces Boilerplate** - No more repetitive storage handling.\
🔹 **Error-Free JSON Handling** - No need to manually `JSON.parse()` or `JSON.stringify()`.\
🔹 **Lightweight & Performant** - Minimal overhead, fast execution.\
🔹 **Works in Modern Browsers** - Chrome, Firefox, Safari, Edge, and more.

## 🏗️ Future Enhancements

-

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 💡 Contributing

Found a bug or have an idea? Contributions are always welcome! Feel free to open an issue or submit a pull request.

## 🌍 Support & Community

If you found this library helpful, please ⭐ star the repo and share it with others!

---

Built with ❤️ by **Ganesh Sharma** 🚀