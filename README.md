# POS System

A comprehensive Point of Sale (POS) system built with modern web technologies. This system allows users to manage inventory, create invoices, and perform essential product management tasks such as adding, updating, and deleting products.

## Features

- **Product Management**: Add, update, and delete products.
- **Inventory Management**: Keep track of stock levels and product details.
- **Invoice Creation**: Generate and manage sales invoices.
- **Real-time Data**: Sync data seamlessly using Firebase for real-time updates.

## Technologies Used

- **Vite**: For fast and efficient development.
- **React (TypeScript)**: To build a scalable and maintainable UI.
- **Firebase**: For authentication, Firestore database, and cloud storage.
  

## Prerequisites

Before starting, ensure you have the following installed:

- **Node.js**: [Download here](https://nodejs.org/)
- **Firebase Account**: [Create an account](https://firebase.google.com/) and set up a project.

## Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/pos-system.git
   cd pos-system
   ```
2. **Install dependencies**:
 ```bash
npm install
 ```
3. **Create a .env file in the root directory and add the following environment variables**:
 ```bash
VITE_API_KEY=your-firebase-api-key
VITE_AUTH_DOMAIN=your-auth-domain
VITE_PROJECT_ID=your-project-id
VITE_STORAGE_BUCKET=your-storage-bucket
VITE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_APP_ID=your-app-id
 ```
Replace the placeholders with your Firebase configuration values, which you can find in your Firebase project's settings.

4. **Start the development server**:
```bash
npm run dev
```

5. **Build for production**:

```bash
npm run build
Preview the production build:
```

