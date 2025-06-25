# 📚 Virtual Bookshelf

A full-stack virtual bookshelf web application where users can explore, add, update, and delete books. Built using **Next.js** and **MongoDB**, this app features responsive UI, dark mode, and full CRUD functionality.

🔗 **Live Link:** [https://bespoke-chaja-0c4a6e.netlify.app/](https://bespoke-chaja-0c4a6e.netlify.app/)

---

## 🛠️ Tech Stack

- 🔧 Frontend: React.js (via Next.js), Tailwind CSS, Framer Motion
- ⚙️ Backend: Next.js API Routes, MongoDB (with native driver or Mongoose)
- 🔐 Auth (if used): Firebase Authentication or NextAuth (optional)
- 🌐 Deployment: Netlify / Vercel

---

## 🚀 Features

- 📖 View all books in a beautiful card layout
- ➕ Add new books with title, author, and image
- ✏️ Edit existing book details
- ❌ Delete books from your shelf
- 🌙 Dark mode support
- 📱 Fully responsive design
- 💫 Smooth animation and transitions

---

## 📦 Dependencies

- `next`
- `react`, `react-dom`
- `tailwindcss`
- `framer-motion`
- `mongodb` or `mongoose`
- (optional) `firebase`, `next-auth` if using auth

---

## 🖥️ Run Locally

To run this project on your local machine:

```bash
# 1. Clone the repository
git clone https://github.com/your-username/virtual-bookshelf.git
cd virtual-bookshelf

# 2. Install dependencies
npm install

# 3. Create a .env.local file with the following:
MONGODB_URI=your_mongodb_connection_string

# 4. Run the development server
npm run dev
