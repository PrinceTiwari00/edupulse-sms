# EduPulse - Multi-Tenant School Management System (SaaS)

EduPulse is a comprehensive, multi-tenant School Management System built with the latest **Next.js 14 App Router**, **TypeScript**, **Tailwind CSS**, **Shadcn UI**, and **Prisma ORM**.

## 🚀 Features

- **Multi-Tenancy:** Strict data isolation between schools using `schoolId` and subdomain-based routing.
- **Role-Based Access Control (RBAC):** Distinct dashboards for Super Admin, School Admin, Teacher, Student, Parent, and Accountant.
- **Academic Management:** Class, Section, and Subject configuration with automated mapping.
- **Student & Staff Records:** Digital admission forms, profile management, and bulk import via CSV/Excel.
- **Financial Module:** Fee item setup, bulk invoice generation, manual billing, and payment receipts.
- **Examination Suite:** Mark distribution (Theory/Practical), exam scheduling, and printable official report cards.
- **Communication:** School-wide notice board with priority-based announcements.

## 🛠 Tech Stack

- **Framework:** [Next.js 14 (App Router)](https://nextjs.org/)
- **ORM:** [Prisma](https://www.prisma.io/)
- **Database:** PostgreSQL
- **Auth:** [NextAuth.js](https://next-auth.js.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) + [Shadcn UI](https://ui.shadcn.com/)
- **Icons:** [Lucide React](https://lucide.dev/)

## 🏁 Getting Started

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd edupulse-sms
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/edupulse?schema=public"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

### 4. Database Sync
```bash
npx prisma generate
npx prisma db push
```

### 5. Run Development Server
```bash
npm run dev
```

## ☁️ AWS Deployment

This project includes an AWS SAM template and Docker configuration for deployment to **AWS App Runner** and **RDS (PostgreSQL)**.

### 1. Build & Push Docker Image to ECR
```bash
aws ecr get-login-password --region eu-north-1 | docker login --username AWS --password-stdin <AWS_ACCOUNT_ID>.dkr.ecr.eu-north-1.amazonaws.com
docker build -t edupulse-sms .
docker tag edupulse-sms:latest <AWS_ACCOUNT_ID>.dkr.ecr.eu-north-1.amazonaws.com/edupulse-sms:latest
docker push <AWS_ACCOUNT_ID>.dkr.ecr.eu-north-1.amazonaws.com/edupulse-sms:latest
```

### 2. Deploy using SAM
```bash
sam deploy --guided
```
Provide the `DBPassword`, `NextAuthSecret`, and ensure the region is set to `eu-north-1`.

## 📄 License
This project is licensed under the MIT License.
