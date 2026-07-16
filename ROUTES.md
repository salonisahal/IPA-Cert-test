# test_React — Routes & Navigation

## How to run
cd /home/hewlett/projects/frontendX_backend_merged/frontend_runs/run_4b0bd1de_20260716_070347/project
npm install && npm run dev
Then open http://localhost:52575

## Routes

| Route | Page file | Description |
|-------|-----------|-------------|
| / | redirects | Redirects to the main screen |
| /home | src/pages/Home.tsx | E-commerce landing page with hero, featured, trending, and newsletter sections |
| /products | src/pages/Products.tsx | Product listing with filters, search, and pagination |
| /products/:id | src/pages/ProductDetails.tsx | Product detail view with gallery, reviews, and related products |
| /cart | src/pages/Cart.tsx | Shopping cart management and order summary |
| /checkout | src/pages/Checkout.tsx | Multi-step checkout flow with confirmation modal |
| /wishlist | src/pages/Wishlist.tsx | Saved products and quick actions |
| /orders | src/pages/Orders.tsx | Order history list |
| /orders/:id | src/pages/OrderDetail.tsx | Order detail with line items and actions |
| /profile | src/pages/Profile.tsx | User profile and settings |
| * | src/pages/NotFound.tsx | Not found screen |

## Navigation map
- Sidebar -> Home, Products, Wishlist, Cart, Orders, Profile (NavLink items)
- TopBar Cart button -> Cart
- Home -> Products (Shop collection / View all buttons)
- Home product cards -> ProductDetails
- Products list grid cards -> ProductDetails
- Products list rows -> ProductDetails
- ProductDetails -> Cart (Add to cart)
- ProductDetails -> Checkout (Buy now)
- ProductDetails -> Wishlist (Wishlist toggle)
- Cart -> Checkout (Proceed to checkout)
- Wishlist -> ProductDetails (View)
- Wishlist -> Cart (Move to cart)
- Orders -> OrderDetail (click order card)
- OrderDetail -> Orders (Back button)
- Checkout -> Orders (View orders)
- Checkout -> Home (Continue shopping)
- NotFound -> Home (Go Home)
- Any page -> NotFound (unknown URL)

## Shared components
- src/components/Sidebar.tsx — Persistent sidebar navigation
- src/components/TopBar.tsx — Header with cart shortcut and theme toggle
- src/components/Footer.tsx — Footer content for Home page
- src/components/ProductCard.tsx — Product card used across listing sections
- src/components/CategoryCard.tsx — Category tiles for Home
- src/components/TestimonialCard.tsx — Customer testimonials
- src/components/SectionHeader.tsx — Section headings with optional actions
- src/components/SearchBar.tsx — Search input with suggestions
- src/components/FilterPanel.tsx — Filter controls for products
- src/components/Pagination.tsx — Pagination controls
- src/components/Rating.tsx — Star rating display
- src/components/Badge.tsx — Badge pill for discounts
- src/components/Gallery.tsx — Product image gallery
- src/components/ReviewCard.tsx — Product review cards
- src/components/CartItemRow.tsx — Cart item controls
- src/components/OrderSummary.tsx — Pricing summary panel
- src/components/Stepper.tsx — Checkout step tracker
- src/components/EmptyState.tsx — Empty-state messaging
- src/components/SkeletonCard.tsx — Loading placeholder for product cards
- src/components/Modal.tsx — Confirmation modal
- src/components/Toast.tsx — Success notification toast
- src/components/Button.tsx — Reusable button styles

## Design tokens
- primary: #0F172A
- surface: #FFFFFF
- muted: #64748B
- accent: #F97316
- success: #22C55E
- danger: #EF4444
- warning: #F59E0B
- background: #F8FAFC
- dark-surface: #0B1220
- dark-muted: #94A3B8
