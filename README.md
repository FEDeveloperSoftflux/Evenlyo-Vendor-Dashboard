# 🎨 Evenlyo Vendor Dashboard

A responsive React dashboard built with Vite and Tailwind CSS v3.4.11, following the design system specified in the style guide.

## 🚀 Features

- **React 19** with Vite for fast development
- **Tailwind CSS v3.4.11** with custom responsive breakpoints
- **Custom brand colors** and gradient system
- **Plus Jakarta Sans** font family
- **Responsive design** with mobile-first approach
- **Reusable UI components** with badge system
- **Lucide React** icons for consistent iconography
- **Recharts** for data visualization

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎨 Design System

### Brand Colors
- **Primary Gradient**: `linear-gradient(180deg, #FF295D 0%, #E31B95 48.56%, #C817AE 100%)`
- **Background**: `#FBFBFF`
- **Sidebar**: `#FFFFFF`

### Responsive Breakpoints
- **xs**: 475px
- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px
- **2xl**: 1536px

### Typography
- **Font**: Plus Jakarta Sans
- **Weights**: 400, 500, 600, 700

### Badge Status Colors
- **New**: Pink (bg-pink-100 text-pink-600)
- **Confirmed**: Green (bg-green-100 text-green-600)
- **In Progress**: Purple (bg-purple-100 text-purple-600)
- **Edit**: Yellow (bg-yellow-100 text-yellow-600)
- **Rejected**: Red (bg-red-100 text-red-600)

## 📁 Project Structure

```
src/
├── assets/
│   ├── icons/            # Custom SVGs, navigation icons
│   ├── images/           # Profile pictures or visual assets
│   └── styleguide/       # gradients.css, color maps, badges.js
├── components/
│   ├── ui/               # Reusable: Button, Card, Badge
│   ├── layout/           # Sidebar, Header, Layout wrapper
│   └── dashboard/        # StatCards, OrdersOverview, Bookings
├── pages/
│   └── Dashboard.jsx
├── styles/
│   └── tailwind.css
├── App.jsx
└── main.jsx
```

## 🧩 Components

### Badge Component
```jsx
import Badge from './components/ui/Badge';

<Badge status="new">New Order</Badge>
<Badge status="confirmed">Confirmed</Badge>
<Badge status="in-progress">In Progress</Badge>
```

## 🔧 Custom Tailwind Classes

- `.gradient-primary` - Apply primary gradient background
- `.gradient-text` - Apply gradient text effect
- `shadow-card` - Custom card shadow (0 2px 12px rgba(0, 0, 0, 0.05))

## 📱 Responsive Usage

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  {/* Responsive grid layout */}
</div>

<div className="text-sm md:text-base lg:text-lg">
  {/* Responsive typography */}
</div>
```

## 🎯 Development

The project is configured with:
- Hot module replacement (HMR)
- PostCSS with Tailwind CSS and Autoprefixer
- ES modules support
- React Fast Refresh

## 🚀 Next Steps

1. Add more UI components (Button, Card, etc.)
2. Implement the sidebar navigation
3. Create stat cards with gradient backgrounds
4. Add charts using Recharts
5. Implement the complete dashboard layout

## 📄 License

ISC License
