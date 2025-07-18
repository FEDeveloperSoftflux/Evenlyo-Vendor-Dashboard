# 🎨 UI Style Guide — Vendor SaaS Dashboard

This style guide defines the visual system for the Evenlyo Vendor Dashboard. Use these styles to maintain pixel-perfect consistency across all components.

---

## ✅ Primary Brand Colors

| Name         | Value                                                               |
| ------------ | ------------------------------------------------------------------- |
| Gradient     | `linear-gradient(180deg, #FF295D 0%, #E31B95 48.56%, #C817AE 100%)` |
| Primary From | `#FF295D`                                                           |
| Primary Mid  | `#E31B95`                                                           |
| Primary To   | `#C817AE`                                                           |
| Background   | `#FBFBFF`                                                           |
| Sidebar BG   | `#FFFFFF`                                                           |

---

## 🖼️ Typography

- **Font**: Plus Jakarta Sans, sans-serif
- **Weights**: 400, 500, 600
- **Sizes**:
  - Headings: `text-2xl` to `text-4xl`
  - Body: `text-sm`, `text-base`
  - Captions: `text-xs`

---

## 📦 Layout System

- **Spacing**: Tailwind scale (`p-4`, `gap-6`, `mt-10`, etc.)
- **Rounded Corners**: `rounded-2xl` for cards and components
- **Shadow**: `shadow-md`, `shadow-card` (custom: `0 2px 12px rgba(0, 0, 0, 0.05)`)

---

## 🧩 Component Guidelines

### 📊 Stat Cards

- 4 Cards: “All Clients”, “Total Items” (highlighted), “Complete Bookings”, “Monthly Revenue”
- Highlighted card has a **gradient background** and **white text**

### 🗂️ Sidebar Navigation

- Left-aligned vertical bar
- Active link: Gradient background
- Icons via `lucide-react`
- Text: `text-sm font-medium`

### 📈 Charts

- Line chart using `recharts`
- Custom color for line: primary gradient

### 🏷️ Badges

| Status      | Colors                          |
| ----------- | ------------------------------- |
| New         | `bg-pink-100 text-pink-600`     |
| Confirmed   | `bg-green-100 text-green-600`   |
| In Progress | `bg-purple-100 text-purple-600` |
| Edit        | `bg-yellow-100 text-yellow-600` |
| Rejected    | `bg-red-100 text-red-600`       |

---

## 📁 Folder Structure

```bash
src/
│
├── assets/
│   ├── icons/            # Custom SVGs, navigation icons
│   ├── images/           # Profile pictures or visual assets
│   └── styleguide/       # gradients.css, color maps, badges.js
│
├── components/
│   ├── ui/               # Reusable: Button, Card, Badge
│   ├── layout/           # Sidebar, Header, Layout wrapper
│   └── dashboard/        # StatCards, OrdersOverview, Bookings
│
├── pages/
│   └── Dashboard.jsx
│
├── styles/
│   └── tailwind.css
│
├── App.jsx
└── main.jsx
```
