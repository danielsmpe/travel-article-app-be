# 🌍 Travel Article App – Backend (NestJS)

A simple backend application built with **NestJS** to manage travel-related articles and comments.

---

## 🚀 Tech Stack

- NestJS (TypeScript)
- PostgreSQL
- TypeORM
- JWT Authentication
- Docker & Docker Compose
- Swagger for API Documentation
- bcrypt for password hashing
- class-validator for input validation

---

## 🚀 Installation & Setup

```bash
# 1. Clone the repository
git clone https://github.com/your-username/travel-article-app-be.git
cd travel-article-app-be

# 2. Create environment file (.env)
# Example:
DATABASE_HOST=db
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=travel_db
JWT_SECRET=your_jwt_secret

# 3. Run using Docker Compose (Recommended)
docker-compose up --build

# --- OR ---

# (Dev only) Start the development server locally
npm install
npm run start:dev
```

---

## 📬 API Documentation

Swagger is available after running the app:

👉 [http://localhost:3000/api](http://localhost:3000/api)

---

## 🧩 List of API Endpoints

### 🔐 Authentication Endpoints

| Method | Endpoint       | Description        |
| ------ | -------------- | ------------------ |
| POST   | /auth/register | Register a user    |
| POST   | /auth/login    | Login, returns JWT |
| GET    | /auth/me       | Get current user   |

### 📄 Article Endpoints

| Method | Endpoint                 | Auth | Description               |
| ------ | ------------------------ | ---- | ------------------------- |
| GET    | /articles/public         | ✅   | List all Preview articles |
| GET    | /articles?page=1&limit=5 | ✅   | List all articles         |
| POST   | /articles                | ✅   | Create new article        |
| GET    | /articles/:id            | ✅   | Get article by ID         |
| PUT    | /articles/:id            | ✅   | Update article (author)   |
| DELETE | /articles/:id            | ✅   | Delete article (author)   |

### 💬 Comment Endpoints

| Method | Endpoint                                      | Auth | Description              |
| ------ | --------------------------------------------- | ---- | ------------------------ |
| POST   | articles/:articleId/comments                  | ✅   | Add comment to article   |
| GET    | /articles/:articleId/comments?page=1&limit=10 | ✅   | List comments of article |
| GET    | /comments/:id                                 | ✅   | Get comments by ID       |
| PATCH  | /comments/:id                                 | ✅   | Update own comment       |
| DELETE | /comments/:id                                 | ✅   | Delete own comment       |

---

## 🧪 Postman Collection

- import the Postman collection manually
  https://gist.github.com/danielsmpe/c3754f741781a636a4ab569d3ae1a665

---

## 📂 Project Structure

```
src/
├── auth/
├── users/
├── articles/
├── comments/
├── common/
├── main.ts
└── app.module.ts
```

---

## 🐳 Docker Info

Docker Compose will run the following services:

- **Backend (NestJS)** → [http://localhost:3000](http://localhost:3000)
- **PostgreSQL** → Port `5432` (internal DB service)

> Make sure local PostgreSQL is **stopped** to avoid port conflicts.

`.env` file is required for DB credentials and secrets.

---

## 📌 Notes

- Passwords are hashed with `bcrypt`
- JWT is handled using `@nestjs/jwt` and `JwtAuthGuard`
- Swagger is automatically generated
- Validation with `class-validator`
- Follows RESTful best practices
- Docker-first deployment approach
