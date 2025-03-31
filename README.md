## 🚀 Getting Started

### 📋 Prerequisites
- [Node.js](https://nodejs.org/) (v14+)
- Git (optional, for cloning)
- Terminal/Command Prompt

### 🛠️ Setup Instructions
1. **Verify Node.js Installation**
   ```bash
   node -v
2. **Clone or download the project:**
   ```bash
   git clone https://github.com/Kutullo20/BSG-DEV-2.git
3. **Navigate to project directory:**
   ```bash
   cd your-project-folder
4. **Run the server:**
   ```bash
   node server.js
5. **Access Your Site:**
   ```bash
   Open http://localhost:3000 in your browser

## 🌟 About The Server:

This project uses  lightweight Node.js HTTP server that ⚡ asynchronously serves static files (📄 HTML, 🎨 CSS, 🤖 JS) with love!

**🚀 Features:**
- 🌐 **Auto-detects file types** (text/html, application/javascript, text/css)
- 🚫 **No dependencies** (pure Node.js)
- ⏳ **Non-blocking I/O** (thanks to async/await)
- ❤️ **Graceful 404 errors** (Missing files return a 404 without crashing the server)

## 🔄 Asynchronization
- 🔄 The server in this project uses async/await for non-blocking I/O, ensuring efficient handling of file operations. 
- 📩 While waiting for fs.readFile() to complete (e.g., loading index.html), the server remains responsive and can process other incoming requests.
- 📂 No Database: Relies on local file storage (static files like HTML/CSS/JS).

## 🚀 ES6 Features

- ➡️ **Arrow Functions**
- 📝 **Template Literals**
- 🔒 **const and let Declarations**
- 🔍 **Object.entries()** and **Object.values()**
- ✂️ **Object Property Shorthand**



   
