## 🚀 Getting Started

### 📋 Prerequisites
- [Node.js](https://nodejs.org/) (v14+)
- Git (optional, for cloning)
- Terminal/Command Prompt

### 🛠️ Setup Instructions
1. **Verify Node.js Installation:**
   ```bash
   node -v
2. **If Node.js is Not Installed:**
   ```bash
   You'll see an error message or no version number.
3. **Installing Node.js:**
   ```bash
   To install Node.js, visit the official Node.js Download Page[https://nodejs.org/en] and follow the instructions for your operating system.
4. **When node is installed:Clone or download the project:**
   ```bash
   git clone https://github.com/Kutullo20/BSG-DEV-2.git
5. **Navigate to project directory:**
   ```bash
   cd your-project-folder
6. **Run the server:**
   ```bash
   node server.js
7. **Access Your Site:**
   ```bash
   Open http://localhost:3000 in your browser

## 🌍 Live site
Check out the live version of the project [here](https://willowy-moonbeam-54c3d5.netlify.app/).

## 🖥️ About The Server:

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

## 🚀 Key ES6 Features Used

- ➡️ **Arrow Functions**
- 📝 **Template Literals**
- 🔒 **const and let Declarations**
- 🔍 **Object.entries()** and **Object.values()**
- ✂️ **Object Property Shorthand**

## 👀 Project Preview 
![Preview Image](PREVIEW-IMG.png)




   
