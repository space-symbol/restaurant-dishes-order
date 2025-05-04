# Restaurant Dishes Order
A modern web application for managing restaurant menus, orders, and reviews. Built with React, TypeScript, and a feature-based architecture.

## Features

- 🍽️ Menu Management
  - Create, read, update, and delete menu items
  - Categorize dishes
  - Manage prices and availability

- 🛒 Shopping Cart
  - Add/remove items
  - Real-time price updates
  - Persistent cart state

- 📝 Order Management
  - Place new orders
  - Track order status
  - View order history
  - Multiple pickup options

- ⭐ Reviews & Ratings
  - Leave reviews for dishes
  - Rate menu items
  - View aggregated ratings

- 🔐 Authentication
  - User registration
  - Secure login
  - Protected routes

## Tech Stack

- **Frontend Framework:** React 19
- **Language:** TypeScript
- **Routing:** React Router 7
- **State Management:** Zustand
- **API Client:** Axios
- **Form Handling:** React Hook Form + Zod
- **Styling:** Tailwind CSS + Material Tailwind
- **UI Components:** Radix UI
- **Testing:** Vitest + Playwright
- **Build Tool:** Vite

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
    ```bash
    # ssh
    git clone git@gitlab.com:stoleruvadim05/restaurant-dishes-order.git
    # https
    git clone https://gitlab.com/stoleruvadim05/restaurant-dishes-order.git

   cd restaurant-dishes-order
    ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

The application will be available at `http://localhost:3000`.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run test` - Run tests
- `npm run typecheck` - Type checking

## Project Structure

```
src/
├── app/              # Application entry points and routing
├── entities/         # Business entities
├── features/         # Feature modules
├── shared/           # Shared utilities and components
└── widgets/          # UI widgets
```

## API Documentation

API documentation is available in the `api/` directory:
- `api/openapi-menu-aggregate.yaml` - Main API specification
- `api/openapi-menu-items.yaml` - Menu items endpoints
- `api/openapi-menu-orders.yaml` - Orders endpoints
- `api/openapi-reviews.yaml` - Reviews endpoints

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
