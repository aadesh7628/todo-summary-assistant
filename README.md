# 📝 Todo Summary Assistant

A full-stack productivity tool that helps you manage your daily tasks and generate AI-powered summaries of pending todos, which are automatically shared to your Slack workspace for team visibility.

---

## 📁 Project Structure

```
.
├── backend/
│   ├── routes/
│   │   └── task_routes.js
│   ├── services/
│   │   └── summarize.js
│   ├── server.js
│   └── .env.example
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       │   └── TodoItem.jsx
│       └── App.js
├── README.md
```

---

## ✨ Setup Instructions

### 1. Clone the Repository

```bash
https://github.com/aadesh7628/todo-summary-assistant.git
cd todo-summary-assistant
```

### 2. Setup Backend

```bash
cd backend
npm install
cp .env.example .env
# Fill in SUPABASE_URL, SUPABASE_KEY, COHERE_API_KEY, SLACK_WEBHOOK_URL in the .env file
npm start
```

The server will start on [http://localhost:4000](http://localhost:4000)

### 3. Setup Frontend

```bash
cd ../frontend
npm install
npm start
```

The app will be available at [http://localhost:3000](http://localhost:3000)

---

## 🧐 Supabase Integration Steps

1. Go to [https://supabase.com/](https://supabase.com/) and sign up.
2. Create a new project.
3. Navigate to the SQL Editor and run the following to create the `todos` table:

```sql
create table todos (
    id serial primary key,
    task text not null,
    status text not null default 'pending',
    created_at timestamp with time zone default timezone('utc'::text, now())
);
```

4. Go to the "Project Settings" > "API" section and copy:

   * **SUPABASE\_URL**
   * **SUPABASE\_KEY (anon key)**
5. Paste them into the `.env` file:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-key
```

---

## 🧐 LLM Integration with Cohere

1. Go to [https://cohere.ai/](https://cohere.ai/) and sign up.
2. Navigate to API Keys and generate a new one.
3. Paste the API key into your `.env`:

```env
COHERE_API_KEY=your_cohere_api_key
```

---

## 📆 Slack Webhook Integration

1. Go to [Slack Incoming Webhooks](https://api.slack.com/messaging/webhooks)
2. Click "Create a Webhook"
3. Choose a channel (e.g., #todo-summary)
4. Copy the Webhook URL
5. Paste it into your `.env`:

```env
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...
```

Now whenever `/summarize` is triggered via the UI, a summary of pending tasks is posted to Slack automatically.

---

## 🚚 Architecture & Design Decisions

### 🖼️ Frontend (React)

* Modular design with `TodoItem.jsx`
* Axios calls to backend endpoints
* Summarize button triggers Slack summary flow

### ⚙️ Backend (Node.js + Express)

* REST API with routes under `task_routes.js`
* Middleware enabled for CORS and JSON parsing
* Summarization logic abstracted in `summarize.js`

### 🔹 Database (Supabase)

* Table: `todos` with fields: id, task, status, created\_at
* Supports CRUD operations + filtering by `status`

### 🤖 LLM + Slack Flow

1. `GET /todos`: Fetch tasks
2. `POST /summarize`: Filter pending tasks, summarize with Cohere, send to Slack

---

## 🔐 .env Configuration

Create a `.env` in the `backend/` directory with:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
COHERE_API_KEY=your_cohere_api_key
SLACK_WEBHOOK_URL=your_slack_webhook_url
PORT=4000
```

---
