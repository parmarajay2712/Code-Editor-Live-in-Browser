# 🔥 **Web Code Editor – Live HTML/CSS/JS Playground**

A fully interactive, browser‑based **HTML/CSS/JavaScript code editor** built with **Ace Editor**, featuring live preview, test runner, project export/import, console logs, and a clean dark UI inspired by professional developer tools.

This project mimics the functionality of modern online editors like **CodePen**, **JSFiddle**, and **PlayCode**—but lightweight and designed to run entirely in the browser.

---

## 🚀 **Features**

### 🎨 **Beautiful Modern UI**

* Dark gradient theme
* Smooth glass‑morphism card panels
* Clean typography & spacing system
* Multi‑pane responsive layout

### ✍️ **Tri‑Editor Setup (HTML / CSS / JS)**

* Powered by **Ace Editor**
* Syntax highlighting
* Auto wrap, tab-size control
* Keyboard shortcuts:

  * **Ctrl + Enter** → Run
  * **Ctrl + S** → Save

### ⚡ **Live Preview Renderer**

* Updates instantly inside an iframe
* Open preview in a new window

### 🧪 **Built‑in Testing Pane**

* Write JavaScript tests
* Run with **Run Tests** button

### 📦 **Project Save & Load**

* Save as `.json` file
* Auto‑saves last session using `localStorage`
* Load project JSON anytime

### 📝 **Console Output Panel**

* Logs info, warnings, and errors
* Automatic timestamp with colored indicators

---

## 📁 **Project Structure**

```
📦 Web Code Editor
├── index.html
├── style.css
└── script.js
```

---

## 🖼️ **Screenshots**

### Home Page

![Home Page](assets/screenshots/Screenshot%201.png)

### Editor Page

![Editor UI](assets/screenshots/Screenshot%202.png)

### 🌆 **Editor UI**

![Editor Screenshot](assets/screenshots/Screenshot%203.png)

### 🪟 **Live Preview Example**

![Preview Screenshot](assets/screenshots/Screenshot%204.png)

---

## 🎥 **Demo Video (Placeholder)**

📹 **Demo Video:**
[Click to watch the demo](https://drive.google.com/file/d/1er-01VxeJUBj_WqJLHrvoXYVvssEKFz5/view?usp=drivesdk)

---

## 🛠️ **Tech Stack**

* **HTML5**
* **CSS3** (Modern gradients, utility classes, responsive design)
* **JavaScript** (DOM, iframe manipulation, Ace Editor API)
* **Ace Editor** for code editing
* No backend required

---

## ⚙️ **How It Works**

### 🔄 Rendering Logic

The project builds a full HTML document and injects:

* User HTML
* User CSS
* User JavaScript
* Optional test code

Then it renders into:

```js
iframe.srcdoc = buildwebSrcdoc();
```

### 🧠 Saving Logic

The editor stores:

```json
{
  "html": "...",
  "css": "...",
  "javascript": "...",
  "Assignment": "...",
  "test": "..."
}
```

Into localStorage + JSON export.

### 🧪 Test Runner

Appends test code when user runs **Run Tests**.

---

## 🧩 **Keyboard Shortcuts**

| Shortcut               | Action             |
| ---------------------- | ------------------ |
| **Ctrl + Enter**       | Run Preview        |
| **Ctrl + S**           | Save project       |
| **Arrow Keys (← / →)** | Switch editor tabs |

---

## 🚀 **How to Use**

1. Open `index.html` in a browser.
2. Type HTML, CSS, or JavaScript in the editors.
3. Click **Run** or press **Ctrl + Enter**.
4. See real‑time output in Preview.
5. Add tests (optional).
6. Export project as JSON.
7. Reload anytime.

---

## 🧑‍💻 **Developer Notes**

* Uses Ace Editor with custom configuration
* Fully client‑side
* Safe HTML escaping for output logs
* Responsive design for all screen sizes

---

## ⭐ **Contributions**

Feel free to submit:

* Bug fixes
* UI improvements
* New feature requests

---

## Future Work (Planned Enhancements)

Here are some improvements planned for upcoming versions of this project:

🔧 Resizable Panels (drag to resize HTML/CSS/JS editors)

🎛️ Custom Themes (Light, Dark, Dracula, One Dark Pro, Monokai)

💾 Cloud Project Sync (GitHub Gists / Firebase)

🧩 Plugin System for adding extensions (formatters, linters, prettifier)

📱 Mobile-Friendly Editor Layout

👨‍🏫 Built-In Tutorials Section for HTML/CSS/JS basics

🔍 In-Editor Search & Replace

🚀 AI Code Assistant (auto-fix errors, suggest code)

🛠️ Integrated Prettier Formatting (HTML/CSS/JS beautifier)

## 👨‍💻 Author

**Parmar Ajay**
Frontend Developer | Loves building beautiful UI, clean code editors, and learning new technologies.

## 📜 **License**

MIT License — free to use, modify, and distribute.

---

## ❤️ **Made with passion for clean UI & smooth developer experience.**

---

## 🤝 **Support**

If you like this project, consider:

* ⭐️ **Star** this repository
* 🌟 **Fork** it for your own projects
* 💬 **Leave a comment** with feedback or suggestions
* 📢 **Share** it with your friends and colleagues

---

## 📝 **Contact**

For any questions or feedback, please reach out to:

* **Email:** [parmarajay5664@gmail.com@gmail.com](parmarajay5664@gmail.com)
* **LinkedIn:** [Parmar Ajay](https://www.linkedin.com/in/parmar-ajay2712/)

---
