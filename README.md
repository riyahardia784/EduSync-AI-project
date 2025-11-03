** EduSync AI **

### 📚 Overview

**EduSync** is an AI-powered web app built to help students **learn smarter**.
It allows students to **summarize lectures**, **extract key points**, and **chat with a built-in AI Mentor Bot** — all from one interactive dashboard.

---

### 🚀 **Features**

#### 🧾 1. Lecture Summarizer

* Paste or upload your lecture text.
* Get a **clear, structured summary** in seconds.
* Perfect for quick revisions or note-making.

#### 🔑 2. Key Points Extractor

* Automatically extracts **important concepts and bullet points**.
* Helps focus on what truly matters for exams and understanding.

#### 🤖 3. AI Mentor Bot

* Always available to **answer questions** and explain complex topics.
* Gives practical and encouraging guidance to help students learn better.
* Fixed right sidebar — available while working on summaries or notes.

---

### 🛠️ **Tech Stack**

| Layer              | Tools & Frameworks                          |
| ------------------ | ------------------------------------------- |
| **Frontend**       | React.js, Tailwind CSS                      |
| **Backend**        | Node.js, Express.js                         |
| **AI Integration** | Gemini API (Google Generative Language API) |
| **HTTP Requests**  | Axios                                       |
| **Styling**        | Responsive + Dark Theme                     |

---

### ⚙️ **Project Setup**

#### 1️⃣ Clone Repository

```bash
git clone  https://github.com/riyahardia784/EduSync-AI-project
cd master-student-dashboard
```

#### 2️⃣ Install Dependencies

```bash
npm install
```

#### 3️⃣ Add Environment Variable

Create a `.env` file in the root directory:

```
API_KEY=your_gemini_api_key_here
```

#### 4️⃣ Run Backend

```bash
cd backend
npm install
npx nodemon
```

#### 5️⃣ Run Frontend

```bash
cd frontend
npm install
npm run dev
```


### 🧩 **Core File: `Student.jsx`**

* Main dashboard page for students.
* Includes:

  * Text input area for lectures.
  * Buttons to generate summary and key points.
  * Toggle button for Mentor Bot.
  * Fixed right sidebar for chat (non-scrollable).

---

### 💬 **API Routes**

| Endpoint             | Method | Description                       |
| -------------------- | ------ | --------------------------------- |
| `/student/summary`   | `POST` | Generate AI-based lecture summary |
| `/student/keypoints` | `POST` | Extract bullet-point key ideas    |
| `/student/mentor`    | `POST` | Ask a question to Mentor Bot      |

---

### 🌈 **UI Highlights**

* Minimal dark UI with smooth transitions.
* Chatbot slides in from the right.
* Main section scrolls independently while chatbot remains fixed.
* Fully responsive and optimized for Chrome Extension or Web.

---

### 🧑‍🎓 **Ideal Use Case**

* Students who want quick summaries from their notes or study material.
* Learners preparing for exams and revisions.
* Anyone seeking an interactive AI study companion.

---

### 🪄 **Future Enhancements**

* Add voice input for Mentor Bot.
* Enable PDF upload for automatic summarization.
* Add concept map visualization of topics.

---

### 🧠 Built With Love ❤️ for Smarter Learning

> “Learn better. Revise faster. Grow smarter — with MASTER.”

---

