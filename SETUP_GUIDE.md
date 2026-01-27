# Bulgarian AI Ebook Landing Page - Setup Guide

## 🎉 Your one-page ebook shop is ready!

This is a modern, professional landing page for your Bulgarian ebook "Как да превърнеш AI в реален доход" with full Stripe payment integration.

## ✨ Features Included

- **Hero Section**: Eye-catching hero with countdown timer and urgency elements
- **Dynamic Showcase**: Animated statistics showing AI market growth and ebook value
- **Pricing Comparison**: Early Bird (€12.99) vs Regular (€24.99) pricing with feature comparison
- **Testimonials**: 6 realistic Bulgarian testimonials with ratings
- **FAQ Section**: Collapsible FAQ with 10 common questions
- **Footer**: Complete footer with links and trust badges
- **Stripe Integration**: Full payment processing with success/cancel pages
- **Mobile Responsive**: Works perfectly on all device sizes
- **Smooth Animations**: Framer Motion animations throughout
- **Cyrillic Fonts**: Modern Inter and Manrope fonts with Cyrillic support

## 🚀 Quick Start

The development server is already running at: **http://localhost:3000**

Just open your browser and visit that URL to see your landing page!

## 💳 Setting Up Stripe Payments

### Step 1: Create a Stripe Account
1. Go to [https://stripe.com](https://stripe.com) and sign up (it's free)
2. Complete the account setup

### Step 2: Get Your API Keys
1. Go to [https://dashboard.stripe.com/test/apikeys](https://dashboard.stripe.com/test/apikeys)
2. Copy your **Publishable key** (starts with `pk_test_`)
3. Copy your **Secret key** (starts with `sk_test_`)

### Step 3: Add Keys to Your Project
1. Open the file [.env.local](.env.local) in the `ebook-shop` folder
2. Replace the placeholder keys with your actual keys:

```env
STRIPE_SECRET_KEY=sk_test_your_actual_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_publishable_key_here
```

3. Save the file
4. Restart the development server (stop and run `npm run dev` again)

### Step 4: Test Payments
Use these Stripe test card numbers:

- **Success**: 4242 4242 4242 4242
- **Decline**: 4000 0000 0000 0002
- Use any future expiry date (e.g., 12/34)
- Use any 3-digit CVC
- Use any valid Bulgarian postal code

## 📁 Project Structure

```
ebook-shop/
├── app/
│   ├── api/
│   │   └── create-checkout/      # Stripe checkout API
│   ├── success/                   # Payment success page
│   ├── cancel/                    # Payment cancel page
│   ├── globals.css                # Global styles & colors
│   ├── layout.tsx                 # Root layout with fonts
│   └── page.tsx                   # Main landing page
├── components/
│   ├── Hero.tsx                   # Hero section
│   ├── Showcase.tsx               # Statistics section
│   ├── Pricing.tsx                # Pricing table
│   ├── Testimonials.tsx           # Testimonials section
│   ├── FAQ.tsx                    # FAQ accordion
│   ├── Footer.tsx                 # Footer
│   ├── Button.tsx                 # Reusable button
│   ├── Card.tsx                   # Reusable card
│   ├── Section.tsx                # Section wrapper
│   ├── AnimatedText.tsx           # Animated text
│   └── AnimatedCounter.tsx        # Animated number counter
├── lib/
│   ├── stripe.ts                  # Stripe configuration
│   └── useCheckout.ts             # Checkout hook
└── .env.local                     # Environment variables
```

## 🎨 Customization Guide

### Colors
Colors are defined in [app/globals.css](app/globals.css):

```css
--cyan: #22d3ee;
--blue: #0ea5e9;
--navy: #334155;
--navy-dark: #1e293b;
```

### Content Updates

#### Hero Section ([components/Hero.tsx](components/Hero.tsx))
- Update main headline
- Change countdown time
- Modify remaining spots (currently 53)
- Edit key benefits list

#### Pricing ([components/Pricing.tsx](components/Pricing.tsx))
- Change prices (currently €12.99 / €24.99)
- Update features list
- Modify discount percentage

#### Testimonials ([components/Testimonials.tsx](components/Testimonials.tsx))
- Replace with real testimonials
- Update names, roles, and cities
- Change ratings and quotes

#### FAQ ([components/FAQ.tsx](components/FAQ.tsx))
- Add/remove questions
- Update answers
- Change support email

### Images
Currently using placeholder graphics. To add real images:

1. Place images in the `public/` folder
2. Import and use them in components:
```tsx
import Image from 'next/image';

<Image src="/your-image.png" alt="Description" width={400} height={600} />
```

## 📱 Mobile Responsiveness

The site is fully responsive with breakpoints:
- **sm**: 640px (small tablets)
- **md**: 768px (tablets)
- **lg**: 1024px (laptops)

All sections are optimized for mobile viewing with adjusted layouts and font sizes.

## 🎭 Animations

Animations are powered by Framer Motion and include:
- Fade-in on scroll reveals
- Smooth section transitions
- Counter animations for statistics
- Hover effects on cards and buttons
- Loading states for payment buttons

## 🔧 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign up
3. Import your repository
4. Add environment variables in Vercel dashboard:
   - `STRIPE_SECRET_KEY`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
5. Deploy!

Your site will be live at `your-site.vercel.app`

### For Production Stripe

1. Get your live API keys from [https://dashboard.stripe.com/apikeys](https://dashboard.stripe.com/apikeys)
2. Update the environment variables in your production environment
3. Test thoroughly with real card before going live

## ❓ Next Steps

1. **Replace Placeholder Content**:
   - Update testimonials with real ones
   - Add your actual logo or book cover
   - Customize all text to match your brand

2. **Set Up Email Delivery**:
   - Configure a service to automatically send ebook PDFs after purchase
   - Recommended: Gumroad, SendOwl, or custom webhook handler

3. **Analytics**:
   - Add Google Analytics
   - Set up Stripe webhooks for payment tracking
   - Monitor conversion rates

4. **SEO Optimization**:
   - Update metadata in [app/layout.tsx](app/layout.tsx)
   - Add Open Graph images
   - Submit sitemap to Google

5. **Legal Pages**:
   - Add Terms of Service
   - Add Privacy Policy
   - Add Refund Policy

## 💡 Tips

- The countdown timer is currently static (showing "2 days 14 hours")
- Early bird spots are set to 53 (static number)
- Update the support email in FAQ and Footer (currently placeholder)
- All prices are in EUR, change in [lib/stripe.ts](lib/stripe.ts) if needed

## 🆘 Need Help?

If you encounter any issues:
1. Check the browser console for errors
2. Verify your Stripe keys are correct
3. Make sure the dev server is running
4. Clear browser cache and restart

## 📄 License

This project is ready for commercial use for your ebook business.

---

**Built with**: Next.js 16, TypeScript, Tailwind CSS, Framer Motion, and Stripe

**Ready to launch!** 🚀
