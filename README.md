<<<<<<< HEAD
# Awareness on Constitution of India

Interactive Constitution learning platform with intro video, animated Indian civic UI, Constitution Explorer, survey dashboard, quiz and Gemini AI guide.

## Main features

1. Intro video before website opens
2. Logo-based premium navy and gold UI
3. Animated Indian flag, Ashoka Chakra and parchment-style background
4. Interactive Constitution Explorer
5. Survey and Public Opinion Dashboard
6. Ask Constitution AI using Gemini API through Spring Boot backend
7. Quiz and awareness score
8. Spring Boot + MySQL APIs
9. Docker setup

## Project structure

```txt
awareness-constitution-india/
├── frontend/   React + Vite website
├── backend/    Spring Boot REST API
└── docker-compose.yml
```

## Run frontend only

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Open:

```txt
http://localhost:5173
```

## Run backend locally

Create MySQL database:

```sql
CREATE DATABASE constitution_db;
```

Set environment variables in PowerShell:

```powershell
$env:DB_URL="jdbc:mysql://localhost:3306/constitution_db?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC"
$env:DB_USERNAME="root"
$env:DB_PASSWORD="your_mysql_password"
$env:GEMINI_API_KEY="your_gemini_api_key"
$env:GEMINI_MODEL="gemini-2.5-flash"
```

Run backend:

```bash
cd backend
mvn spring-boot:run
```

Test:

```txt
http://localhost:8080/api/health
http://localhost:8080/api/topics
http://localhost:8080/api/survey/questions
```

## Run full project using Docker

Create a `.env` file in root folder:

```txt
GEMINI_API_KEY=your_gemini_api_key
```

Run:

```bash
docker compose up --build
```

Open:

```txt
Frontend: http://localhost:8081
Backend:  http://localhost:8080/api/health
MySQL:    localhost:3306
```

## Connect React to Spring Boot

Frontend uses:

```txt
frontend/.env
VITE_API_URL=http://localhost:8080/api
```

After deployment, replace it with your Render backend URL:

```txt
VITE_API_URL=https://your-backend-name.onrender.com/api
```

## Gemini API connection

Never place the Gemini API key in React. Keep it in Spring Boot environment variables only:

```txt
GEMINI_API_KEY=your_key_here
```

Frontend calls:

```txt
POST /api/ai/ask
```

Spring Boot calls Gemini securely.

## Free deployment path

Use this instead of AWS for now:

```txt
Frontend: Netlify
Backend: Render
Database: Aiven MySQL / Railway MySQL / Clever Cloud MySQL
```

AWS can be written as future scope:

```txt
EC2 for backend, RDS for MySQL, S3 for media, CloudFront for CDN
```

## Suggested build order

1. Run frontend only and check UI
2. Run backend locally and check `/api/health`
3. Start MySQL
4. Connect frontend `.env` to backend
5. Test Explorer topics
6. Test survey submit
7. Test dashboard
8. Add Gemini API key
9. Test Ask AI
10. Deploy frontend and backend
=======
# awareness-constitution-india
Civic learning platform teaching rights, duties, democracy and governance through interactive modules, surveys, dashboards and visual storytelling. Includes explorer pages, survey flows, campaigns and analytics dashboards. Built with React, Spring Boot, MySQL, JWT-secured REST APIs and Chart.js for scalable, insight-driven architecture.
>>>>>>> 5347986f9dcebb7cad6616f1add1546780575970
