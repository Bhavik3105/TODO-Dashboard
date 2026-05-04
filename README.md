# Personal Dashboard

A complete Personal Dashboard web application built with modern web architecture.

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Auth**: NextAuth.js v5 with Credentials Provider
- **Database**: MongoDB Atlas (cloud) with Mongoose ODM
- **Styling**: Tailwind CSS
- **Password hashing**: bcryptjs
- **Language**: TypeScript

## Getting Started

### 1. Set up MongoDB Atlas
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) and create an account or sign in.
2. Build a new cluster (the free tier works fine).
3. Under "Database Access", create a new database user with a username and password.
4. Under "Network Access", add `0.0.0.0/0` (allow access from anywhere) or your current IP.
5. Click "Connect" -> "Connect your application" and copy the connection string. Replace `<password>` with your user's password.

### 2. Environment Variables
Copy the example environment file:
```bash
cp .env.local.example .env.local
```
Update `.env.local` with your variables:
- `MONGODB_URI`: Your MongoDB connection string.
- `NEXTAUTH_SECRET`: Generate a random secret using `openssl rand -base64 32` or similar.
- `NEXTAUTH_URL`: `http://localhost:3000` (for local development).

### 3. Run Locally
Install dependencies:
```bash
npm install
```

Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to Vercel
1. Push your code to a GitHub repository.
2. Go to [Vercel](https://vercel.com/) and import the project.
3. In the project settings during setup, add the Environment Variables:
   - `MONGODB_URI`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` (usually not required on Vercel as it automatically handles the domain, but `NEXTAUTH_SECRET` is mandatory).
4. Click Deploy.

## Folder Structure
- `app/`: Next.js App Router containing pages, layouts, and API routes.
  - `(auth)/`: Group for login and signup pages.
  - `(dashboard)/`: Group for protected dashboard layout and page.
  - `api/`: Backend endpoints for NextAuth and Task CRUD operations.
- `components/`: Reusable UI components (TaskCard, TaskForm, Navbar).
- `lib/`: Utility functions and Database models.
  - `models/`: Mongoose schemas for User and Task.
- `middleware.ts`: NextAuth middleware to protect routes.
