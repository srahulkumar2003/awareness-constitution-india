# Free Deployment Guide

## 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial constitution awareness project"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

## 2. Database

Create a free MySQL database using Aiven, Railway, Clever Cloud or any free MySQL provider.

Save these values:

```txt
DB_URL
DB_USERNAME
DB_PASSWORD
```

Use JDBC format for Spring Boot:

```txt
jdbc:mysql://HOST:PORT/DATABASE_NAME?useSSL=true&allowPublicKeyRetrieval=true&serverTimezone=UTC
```

## 3. Render backend

Create new Web Service from GitHub.

Root directory:

```txt
backend
```

Build command:

```txt
mvn clean package -DskipTests
```

Start command:

```txt
java -jar target/awareness-1.0.0.jar
```

Environment variables:

```txt
DB_URL=your_jdbc_mysql_url
DB_USERNAME=your_user
DB_PASSWORD=your_password
GEMINI_API_KEY=your_gemini_key
GEMINI_MODEL=gemini-2.5-flash
CORS_ALLOWED_ORIGINS=https://your-netlify-site.netlify.app
```

## 4. Netlify frontend

Create new site from GitHub.

Base directory:

```txt
frontend
```

Build command:

```txt
npm run build
```

Publish directory:

```txt
frontend/dist
```

Environment variable:

```txt
VITE_API_URL=https://your-render-backend.onrender.com/api
```

## 5. Test live links

```txt
https://your-render-backend.onrender.com/api/health
https://your-netlify-site.netlify.app
```
