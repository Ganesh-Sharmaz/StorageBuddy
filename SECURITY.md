# Security Policy

## 📅 Supported Versions  
We actively support and provide security updates for the following versions:

| Version | Supported |  
|---------|----------|  
| 1.0.4   | ✅ Yes   |  
| 1.0.3   | ❌ No    |  

Please upgrade to the latest version to ensure security and stability.  

---

## 🛡️ Reporting a Vulnerability  
If you discover a security vulnerability, **DO NOT** create a public issue. Instead, please follow these steps:  

1. **Email us** at **[shashanklhr@gmail.com]** with the subject **"[SECURITY] Vulnerability Report"**.  
2. Provide a **detailed description** of the issue, including steps to reproduce.  
3. Allow us **at least 72 hours** to assess and respond before public disclosure.  

---

## 🔐 Security Best Practices  
To keep your implementation secure, follow these best practices when using this library:  

- ✔️ **Keep dependencies up to date** – Regularly update the package to the latest version.  
- ✔️ **Avoid storing sensitive data** – Do not use `localStorage`, `sessionStorage`, or cookies for storing credentials or personal data.  
- ✔️ **Use HTTPS** – Ensure your application runs over HTTPS to prevent man-in-the-middle attacks.  
- ✔️ **Enable Content Security Policy (CSP)** – Restrict sources of executable scripts to mitigate XSS attacks.  

---

## 🛠 Handling Security Fixes  
- If a security vulnerability is confirmed, we will prioritize its resolution and release a patched version as soon as possible.  
- Security patches will be **backported only to supported versions** listed above.  
- If a critical issue arises, users will be notified via GitHub issues and release notes.  

---

## 🤝 Acknowledgments  
We appreciate the efforts of security researchers and developers who help keep this project secure. Thank you for your contributions!  
