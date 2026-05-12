# GlowDrop

GlowDrop is a custom Next.js ecommerce site for a premium large-candle brand. It uses a moody editorial storefront, persistent cart state, account pages, admin screens, Prisma models, Stripe payment routes, Resend transactional email hooks, and Cloudinary-ready product imagery.

## Tech Stack

- Next.js 14 App Router with TypeScript
- Tailwind CSS with CSS variables and custom animation styles
- PostgreSQL through Prisma ORM
- NextAuth.js with credentials and Google OAuth
- Stripe PaymentIntents and webhook route
- Resend email client
- Cloudinary SDK
- Zustand cart state persisted to localStorage
- Framer Motion page transitions
- Google fonts through `next/font`

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Copy the environment template:

```bash
cp .env.example .env
```

3. Fill in `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, Stripe, Google, Resend, and Cloudinary values.

4. Generate Prisma and migrate the database:

```bash
npm run prisma:generate
npm run prisma:migrate
```

5. Seed the store:

```bash
npm run db:seed
```

6. Start the app:

```bash
npm run dev
```

The site runs at `http://localhost:3000`.

## Environment Variables

- `DATABASE_URL`: PostgreSQL connection string.
- `NEXTAUTH_SECRET`: Secret used to sign auth tokens.
- `NEXTAUTH_URL`: Local or deployed app URL.
- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`: Google OAuth credentials.
- `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET`: Stripe payment and webhook credentials.
- `CLOUDINARY_*`: Cloudinary credentials for product media.
- `RESEND_API_KEY`, `RESEND_FROM_EMAIL`: Transactional email settings.
- `NEXT_PUBLIC_SITE_URL`: Public app origin.
- `ADMIN_EMAIL`: Default admin email.

## Stripe Webhooks

Install the Stripe CLI, then forward webhooks locally:

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Set the printed signing secret as `STRIPE_WEBHOOK_SECRET`.

## Deployment

1. Create a Vercel project from this repository.
2. Add the same environment variables in Vercel.
3. Provision PostgreSQL and run the Prisma migration.
4. Add the deployed webhook URL in Stripe: `/api/webhooks/stripe`.
5. Deploy. The included `vercel.json` runs `prisma generate` before `next build`.

## Admin Access

The seed creates:

- Email: `admin@glowdrop.com`
- Password: `changeme123`

Change this password immediately after the first login.
