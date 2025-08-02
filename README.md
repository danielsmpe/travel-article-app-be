# 🌍 Travel Article App – Backend (NestJS)

A simple backend application built with **NestJS** to manage travel-related articles and comments.

---

## ⚙️ Tech Stack

- **Framework:** NestJS
- **Database:** PostgreSQL
- **ORM:** TypeORM
- **Authentication:** JWT (Bearer Token)
- **API Documentation:** Swagger (OpenAPI)

---

## 🚀 Installation & Setup

```bash
# 1. Clone the repository
git clone https://github.com/your-username/travel-article-app.git
cd travel-article-app

# 2. Install dependencies
npm install

# 3. Create environment file
cat > .env <<EOF
DATABASE_URL=postgresql://user:password@localhost:5432/your_database
JWT_SECRET=your_jwt_secret_key
EOF

# 4. Start the development server
npm run start:dev
```

## 📬 Swagger API Docs

After running the app, access Swagger at:

```
http://localhost:3000/api
```

## 🧩 List of API Endpoints

### 🔑 Auth

POST /auth/login → Login user

POST /users/register → Register a new user

GET /users/me → Get current user's profile (requires token)

### 📝 Articles

GET /articles → Get all articles

GET /articles/:id → Get single article by ID

POST /articles → Create a new article

PUT /articles/:id → Update an article

DELETE /articles/:id → Delete an article

### 💬 Comments

GET /articles/:articleId/comments → Get comments for an article

POST /articles/:articleId/comments → Add comment to an article

GET /comments/:id → Get a single comment by ID

PATCH /comments/:id → Update a comment

DELETE /comments/:id → Delete a comment
