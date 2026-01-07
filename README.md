# 🍔 Food Ordering App

A modern, full-featured food ordering mobile application built with React Native and Expo. This app provides a seamless experience for browsing menus, customizing orders, and processing payments with integrated Stripe payment gateway.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React Native](https://img.shields.io/badge/React%20Native-0.81.5-61dafb.svg)
![Expo](https://img.shields.io/badge/Expo-~54.0.30-000020.svg)
![License](https://img.shields.io/badge/license-Private-red.svg)

## ✨ Features

### 🛍️ Core Functionality
- **User Authentication** - Secure sign-up and sign-in with Appwrite backend
- **Menu Browsing** - Browse food items by categories with beautiful card layouts
- **Advanced Search** - Search for food items with real-time filtering
- **Item Customization** - Add toppings, sides, and other customizations to orders
- **Shopping Cart** - Full-featured cart with quantity management and customization tracking
- **Payment Integration** - Secure payments powered by Stripe
- **User Profile** - View and manage user account information

### 🎨 UI/UX Features
- **Modern Design** - Clean, intuitive interface with NativeWind (Tailwind CSS)
- **Dark Mode Support** - Automatic theme switching based on system preferences
- **Smooth Animations** - Powered by React Native Reanimated
- **Responsive Layout** - Optimized for various screen sizes
- **Tab Navigation** - Easy navigation with bottom tab bar

### 🔧 Technical Features
- **TypeScript** - Full type safety throughout the application
- **State Management** - Zustand for efficient global state management
- **Error Tracking** - Sentry integration for production monitoring
- **File-based Routing** - Expo Router for intuitive navigation structure
- **Optimized Images** - Expo Image for fast, cached image loading
- **Haptic Feedback** - Enhanced user interaction with haptic responses

## 📱 Screenshots

> Add your app screenshots here

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development) or Android Studio (for Android development)
- Expo Go app (for testing on physical devices)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd foodApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory with the following variables:
   ```env
   # Appwrite Configuration
   APPWRITE_ENDPOINT=your_appwrite_endpoint
   APPWRITE_PROJECT_ID=your_project_id
   APPWRITE_DATABASE_ID=your_database_id
   APPWRITE_COLLECTION_ID=your_collection_id
   
   # Stripe Configuration
   STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```

4. **Start the development server**
   ```bash
   npx expo start
   ```
   
   Or use the npm script:
   ```bash
   npm start
   ```

### Running on Different Platforms

- **iOS Simulator**: Press `i` in the terminal or run `npm run ios`
- **Android Emulator**: Press `a` in the terminal or run `npm run android`
- **Web Browser**: Press `w` in the terminal or run `npm run web`
- **Physical Device**: Scan the QR code with Expo Go app

## 🏗️ Project Structure

```
foodApp/
├── app/                          # Application screens (Expo Router)
│   ├── (auth)/                   # Authentication screens
│   │   ├── sign-in.tsx          # Sign in screen
│   │   └── sign-up.tsx          # Sign up screen
│   ├── (tabs)/                   # Main app tabs
│   │   ├── index.tsx            # Home/Menu screen
│   │   ├── search.tsx           # Search screen
│   │   ├── cart.tsx             # Shopping cart
│   │   ├── itemDetail.tsx       # Item detail & customization
│   │   └── profile.tsx          # User profile
│   └── _layout.tsx              # Root layout
├── components/                   # Reusable components
│   ├── CartButton.tsx           # Cart icon with badge
│   ├── CartItem.tsx             # Cart item card
│   ├── CustomButton.tsx         # Styled button component
│   ├── CustomHeader.tsx         # Custom header component
│   ├── CustomInput.tsx          # Form input component
│   ├── Filter.tsx               # Category filter
│   ├── MenuCard.tsx             # Menu item card
│   ├── ProfileField.tsx         # Profile field display
│   ├── SearchBar.tsx            # Search input
│   ├── SideOptionCard.tsx       # Side option selector
│   └── ToppingCard.tsx          # Topping selector
├── lib/                          # Core utilities and services
│   ├── appwrite.ts              # Appwrite SDK configuration
│   ├── stripe.ts                # Stripe integration
│   ├── data.ts                  # Data utilities
│   ├── seed.ts                  # Database seeding
│   └── useAppwrite.ts           # Appwrite hooks
├── functions/                    # Serverless functions
│   └── create-payment-intent/   # Stripe payment intent function
├── store/                        # State management
│   └── cart.ts                  # Cart store (Zustand)
├── constants/                    # App constants
├── assets/                       # Images, fonts, etc.
├── type.d.ts                    # TypeScript type definitions
└── app.json                     # Expo configuration
```

## 🛠️ Tech Stack

### Frontend
- **React Native** (0.81.5) - Mobile framework
- **Expo** (~54.0.30) - Development platform
- **TypeScript** (~5.9.2) - Type safety
- **NativeWind** (^4.2.1) - Tailwind CSS for React Native
- **Expo Router** (~6.0.21) - File-based routing

### State Management
- **Zustand** (^5.0.9) - Lightweight state management

### Backend & Services
- **Appwrite** (^0.19.0) - Backend as a Service (BaaS)
  - Authentication
  - Database
  - Storage
- **Stripe** (0.50.3) - Payment processing

### UI & Animation
- **React Native Reanimated** (~4.1.1) - Smooth animations
- **React Native Gesture Handler** (~2.28.0) - Touch gestures
- **Expo Image** (~3.0.11) - Optimized image component
- **Expo Haptics** (~15.0.8) - Haptic feedback

### Monitoring & Analytics
- **Sentry** (~7.2.0) - Error tracking and monitoring

### Navigation
- **React Navigation** (^7.1.8) - Navigation library
- **Bottom Tabs** (^7.4.0) - Tab navigation

## 📦 Key Dependencies

```json
{
  "expo": "~54.0.30",
  "react": "19.1.0",
  "react-native": "0.81.5",
  "react-native-appwrite": "^0.19.0",
  "@stripe/stripe-react-native": "0.50.3",
  "zustand": "^5.0.9",
  "nativewind": "^4.2.1",
  "expo-router": "~6.0.21",
  "@sentry/react-native": "~7.2.0"
}
```

## 🔑 Environment Setup

### Appwrite Setup

1. Create an account at [Appwrite Cloud](https://cloud.appwrite.io/) or self-host
2. Create a new project
3. Set up the following:
   - **Database**: Create collections for menu items, categories, and users
   - **Authentication**: Enable email/password authentication
   - **Storage**: Set up buckets for food images
4. Copy your project credentials to `.env`

### Stripe Setup

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get your API keys from the Stripe Dashboard
3. Add keys to `.env` file
4. Deploy the payment intent function to Appwrite Functions

### Appwrite Function Deployment

The app includes a serverless function for creating Stripe payment intents:

```bash
# Navigate to functions directory
cd functions/create-payment-intent

# Install dependencies
npm install

# Deploy to Appwrite (configure appwrite.config.json first)
appwrite deploy function
```

## 🧪 Development

### Available Scripts

- `npm start` - Start Expo development server
- `npm run android` - Run on Android emulator
- `npm run ios` - Run on iOS simulator
- `npm run web` - Run in web browser
- `npm run lint` - Run ESLint

### Code Style

This project uses:
- **ESLint** with Expo configuration
- **TypeScript** for type checking
- **Prettier** with Tailwind CSS plugin

## 📱 Building for Production

### Android APK

```bash
# Build preview APK
eas build --platform android --profile preview

# Build production APK
eas build --platform android --profile production
```

### iOS IPA

```bash
# Build for iOS
eas build --platform ios --profile production
```

> **Note**: You need to configure EAS Build and have an EAS account. See [EAS Build documentation](https://docs.expo.dev/build/introduction/).

## 🔒 Security

- All sensitive credentials are stored in environment variables
- Stripe payments are processed securely via serverless functions
- User authentication is handled by Appwrite with secure sessions
- API keys are never exposed in client-side code

## 🐛 Debugging

### Common Issues

1. **Metro bundler cache issues**
   ```bash
   npx expo start -c
   ```

2. **Dependency conflicts**
   ```bash
   npm install
   npx expo-doctor
   ```

3. **Android build issues**
   - Clear Android build cache
   - Rebuild the app

## 📄 License

This project is private and proprietary.

## 👨‍💻 Author

**Farhan**
- Organization: farhxn
- Package: com.farhan.foodApp

## 🤝 Contributing

This is a private project. Contributions are not currently accepted.

## 📞 Support

For issues and questions, please open an issue in the repository.

## 🙏 Acknowledgments

- [Expo](https://expo.dev) - Amazing development platform
- [Appwrite](https://appwrite.io) - Backend as a Service
- [Stripe](https://stripe.com) - Payment processing
- [NativeWind](https://www.nativewind.dev) - Tailwind CSS for React Native

---

**Built with ❤️ using React Native and Expo**
