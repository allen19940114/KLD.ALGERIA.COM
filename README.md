# KLD Algeria Official Website

昆仑数智阿尔及利亚官方网站 - Kunlun Digital Technology Algeria Official Website

## Tech Stack

- **Frontend**: Next.js 14 + TypeScript + Tailwind CSS
- **Backend**: Next.js API Routes + Prisma
- **Database**: PostgreSQL
- **Authentication**: NextAuth.js
- **Internationalization**: next-intl (Arabic, French, English, Chinese)
- **CMS**: Custom Admin Panel

## Features

- Multi-language support (AR, FR, EN, ZH) with RTL support
- Responsive design for all devices
- Admin panel for content management
- News and articles management
- Products and services showcase
- Project case studies
- Contact form with message management
- Media library
- SEO optimized

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-org/KLD.ALGERIA.COM.git
cd KLD.ALGERIA.COM
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your database credentials
```

4. Set up the database:
```bash
npm run db:push
npm run db:seed
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Admin Panel

Access the admin panel at `/admin/login`

Default credentials (change in production):
- Email: admin@kld-algeria.com
- Password: admin123456

## Project Structure

```
src/
├── app/
│   ├── [locale]/          # Internationalized routes
│   │   ├── (main)/        # Public pages
│   │   └── admin/         # Admin panel
│   └── api/               # API routes
├── components/
│   ├── ui/                # Reusable UI components
│   ├── layout/            # Layout components
│   └── admin/             # Admin components
├── lib/                   # Utilities and configurations
├── messages/              # Translation files
├── hooks/                 # Custom React hooks
└── types/                 # TypeScript types
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:push` - Push Prisma schema to database
- `npm run db:seed` - Seed the database
- `npm run db:studio` - Open Prisma Studio

## Deployment

The project can be deployed on Vercel, AWS, or any platform supporting Next.js.

## License

Proprietary - KLD Algeria
