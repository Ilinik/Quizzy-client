# 📚 Quizzy

A lightweight and fast quiz platform built with React and Vite. Create custom quizzes, add questions with multiple answer options, and test your knowledge instantly.

## ✨ Features

- **Create Quizzes** – Build custom quizzes with titles, descriptions, and difficulty levels
- **Add Questions** – Create questions with multiple answer options and mark correct answers
- **Take Quizzes** – Play quizzes and get instant results with score display
- **User Authentication** – Register and login to manage your quizzes
- **My Quizzes** – View and manage quizzes you've created
- **Browse Quizzes** – Discover and take quizzes created by other users
- **Responsive Design** – Clean and modern UI that works on different screen sizes

## 🛠️ Tech Stack

- **Frontend Framework:** React 19
- **Build Tool:** Vite
- **State Management:** MobX
- **Routing:** React Router v7
- **Styling:** SCSS/Sass
- **HTTP Client:** Axios
- **Form Handling:** React Hook Form + Zod validation
- **Icons:** Lucide React

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/acoji-luo/quiz-webapp.git
cd quiz-webapp
```

### 2. Install dependencies

```bash
yarn install
# or
npm install
```

### 3. Environment variables

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Then update the `.env` file with your API URL:

```env
VITE_API_URL=http://localhost:5000
```

### 4. Run in development mode

```bash
yarn dev
# or
npm run dev
```

The application will be available at `http://localhost:5173`

## 🚀 Build for Production

```bash
yarn build
# or
npm run build
```

## 🧹 Linting

```bash
yarn lint
# or
npm run lint
```

## 📁 Project Structure

```
src/
├── components/
│   ├── commons/       # Reusable UI components (Button, Input, Loader, etc.)
│   ├── icons/         # Custom SVG icons
│   ├── layouts/       # Layout components (Header, Sidebar, Footer, etc.)
│   └── providers/     # Context providers
├── config/            # Configuration files (links)
├── constants/         # Constants (colors, icons)
├── helpers/           # Helper functions
├── hooks/             # Custom React hooks
├── http/              # HTTP client configuration
├── pages/             # Page components
├── routing/           # Route configuration and guards
├── App.jsx            # Main application component
└── main.jsx           # Application entry point
```

## 🔑 Available Scripts

| Command | Description |
|---------|-------------|
| `yarn dev` | Start development server |
| `yarn build` | Build for production |
| `yarn preview` | Preview production build locally |
| `yarn lint` | Run ESLint |

## 🌐 API Integration

This frontend application requires a backend API. Make sure to set the `VITE_API_URL` environment variable to point to your API server.

## 📄 License

This project is licensed under the MIT License.
