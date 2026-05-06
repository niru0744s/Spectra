# Spectra – Clean Beauty E-Commerce Store

A highly minimalist, performant Next.js + Tailwind CSS e-commerce storefront designed for the modern skincare and clean beauty niche. Spectra features a fully functional client-side persistent shopping cart, a wishlist system, and a robust User Dashboard—all built without needing an immediate backend database during the MVP phase.

## ✨ Core Features

- **Hyper-Minimalist UI**: Built with Tailwind CSS v4, utilizing a glassmorphic and elegant design system specific to the cosmetics niche.
- **Client-Side Data Persistence**: 
  - **Cart Context**: Add, update, and remove items with real-time total calculations, persisted to `localStorage`.
  - **Wishlist Context**: Save favorite products with a clickable heart icon, persisted across browser reloads.
  - **Product Context (Admin CRUD)**: Manage the storefront inventory directly from the browser without a database.
- **Global Toast Notifications**: Integrated `react-hot-toast` for beautiful, responsive alerts upon any user action (adding to cart, favoriting, checkout).
- **Demo Checkout Flow**: A complete, multi-step checkout form with mock processing, culminating in a successful order confirmation page.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to view the storefront.

## 🛠 Project Structure

- `app/` - Next.js App Router pages (Home, Shop, Cart, Checkout, Admin, FAQ)
- `components/store/` - UI components (Navbar, Product Cards, Context Providers)
- `lib/mock-data.ts` - Initial dataset of skincare and beauty products

## ⚙️ How State Management Works

Instead of relying on heavy external state managers (like Redux), Spectra relies on **React Context** combined with custom hooks and `localStorage`.

1. **`CartProvider`**: Manages `mirrorcart_cart`. Exposes functions like `addToCart`, `removeFromCart`, `clearCart`.
2. **`WishlistProvider`**: Manages `mirrorcart_wishlist`. Toggles product IDs to keep track of user favorites.
3. **`ProductProvider`**: Manages `mirrorcart_products`. Powers the `/admin` dashboard allowing you to test full CRUD capabilities locally.

## 👨‍💻 Admin Dashboard

Navigate to `http://localhost:3000/admin` to access the inventory management system. From here, you can:
- Add new skincare products.
- Edit existing prices, titles, and image URLs.
- Delete outdated inventory.
*(All changes are immediately reflected on the live storefront via Context).*

## 🔮 Future Roadmap

- **Database Integration**: Migrate `localStorage` architecture to PostgreSQL/Supabase for cross-device authentication and centralized inventory management.
- **AI Personalization**: Add an interactive quiz that recommends a skincare routine based on user skin type.
- **Payment Gateway**: Replace the mock checkout flow with Stripe integration.

## 📄 License

This project is part of the Spectra e-commerce platform.
