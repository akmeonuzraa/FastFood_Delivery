<div align="center">

# 🍔 FastFood Delivery Application

### *Your favorite meals, delivered to your doorstep* 🚀

[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

---

A full-stack food delivery platform built with modern web technologies, featuring **MongoDB** as the database solution for scalable and flexible data management.

[Features](#-features) • [Tech Stack](#-tech-stack) • [Installation](#-installation) • [Database Schema](#-database-schema) • [API Docs](#-api-endpoints)

</div>

---

## 📑 Table of Contents

- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🍃 MongoDB Integration](#-mongodb-integration)
- [📊 Database Schema](#-database-schema)
- [⚙️ Installation](#️-installation)
- [🔧 Environment Configuration](#-environment-configuration)
- [💾 Database Setup](#-database-setup)
- [🌐 API Endpoints](#-api-endpoints)
- [🚀 Usage](#-usage)
- [📈 MongoDB Best Practices](#-mongodb-best-practices)
- [🔍 Troubleshooting](#-troubleshooting)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Features

<table>
<tr>
<td width="50%">

### For Customers 👥
- 🔐 **Secure Authentication** - JWT-based login system
- 🍕 **Browse Restaurants** - Explore diverse cuisines
- 🛒 **Easy Ordering** - Simple and intuitive cart system
- 📍 **Location-Based Search** - Find nearby restaurants
- ⭐ **Reviews & Ratings** - Share your experience
- 📦 **Order Tracking** - Real-time delivery updates

</td>
<td width="50%">

### For Restaurants 🏪
- 📋 **Menu Management** - Easy item updates
- 📊 **Order Dashboard** - Track all orders
- 💰 **Revenue Analytics** - Business insights
- 🎯 **Availability Control** - Manage item stock
- 📸 **Image Uploads** - Showcase your dishes
- 📈 **Performance Metrics** - Customer feedback

</td>
</tr>
</table>

---

## 🛠️ Tech Stack

<div align="center">

### Frontend Arsenal 🎨

| Technology | Purpose | Version |
|------------|---------|---------|
| ⚛️ **React.js** | User Interface | ^18.0 |
| 📘 **TypeScript** | Type Safety | ^5.0 |
| 🎨 **CSS Modules** | Styling | Latest |
| 🔄 **React Router** | Navigation | ^6.0 |
| 📡 **Axios** | HTTP Client | ^1.0 |

### Backend Powerhouse ⚙️

| Technology | Purpose | Version |
|------------|---------|---------|
| 🟢 **Node.js** | Runtime Environment | ^18.0 |
| 🚂 **Express.js** | Web Framework | ^4.18 |
| 🍃 **MongoDB** | Database | ^6.0 |
| 🔗 **Mongoose** | ODM | ^7.0 |
| 🔐 **JWT** | Authentication | ^9.0 |
| 🔒 **bcrypt** | Password Hashing | ^5.0 |

</div>

---

## 🍃 MongoDB Integration

<div align="center">

### Why MongoDB? 💡

</div>

MongoDB powers our application with its flexible, scalable, and performance-oriented architecture. Here's why it's the perfect choice:

<table>
<tr>
<td width="33%" align="center">

### 📋 Flexible Schema
Handle diverse food items and evolving requirements without rigid table structures

</td>
<td width="33%" align="center">

### 🚀 High Performance
Lightning-fast read/write operations for real-time order processing

</td>
<td width="33%" align="center">

### 📈 Horizontal Scaling
Grow seamlessly with your user base and order volume

</td>
</tr>
<tr>
<td width="33%" align="center">

### 🔍 Rich Queries
Powerful aggregation framework for complex analytics

</td>
<td width="33%" align="center">

### 🌍 Geospatial
Built-in location-based queries for restaurant discovery

</td>
<td width="33%" align="center">

### 🔄 JSON Native
Perfect fit for JavaScript/Node.js ecosystem

</td>
</tr>
</table>


<div align="center">

### 🔌 Database Connection

</div>

The application uses **Mongoose ODM** to establish a robust connection to MongoDB with built-in connection pooling and error handling:

```javascript
const mongoose = require('mongoose');

// 🌟 Connect to MongoDB with advanced configuration
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB Connected Successfully!');
  console.log(`📍 Database: ${mongoose.connection.name}`);
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});

// 🎯 Connection event handlers
mongoose.connection.on('connected', () => {
  console.log('🟢 Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.log('🔴 Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('🟡 Mongoose disconnected from MongoDB');
});
```

---

## 📊 Database Schema

<div align="center">

### 🗂️ Collection Architecture

Our MongoDB database consists of 5 main collections, each optimized for specific operations and relationships.

</div>


### 👤 User Schema

> **Collection**: `users`  
> **Purpose**: Store user account information, authentication details, and delivery addresses

```javascript
{
  name: String,
  email: String (unique, required), // 📧 Unique identifier
  password: String (hashed),        // 🔐 Encrypted with bcrypt
  phone: String,
  role: String (enum: ['customer', 'admin', 'delivery']), // 🎭 User type
  addresses: [{
    street: String,
    city: String,
    zipCode: String,
    coordinates: {
      lat: Number,  // 📍 For geospatial queries
      lng: Number
    }
  }],
  createdAt: Date,  // ⏰ Auto-generated
  updatedAt: Date   // ⏰ Auto-updated
}
```

**Key Features:**
- ✅ Email uniqueness enforced at database level
- 🔐 Password hashing with bcrypt (10 rounds)
- 📍 Support for multiple delivery addresses
- 🌍 Geolocation coordinates for distance calculations

---

### 🏪 Restaurant Schema

> **Collection**: `restaurants`  
> **Purpose**: Store restaurant information, location data, and menu references

```javascript
{
  name: String (required),          // 🏷️ Restaurant name
  description: String,
  image: String,                    // 📸 Restaurant photo URL
  rating: Number,                   // ⭐ Average rating (calculated)
  deliveryTime: String,             // ⏱️ Estimated delivery window
  cuisine: [String],                // 🍽️ Categories: Italian, Chinese, etc.
  address: {
    street: String,
    city: String,
    zipCode: String,
    coordinates: {
      type: { type: String, default: 'Point' }, // 📍 GeoJSON format
      coordinates: [Number] // [longitude, latitude]
    }
  },
  menu: [{ type: ObjectId, ref: 'MenuItem' }], // 🔗 Reference to menu items
  isActive: Boolean,                // 🟢 Operating status
  owner: { type: ObjectId, ref: 'User' },
  createdAt: Date,
  updatedAt: Date
}
```

**Key Features:**
- 🗺️ Geospatial indexing for location-based searches
- 📊 Full-text search on name and description
- 🔗 Referenced relationship with menu items
- 🎯 Multi-category cuisine tagging

---

### 🍕 MenuItem Schema

> **Collection**: `menuitems`  
> **Purpose**: Store individual food items with pricing, images, and availability

```javascript
{
  name: String (required),          // 🏷️ Item name
  description: String,              // 📝 Detailed description
  price: Number (required),         // 💰 Item price
  image: String,                    // 📸 Item photo URL
  category: String (enum: ['appetizer', 'main', 'dessert', 'beverage']), // 🍽️
  restaurant: { type: ObjectId, ref: 'Restaurant' }, // 🔗 Parent restaurant
  isAvailable: Boolean,             // 🟢 Stock status
  ingredients: [String],            // 🥗 List of ingredients
  dietary: [String]                 // 🌱 ['vegetarian', 'vegan', 'gluten-free']
  createdAt: Date,
  updatedAt: Date
}
```

**Key Features:**
- 🏷️ Category-based organization
- 🌱 Dietary restrictions and allergen information
- 🔗 Bi-directional relationship with restaurants
- ⚡ Indexed for fast restaurant menu queries

---

### 📦 Order Schema

> **Collection**: `orders`  
> **Purpose**: Track orders from creation to delivery with complete transaction history

```javascript
{
  orderNumber: String (unique),     // 🔢 Human-readable order ID
  customer: { type: ObjectId, ref: 'User' },
  restaurant: { type: ObjectId, ref: 'Restaurant' },
  items: [{
    menuItem: { type: ObjectId, ref: 'MenuItem' },
    quantity: Number,               // 🔢 Item count
    price: Number,                  // 💰 Price at time of order
    specialInstructions: String     // 📝 Custom requests
  }],
  deliveryAddress: {
    street: String,
    city: String,
    zipCode: String,
    coordinates: {
      lat: Number,                  // 📍 For delivery routing
      lng: Number
    }
  },
  totalAmount: Number,              // 💵 Final order total
  status: String (enum: [          // 🚦 Order lifecycle
    'pending',                      // ⏳ Awaiting confirmation
    'confirmed',                    // ✅ Restaurant accepted
    'preparing',                    // 👨‍🍳 Being prepared
    'out-for-delivery',            // 🚚 On the way
    'delivered',                    // ✅ Completed
    'cancelled'                     // ❌ Cancelled
  ]),
  paymentStatus: String (enum: ['pending', 'paid', 'failed', 'refunded']),
  paymentMethod: String,            // 💳 Payment type
  deliveryPerson: { type: ObjectId, ref: 'User' }, // 🛵 Assigned driver
  estimatedDeliveryTime: Date,     // ⏰ ETA
  actualDeliveryTime: Date,        // ⏱️ Actual delivery time
  notes: String,                   // 📝 Additional notes
  createdAt: Date,
  updatedAt: Date
}
```

**Key Features:**
- 🔢 Unique order number generation
- 💰 Price snapshot at order time (protects against menu changes)
- 🚦 Comprehensive status tracking
- 📊 Complete order history and timeline
- 🔗 References to all related entities

---

### ⭐ Review Schema

> **Collection**: `reviews`  
> **Purpose**: Store customer feedback and ratings for restaurants

```javascript
{
  order: { type: ObjectId, ref: 'Order' },        // 🔗 Associated order
  restaurant: { type: ObjectId, ref: 'Restaurant' },
  customer: { type: ObjectId, ref: 'User' },
  rating: Number (1-5),              // ⭐ Star rating
  comment: String,                   // 💬 Review text
  images: [String],                  // 📸 Optional photos
  createdAt: Date,
  updatedAt: Date
}
```

**Key Features:**
- ⭐ 5-star rating system
- 📸 Photo upload support
- 🔗 Linked to specific orders
- 📊 Used for calculating restaurant ratings

---

## ⚙️ Installation

### 📋 Prerequisites

Before you begin, ensure you have the following installed:

<table>
<tr>
<td align="center" width="33%">

### 🟢 Node.js
**v14 or higher**

[Download Node.js](https://nodejs.org/)

</td>
<td align="center" width="33%">

### 📦 npm or yarn
**Latest version**

Comes with Node.js

</td>
<td align="center" width="33%">

### 🍃 MongoDB
**v6.0 or higher**

[Local](https://www.mongodb.com/try/download/community) or [Atlas](https://www.mongodb.com/cloud/atlas)

</td>
</tr>
</table>

---

### 🚀 Quick Start Guide

<details>
<summary><b>Step 1: Clone the Repository</b> 📥</summary>

```bash
# Clone the project
git clone https://github.com/akmeonuzraa/FastFood_Delivery.git

# Navigate to project directory
cd FastFood_Delivery
```

</details>

<details>
<summary><b>Step 2: Install Backend Dependencies</b> ⚙️</summary>

```bash
# Navigate to backend folder
cd backend

# Install all dependencies
npm install

# Expected packages:
# ✅ express, mongoose, bcrypt, jsonwebtoken, dotenv, cors, multer, etc.
```

</details>

<details>
<summary><b>Step 3: Install Frontend Dependencies</b> 🎨</summary>

```bash
# Navigate to frontend folder
cd ../frontend

# Install all dependencies
npm install

# Expected packages:
# ✅ react, react-router-dom, axios, etc.
```

</details>

<details>
<summary><b>Step 4: Configure Environment</b> 🔧</summary>

Create a `.env` file in the backend directory (see [Environment Configuration](#-environment-configuration))

</details>

<details>
<summary><b>Step 5: Start the Application</b> 🎯</summary>

```bash
# Terminal 1 - Start Backend
cd backend
npm run dev

# Terminal 2 - Start Frontend
cd frontend
npm run dev
```

</details>

---

## 🔧 Environment Configuration

<div align="center">

### 🔐 Setting Up Your Environment Variables

</div>

Create a `.env` file in the **backend** directory and configure the following variables:

```env
# ═══════════════════════════════════════════════════════
# 🌐 SERVER CONFIGURATION
# ═══════════════════════════════════════════════════════
PORT=5000
NODE_ENV=development

# ═══════════════════════════════════════════════════════
# 🍃 MONGODB CONFIGURATION
# ═══════════════════════════════════════════════════════

# Option 1: Local MongoDB
MONGODB_URI=mongodb://localhost:27017/fastfood_delivery

# Option 2: MongoDB Atlas (Cloud) - Recommended for production
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/fastfood_delivery?retryWrites=true&w=majority

# ═══════════════════════════════════════════════════════
# 🔐 JWT CONFIGURATION
# ═══════════════════════════════════════════════════════
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
JWT_EXPIRE=7d

# ═══════════════════════════════════════════════════════
# 📁 FILE UPLOAD CONFIGURATION
# ═══════════════════════════════════════════════════════
MAX_FILE_SIZE=5000000
UPLOAD_PATH=./uploads

# ═══════════════════════════════════════════════════════
# 💳 PAYMENT GATEWAY (Stripe - Optional)
# ═══════════════════════════════════════════════════════
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key

# ═══════════════════════════════════════════════════════
# 📧 EMAIL CONFIGURATION (Optional)
# ═══════════════════════════════════════════════════════
EMAIL_SERVICE=gmail
EMAIL_USERNAME=your_email@gmail.com
EMAIL_PASSWORD=your_app_specific_password

# ═══════════════════════════════════════════════════════
# 🗺️ MAPS API (Optional - for location features)
# ═══════════════════════════════════════════════════════
GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# ═══════════════════════════════════════════════════════
# 🔔 PUSH NOTIFICATIONS (Optional)
# ═══════════════════════════════════════════════════════
FIREBASE_SERVER_KEY=your_firebase_server_key
```

> ⚠️ **Security Note**: Never commit your `.env` file to version control! Add it to `.gitignore`.

---

## 💾 Database Setup

<div align="center">

### Choose Your MongoDB Deployment Strategy

</div>

<table>
<tr>
<td width="50%">

### 🏠 Option 1: Local MongoDB

Perfect for development and testing

**Pros:**
- ✅ No internet required
- ✅ Full control
- ✅ Free forever
- ✅ Fast development

**Cons:**
- ❌ Manual backup management
- ❌ Single machine limitation

</td>
<td width="50%">

### ☁️ Option 2: MongoDB Atlas

Recommended for production

**Pros:**
- ✅ Automatic backups
- ✅ Global distribution
- ✅ Managed service
- ✅ Free tier available

**Cons:**
- ❌ Internet dependency
- ❌ Learning curve

</td>
</tr>
</table>

---

### 🏠 Setup: Local MongoDB

<details>
<summary><b>Click to expand local setup instructions</b></summary>

#### 1️⃣ Install MongoDB

**Windows:**
```bash
# Download from https://www.mongodb.com/try/download/community
# Run the installer and follow the setup wizard
```

**macOS:**
```bash
# Using Homebrew
brew tap mongodb/brew
brew install mongodb-community@6.0
```

**Linux (Ubuntu):**
```bash
# Import MongoDB public GPG key
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -

# Create list file for MongoDB
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Update and install
sudo apt-get update
sudo apt-get install -y mongodb-org
```

#### 2️⃣ Start MongoDB Service

**Windows:**
```bash
# MongoDB starts automatically as a service
# Or manually:
mongod
```

**macOS:**
```bash
brew services start mongodb-community@6.0
```

**Linux:**
```bash
sudo systemctl start mongod
sudo systemctl enable mongod  # Start on boot
```

#### 3️⃣ Verify Installation

```bash
# Connect to MongoDB shell
mongosh

# You should see:
# Current Mongosh Log ID: ...
# Connecting to: mongodb://127.0.0.1:27017
# ...
```

#### 4️⃣ Update `.env` File

```env
MONGODB_URI=mongodb://localhost:27017/fastfood_delivery
```

</details>

---

### ☁️ Setup: MongoDB Atlas (Cloud)

<details>
<summary><b>Click to expand Atlas setup instructions</b></summary>

#### 1️⃣ Create Account

1. Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Click **"Try Free"** button
3. Sign up with email or Google/GitHub

#### 2️⃣ Create a Cluster

1. Choose **"Free Shared"** tier
2. Select your preferred cloud provider (AWS/GCP/Azure)
3. Choose region closest to your users
4. Click **"Create Cluster"** (takes ~5 minutes)

#### 3️⃣ Configure Database Access

1. Go to **Database Access** → **Add New Database User**
2. Choose **Password** authentication
3. Create username and strong password
4. Set user privileges to **"Atlas Admin"** for development

#### 4️⃣ Configure Network Access

1. Go to **Network Access** → **Add IP Address**
2. For development, click **"Allow Access From Anywhere"** (0.0.0.0/0)
3. For production, add specific IP addresses

#### 5️⃣ Get Connection String

1. Click **"Connect"** on your cluster
2. Choose **"Connect your application"**
3. Select **Node.js** and version **4.1 or later**
4. Copy the connection string

#### 6️⃣ Update `.env` File

```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/fastfood_delivery?retryWrites=true&w=majority
```

Replace:
- `username` → Your database username
- `password` → Your database password
- `cluster0.xxxxx` → Your actual cluster address

</details>

---

### 🎯 Database Indexing Strategy

Our application creates strategic indexes for optimal performance:

```javascript
// 👤 User Collection Indexes
db.users.createIndex({ email: 1 }, { unique: true });          // 🔑 Unique email lookup
db.users.createIndex({ phone: 1 });                            // 📞 Phone number search

// 🏪 Restaurant Collection Indexes
db.restaurants.createIndex({ name: "text", description: "text" }); // 🔍 Full-text search
db.restaurants.createIndex({ "address.coordinates": "2dsphere" }); // 🗺️ Geospatial queries
db.restaurants.createIndex({ cuisine: 1 });                        // 🍽️ Filter by cuisine
db.restaurants.createIndex({ rating: -1 });                        // ⭐ Sort by rating

// 🍕 MenuItem Collection Indexes
db.menuitems.createIndex({ restaurant: 1 });                   // 🔗 Restaurant menu lookup
db.menuitems.createIndex({ category: 1 });                     // 📂 Category filtering
db.menuitems.createIndex({ name: "text" });                    // 🔍 Search menu items

// 📦 Order Collection Indexes
db.orders.createIndex({ orderNumber: 1 }, { unique: true });   // 🔢 Unique order ID
db.orders.createIndex({ customer: 1, createdAt: -1 });        // 👤 User order history
db.orders.createIndex({ restaurant: 1, status: 1 });          // 🏪 Restaurant orders
db.orders.createIndex({ status: 1 });                          // 🚦 Status filtering
db.orders.createIndex({ createdAt: -1 });                      // ⏰ Recent orders first

// ⭐ Review Collection Indexes
db.reviews.createIndex({ restaurant: 1 });                     // 🏪 Restaurant reviews
db.reviews.createIndex({ customer: 1 });                       // 👤 User reviews
db.reviews.createIndex({ rating: -1 });                        // ⭐ Top rated
```

> 💡 **Pro Tip**: These indexes are automatically created when the application starts for the first time.

---

## 🌐 API Endpoints

<div align="center">

### RESTful API Documentation

All endpoints follow REST conventions and return JSON responses

**Base URL**: `http://localhost:5000/api`

</div>

---

### 🔐 Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/auth/register` | 📝 Register new user | ❌ |
| `POST` | `/auth/login` | 🔑 User login | ❌ |
| `POST` | `/auth/logout` | 🚪 User logout | ✅ |
| `GET` | `/auth/me` | 👤 Get current user profile | ✅ |
| `PUT` | `/auth/updatedetails` | ✏️ Update user details | ✅ |
| `PUT` | `/auth/updatepassword` | 🔒 Change password | ✅ |

<details>
<summary><b>Example: User Registration</b></summary>

```javascript
// POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "phone": "+1234567890"
}

// Response (201 Created)
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "60d5ec49f1b2c72b8c8e4f1a",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "customer"
  }
}
```

</details>

---

### 🏪 Restaurant Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/restaurants` | 📋 Get all restaurants | ❌ |
| `GET` | `/restaurants/:id` | 🔍 Get single restaurant | ❌ |
| `POST` | `/restaurants` | ➕ Create restaurant | ✅ Admin |
| `PUT` | `/restaurants/:id` | ✏️ Update restaurant | ✅ Admin |
| `DELETE` | `/restaurants/:id` | 🗑️ Delete restaurant | ✅ Admin |
| `GET` | `/restaurants/nearby` | 📍 Find nearby restaurants | ❌ |
| `GET` | `/restaurants/search` | 🔍 Search restaurants | ❌ |

<details>
<summary><b>Example: Get Nearby Restaurants</b></summary>

```javascript
// GET /api/restaurants/nearby?lat=40.7128&lng=-74.0060&radius=5000

// Response (200 OK)
{
  "success": true,
  "count": 12,
  "data": [
    {
      "_id": "60d5ec49f1b2c72b8c8e4f1b",
      "name": "Pizza Paradise",
      "cuisine": ["Italian", "Pizza"],
      "rating": 4.5,
      "deliveryTime": "25-35 min",
      "distance": 1.2  // kilometers
    }
    // ... more restaurants
  ]
}
```

</details>

---

### 🍕 Menu Item Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/restaurants/:restaurantId/menu` | 📜 Get restaurant menu | ❌ |
| `GET` | `/menu-items/:id` | 🔍 Get single menu item | ❌ |
| `POST` | `/restaurants/:restaurantId/menu` | ➕ Add menu item | ✅ Admin |
| `PUT` | `/menu-items/:id` | ✏️ Update menu item | ✅ Admin |
| `DELETE` | `/menu-items/:id` | 🗑️ Delete menu item | ✅ Admin |
| `PATCH` | `/menu-items/:id/availability` | 🔄 Toggle availability | ✅ Admin |

<details>
<summary><b>Example: Add Menu Item</b></summary>

```javascript
// POST /api/restaurants/60d5ec49f1b2c72b8c8e4f1b/menu
{
  "name": "Margherita Pizza",
  "description": "Classic pizza with tomato, mozzarella, and basil",
  "price": 12.99,
  "category": "main",
  "ingredients": ["dough", "tomato sauce", "mozzarella", "basil"],
  "dietary": ["vegetarian"],
  "image": "https://example.com/images/margherita.jpg"
}

// Response (201 Created)
{
  "success": true,
  "data": {
    "_id": "60d5ec49f1b2c72b8c8e4f1c",
    "name": "Margherita Pizza",
    "price": 12.99,
    "isAvailable": true
    // ... other fields
  }
}
```

</details>

---

### 📦 Order Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/orders` | 🛒 Create new order | ✅ |
| `GET` | `/orders` | 📋 Get user orders | ✅ |
| `GET` | `/orders/:id` | 🔍 Get single order | ✅ |
| `PUT` | `/orders/:id/status` | 🚦 Update order status | ✅ Admin |
| `DELETE` | `/orders/:id` | ❌ Cancel order | ✅ |
| `GET` | `/orders/:id/track` | 📍 Track order | ✅ |

<details>
<summary><b>Example: Create Order</b></summary>

```javascript
// POST /api/orders
{
  "restaurant": "60d5ec49f1b2c72b8c8e4f1b",
  "items": [
    {
      "menuItem": "60d5ec49f1b2c72b8c8e4f1c",
      "quantity": 2,
      "specialInstructions": "Extra cheese please"
    }
  ],
  "deliveryAddress": {
    "street": "123 Main St",
    "city": "New York",
    "zipCode": "10001",
    "coordinates": {
      "lat": 40.7128,
      "lng": -74.0060
    }
  },
  "paymentMethod": "credit_card"
}

// Response (201 Created)
{
  "success": true,
  "data": {
    "orderNumber": "ORD-20240214-1234",
    "status": "pending",
    "totalAmount": 25.98,
    "estimatedDeliveryTime": "2024-02-14T19:30:00Z"
    // ... other fields
  }
}
```

</details>

---

### ⭐ Review Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/reviews` | ✍️ Create review | ✅ |
| `GET` | `/restaurants/:restaurantId/reviews` | 📋 Get restaurant reviews | ❌ |
| `GET` | `/reviews/:id` | 🔍 Get single review | ❌ |
| `PUT` | `/reviews/:id` | ✏️ Update review | ✅ Owner |
| `DELETE` | `/reviews/:id` | 🗑️ Delete review | ✅ Owner/Admin |

<details>
<summary><b>Example: Create Review</b></summary>

```javascript
// POST /api/reviews
{
  "order": "60d5ec49f1b2c72b8c8e4f1d",
  "restaurant": "60d5ec49f1b2c72b8c8e4f1b",
  "rating": 5,
  "comment": "Amazing pizza! Fast delivery and great service.",
  "images": [
    "https://example.com/review-images/img1.jpg"
  ]
}

// Response (201 Created)
{
  "success": true,
  "data": {
    "_id": "60d5ec49f1b2c72b8c8e4f1e",
    "rating": 5,
    "comment": "Amazing pizza! Fast delivery and great service.",
    "createdAt": "2024-02-14T18:45:00Z"
  }
}
```

</details>

---

### 📊 Admin Analytics Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/admin/dashboard` | 📈 Dashboard overview | ✅ Admin |
| `GET` | `/admin/revenue` | 💰 Revenue analytics | ✅ Admin |
| `GET` | `/admin/orders/stats` | 📊 Order statistics | ✅ Admin |
| `GET` | `/admin/restaurants/stats` | 🏪 Restaurant performance | ✅ Admin |

---

### 🔒 Authentication

Most endpoints require authentication. Include the JWT token in the request header:

```javascript
headers: {
  'Authorization': 'Bearer YOUR_JWT_TOKEN_HERE'
}
```

---

## 🚀 Usage

### Starting the Application

<table>
<tr>
<td width="50%">

#### 🔧 Backend Server

```bash
cd backend

# Development mode (with hot reload)
npm run dev

# Production mode
npm start
```

**Server will be running on:**
```
🌐 http://localhost:5000
```

**Console Output:**
```
🟢 Server running in development mode
✅ MongoDB Connected Successfully!
📍 Database: fastfood_delivery
🚀 Server started on port 5000
```

</td>
<td width="50%">

#### 🎨 Frontend Application

```bash
cd frontend

# Development mode
npm run dev

# Build for production
npm run build
```

**Application will be available at:**
```
🌐 http://localhost:5173
```

**Console Output:**
```
  VITE v4.x.x  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

</td>
</tr>
</table>

---

### 🗄️ Database Operations

#### 🌱 Seeding Initial Data

Populate your database with sample restaurants, menu items, and users:

```bash
cd backend
npm run seed

# Output:
# 🌱 Seeding database...
# ✅ 10 restaurants created
# ✅ 50 menu items created
# ✅ 5 users created
# 🎉 Database seeded successfully!
```

#### 💾 Database Backup

Create a backup of your MongoDB database:

```bash
# Backup entire database
mongodump --db fastfood_delivery --out ./backup/$(date +%Y%m%d)

# Backup specific collection
mongodump --db fastfood_delivery --collection orders --out ./backup

# Success message:
# ✅ Backup completed: 5 collections backed up
```

#### 🔄 Database Restore

Restore database from a backup:

```bash
# Restore entire database
mongorestore --db fastfood_delivery ./backup/20240214/fastfood_delivery

# Restore specific collection
mongorestore --db fastfood_delivery --collection orders ./backup/fastfood_delivery/orders.bson

# Success message:
# ✅ Restore completed: 1234 documents restored
```

#### 🧹 Clear Database

Reset your database (useful for development):

```bash
cd backend
npm run reset-db

# ⚠️ WARNING: This will delete all data!
# Are you sure? (y/N) y
# 🗑️ Clearing database...
# ✅ All collections dropped
```

---

### 🧰 MongoDB Compass

Use [MongoDB Compass](https://www.mongodb.com/products/compass) - the official GUI for MongoDB:

<div align="center">

| Feature | Description |
|---------|-------------|
| 📊 **Visual Explorer** | Browse collections and documents with a beautiful UI |
| 🔍 **Query Builder** | Build queries visually without writing code |
| 📈 **Performance Insights** | Analyze slow queries and optimize indexes |
| ✏️ **Document Editor** | Create, edit, and delete documents easily |
| 🎯 **Aggregation Builder** | Build complex aggregation pipelines visually |
| 📋 **Schema Analyzer** | Understand your data structure and patterns |

</div>

**Connection String for Compass:**
```
mongodb://localhost:27017/fastfood_delivery
```

---

## 📈 MongoDB Best Practices

<div align="center">

### 🏆 Implementation Highlights

Our application follows MongoDB best practices for performance, scalability, and maintainability

</div>

---

### 1️⃣ Schema Design Patterns

<table>
<tr>
<td width="50%">

#### ✅ What We Do Right

**Embedding (Denormalization):**
- 📍 Addresses within user documents
- 🛒 Order items within order documents
- ⚡ Reduces join operations

**Referencing (Normalization):**
- 🏪 Restaurants → Menu Items
- 📦 Orders → Users/Restaurants
- 🔄 Enables independent updates

</td>
<td width="50%">

#### 🎯 When to Use Each

**Use Embedding When:**
- Data doesn't change often
- Small, bounded data sets
- Read-heavy operations
- 1-to-few relationships

**Use Referencing When:**
- Data changes frequently
- Large data sets
- Write-heavy operations
- 1-to-many or many-to-many

</td>
</tr>
</table>

---

### 2️⃣ Indexing Strategy

```javascript
// ⚡ Performance-critical indexes created at startup

// Single Field Indexes
db.users.createIndex({ email: 1 })              // Fast user lookup
db.orders.createIndex({ status: 1 })            // Status filtering

// Compound Indexes  
db.orders.createIndex({ customer: 1, createdAt: -1 })  // User order history
db.menuitems.createIndex({ restaurant: 1, category: 1 }) // Menu navigation

// Text Indexes
db.restaurants.createIndex({ 
  name: "text", 
  description: "text" 
})  // 🔍 Full-text search

// Geospatial Indexes
db.restaurants.createIndex({ 
  "address.coordinates": "2dsphere" 
})  // 📍 Location queries

// Unique Indexes
db.users.createIndex({ email: 1 }, { unique: true })  // Prevent duplicates
```

---

### 3️⃣ Query Optimization

<details>
<summary><b>✅ Efficient Queries</b></summary>

```javascript
// Good: Using indexes effectively
db.orders.find({ 
  customer: userId, 
  status: "delivered" 
})
.sort({ createdAt: -1 })
.limit(10);

// Good: Projection to limit fields
db.restaurants.find(
  { cuisine: "Italian" },
  { name: 1, rating: 1, deliveryTime: 1 }
);

// Good: Covered query (all fields in index)
db.users.find(
  { email: "user@example.com" },
  { email: 1, _id: 1 }
);
```

</details>

<details>
<summary><b>❌ Inefficient Queries to Avoid</b></summary>

```javascript
// Bad: Full collection scan
db.orders.find({ "items.specialInstructions": /extra/ });

// Bad: Multiple regex patterns
db.restaurants.find({ 
  $or: [
    { name: /pizza/i },
    { description: /pizza/i }
  ]
});

// Bad: Retrieving entire documents when few fields needed
db.restaurants.find({ cuisine: "Italian" });
// Should include projection: { name: 1, rating: 1 }
```

</details>

---

### 4️⃣ Aggregation Pipeline Examples

#### 📊 Top Rated Restaurants

```javascript
db.restaurants.aggregate([
  {
    $lookup: {
      from: "reviews",
      localField: "_id",
      foreignField: "restaurant",
      as: "reviews"
    }
  },
  {
    $addFields: {
      avgRating: { $avg: "$reviews.rating" },
      reviewCount: { $size: "$reviews" }
    }
  },
  {
    $match: { reviewCount: { $gte: 5 } }  // Min 5 reviews
  },
  {
    $sort: { avgRating: -1 }
  },
  {
    $limit: 10
  },
  {
    $project: {
      name: 1,
      cuisine: 1,
      avgRating: 1,
      reviewCount: 1,
      deliveryTime: 1
    }
  }
]);
```

#### 💰 Daily Revenue Report

```javascript
db.orders.aggregate([
  {
    $match: {
      status: "delivered",
      paymentStatus: "paid",
      createdAt: {
        $gte: new Date(new Date().setHours(0, 0, 0, 0))
      }
    }
  },
  {
    $group: {
      _id: null,
      totalOrders: { $sum: 1 },
      totalRevenue: { $sum: "$totalAmount" },
      avgOrderValue: { $avg: "$totalAmount" }
    }
  },
  {
    $project: {
      _id: 0,
      totalOrders: 1,
      totalRevenue: { $round: ["$totalRevenue", 2] },
      avgOrderValue: { $round: ["$avgOrderValue", 2] }
    }
  }
]);
```

#### 🏆 Top Selling Items

```javascript
db.orders.aggregate([
  { $match: { status: "delivered" } },
  { $unwind: "$items" },
  {
    $group: {
      _id: "$items.menuItem",
      totalQuantity: { $sum: "$items.quantity" },
      totalRevenue: { $sum: { $multiply: ["$items.quantity", "$items.price"] } }
    }
  },
  {
    $lookup: {
      from: "menuitems",
      localField: "_id",
      foreignField: "_id",
      as: "item"
    }
  },
  { $unwind: "$item" },
  { $sort: { totalQuantity: -1 } },
  { $limit: 10 },
  {
    $project: {
      name: "$item.name",
      restaurant: "$item.restaurant",
      totalQuantity: 1,
      totalRevenue: { $round: ["$totalRevenue", 2] }
    }
  }
]);
```

---

### 5️⃣ Transactions (ACID Compliance)

For operations requiring atomicity, we use MongoDB transactions:

```javascript
const session = await mongoose.startSession();
session.startTransaction();

try {
  // 1️⃣ Create order
  const order = await Order.create([{
    customer: userId,
    restaurant: restaurantId,
    items: orderItems,
    totalAmount: total
  }], { session });

  // 2️⃣ Update restaurant stats
  await Restaurant.findByIdAndUpdate(
    restaurantId,
    { 
      $inc: { totalOrders: 1 },
      $push: { recentOrders: order[0]._id }
    },
    { session }
  );

  // 3️⃣ Deduct user credits (if applicable)
  await User.findByIdAndUpdate(
    userId,
    { $inc: { credits: -total } },
    { session }
  );

  // ✅ Commit transaction
  await session.commitTransaction();
  console.log('✅ Transaction successful');
  
} catch (error) {
  // ❌ Rollback on error
  await session.abortTransaction();
  console.error('❌ Transaction failed:', error);
  throw error;
  
} finally {
  session.endSession();
}
```

---

### 6️⃣ Connection Pooling

Optimal connection pool configuration:

```javascript
mongoose.connect(process.env.MONGODB_URI, {
  maxPoolSize: 10,        // Maximum connections in pool
  minPoolSize: 5,         // Minimum connections to maintain
  maxIdleTimeMS: 30000,   // Close idle connections after 30s
  serverSelectionTimeoutMS: 5000,  // Timeout for server selection
  socketTimeoutMS: 45000  // Socket timeout
});
```

---

### 7️⃣ Error Handling

Comprehensive error handling for database operations:

```javascript
// Mongoose error handler middleware
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // 🔑 Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    error.message = `${field} already exists`;
    error.statusCode = 400;
  }

  // ✅ Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    error.message = message;
    error.statusCode = 400;
  }

  // 🔍 Mongoose cast error
  if (err.name === 'CastError') {
    error.message = `Resource not found`;
    error.statusCode = 404;
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error'
  });
};
```

---

### 8️⃣ Data Validation

Schema-level validation with Mongoose:

```javascript
const orderSchema = new mongoose.Schema({
  totalAmount: {
    type: Number,
    required: [true, 'Order total is required'],
    min: [0, 'Total cannot be negative']
  },
  items: {
    type: [{
      menuItem: { type: ObjectId, ref: 'MenuItem' },
      quantity: { 
        type: Number, 
        required: true,
        min: [1, 'Quantity must be at least 1'],
        max: [99, 'Quantity cannot exceed 99']
      }
    }],
    validate: {
      validator: function(items) {
        return items && items.length > 0;
      },
      message: 'Order must contain at least one item'
    }
  },
  email: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email'
    ]
  }
});
```

---

## 🔍 Troubleshooting

<div align="center">

### Common MongoDB Issues & Solutions

</div>

---

### 🔴 Connection Errors

<details>
<summary><b>Error: connect ECONNREFUSED 127.0.0.1:27017</b></summary>

**Problem:** Cannot connect to local MongoDB

**Solutions:**

1️⃣ **Check if MongoDB is running:**
```bash
# Windows
services.msc  # Look for MongoDB service

# macOS
brew services list | grep mongodb

# Linux
sudo systemctl status mongod
```

2️⃣ **Start MongoDB service:**
```bash
# Windows
net start MongoDB

# macOS
brew services start mongodb-community@6.0

# Linux
sudo systemctl start mongod
```

3️⃣ **Verify connection string in `.env`:**
```env
MONGODB_URI=mongodb://localhost:27017/fastfood_delivery
```

</details>

<details>
<summary><b>Error: MongoNetworkError: connection timed out</b></summary>

**Problem:** Network timeout (usually with MongoDB Atlas)

**Solutions:**

1️⃣ **Check internet connection**

2️⃣ **Verify IP whitelist in MongoDB Atlas:**
- Go to Network Access
- Add your current IP or use `0.0.0.0/0` for development

3️⃣ **Check firewall settings:**
```bash
# Allow MongoDB port
sudo ufw allow 27017
```

4️⃣ **Verify connection string format:**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
```

</details>

---

### 🔐 Authentication Errors

<details>
<summary><b>Error: Authentication failed</b></summary>

**Problem:** Invalid credentials

**Solutions:**

1️⃣ **Verify username and password:**
- Check for special characters in password
- URL encode special characters: `@` → `%40`, `#` → `%23`

2️⃣ **Check user permissions:**
```javascript
// In MongoDB shell
use admin
db.getUser("username")
```

3️⃣ **Create new user with proper permissions:**
```javascript
use fastfood_delivery
db.createUser({
  user: "admin",
  pwd: "securePassword",
  roles: [
    { role: "readWrite", db: "fastfood_delivery" }
  ]
})
```

</details>

---

### 🔑 Duplicate Key Errors

<details>
<summary><b>Error: E11000 duplicate key error collection</b></summary>

**Problem:** Attempting to insert duplicate value for unique field

**Solutions:**

1️⃣ **Check existing documents:**
```javascript
db.users.find({ email: "test@example.com" })
```

2️⃣ **Remove duplicate:**
```javascript
db.users.deleteOne({ email: "test@example.com" })
```

3️⃣ **Drop and recreate index if corrupted:**
```javascript
db.users.dropIndex("email_1")
db.users.createIndex({ email: 1 }, { unique: true })
```

</details>

---

### 📊 Performance Issues

<details>
<summary><b>Slow Queries</b></summary>

**Problem:** Queries taking too long

**Solutions:**

1️⃣ **Enable query profiling:**
```javascript
// In MongoDB shell
db.setProfilingLevel(2)  // Log all queries
db.system.profile.find().sort({ ts: -1 }).limit(5)
```

2️⃣ **Analyze query with explain():**
```javascript
db.orders.find({ customer: userId }).explain("executionStats")
```

3️⃣ **Check if indexes are being used:**
```javascript
// Look for "COLLSCAN" (bad) vs "IXSCAN" (good)
db.orders.find({ status: "pending" }).explain()
```

4️⃣ **Create missing indexes:**
```javascript
db.orders.createIndex({ status: 1, createdAt: -1 })
```

5️⃣ **Monitor index usage:**
```javascript
db.orders.aggregate([
  { $indexStats: {} }
])
```

</details>

<details>
<summary><b>High Memory Usage</b></summary>

**Problem:** MongoDB consuming too much memory

**Solutions:**

1️⃣ **Check current memory usage:**
```javascript
db.serverStatus().mem
```

2️⃣ **Limit WiredTiger cache:**
```bash
# In mongod.conf
storage:
  wiredTiger:
    engineConfig:
      cacheSizeGB: 2  # Limit cache to 2GB
```

3️⃣ **Monitor working set:**
```javascript
db.serverStatus().wiredTiger.cache
```

</details>

---

### 💾 Data Issues

<details>
<summary><b>Missing or Incorrect Data</b></summary>

**Problem:** Data not saving or loading correctly

**Solutions:**

1️⃣ **Verify schema validation:**
```javascript
const user = new User({ email: "test@example.com" });
const error = user.validateSync();
console.log(error);
```

2️⃣ **Check for async/await issues:**
```javascript
// ❌ Wrong
User.create(userData);

// ✅ Correct
await User.create(userData);
```

3️⃣ **Enable Mongoose debug mode:**
```javascript
mongoose.set('debug', true);
```

</details>

---

### 🔄 Migration Issues

<details>
<summary><b>Schema Changes Not Reflecting</b></summary>

**Problem:** Updated schema but data structure unchanged

**Solutions:**

1️⃣ **Mongoose caches models - restart application**

2️⃣ **For production migrations, use migration scripts:**
```javascript
// migrations/add-rating-field.js
db.restaurants.updateMany(
  { rating: { $exists: false } },
  { $set: { rating: 0 } }
)
```

3️⃣ **Run migration:**
```bash
npm run migrate
```

</details>

---

### 🆘 Getting Help

If you're still experiencing issues:

1. 📚 **Check MongoDB Docs**: [docs.mongodb.com](https://docs.mongodb.com)
2. 💬 **MongoDB Community Forums**: [community.mongodb.com](https://community.mongodb.com)
3. 🐛 **GitHub Issues**: Open an issue in this repository
4. 📧 **Contact Support**: For critical production issues

---

## 🤝 Contributing

<div align="center">

### We Welcome Contributions! 🎉

Help make this project better for everyone

</div>

---

### How to Contribute

1. **🍴 Fork the Repository**
   ```bash
   # Click the 'Fork' button at the top right of the repository page
   ```

2. **📥 Clone Your Fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/FastFood_Delivery.git
   cd FastFood_Delivery
   ```

3. **🌿 Create a Feature Branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```

4. **✨ Make Your Changes**
   - Write clean, readable code
   - Follow existing code style
   - Add comments where necessary
   - Update documentation if needed

5. **✅ Test Your Changes**
   ```bash
   npm run test
   npm run lint
   ```

6. **💾 Commit Your Changes**
   ```bash
   git add .
   git commit -m '✨ Add some AmazingFeature'
   ```

7. **📤 Push to Your Fork**
   ```bash
   git push origin feature/AmazingFeature
   ```

8. **🔄 Open a Pull Request**
   - Go to the original repository
   - Click 'New Pull Request'
   - Select your branch
   - Describe your changes
   - Submit!

---

### 📋 Contribution Guidelines

<table>
<tr>
<td width="50%">

#### ✅ Do's

- ✔️ Follow the existing code style
- ✔️ Write meaningful commit messages
- ✔️ Add tests for new features
- ✔️ Update documentation
- ✔️ Keep PRs focused and small
- ✔️ Be respectful and constructive

</td>
<td width="50%">

#### ❌ Don'ts

- ❌ Submit large, unfocused PRs
- ❌ Ignore linting errors
- ❌ Skip writing tests
- ❌ Use offensive language
- ❌ Include unnecessary files
- ❌ Break existing functionality

</td>
</tr>
</table>

---

### 🐛 Reporting Bugs

Found a bug? Help us fix it!

**Before submitting:**
- Check if the issue already exists
- Use the latest version
- Provide detailed information

**Include in your report:**
- 📝 Clear description
- 🔄 Steps to reproduce
- 💻 System information
- 📸 Screenshots (if applicable)
- 🐞 Error messages

---

### 💡 Suggesting Features

Have an idea? We'd love to hear it!

**Good feature requests include:**
- 🎯 Clear use case
- 🎨 Proposed implementation
- 🔍 Examples from other apps
- 📊 Expected benefits

---

### 🎖️ Contributors

<div align="center">

Thanks to all the amazing people who have contributed to this project!

<!-- ALL-CONTRIBUTORS-LIST:START -->
<!-- This section is auto-generated -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

</div>

---

## 📄 License

<div align="center">

### MIT License

Copyright (c) 2024 FastFood Delivery

</div>

```
MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

<div align="center">

## 📞 Contact & Support

### Need Help? Get in Touch!

[![GitHub Issues](https://img.shields.io/badge/GitHub-Issues-red?style=for-the-badge&logo=github)](https://github.com/akmeonuzraa/FastFood_Delivery/issues)
[![Discussions](https://img.shields.io/badge/GitHub-Discussions-green?style=for-the-badge&logo=github)](https://github.com/akmeonuzraa/FastFood_Delivery/discussions)

---

### 🌟 Show Your Support

If you found this project helpful, please consider:

⭐ **Starring** the repository  
🍴 **Forking** for your own projects  
📢 **Sharing** with others  
💝 **Contributing** to make it better  

---

### 📚 Additional Resources

| Resource | Link |
|----------|------|
| 🍃 **MongoDB Docs** | [docs.mongodb.com](https://docs.mongodb.com) |
| 🟢 **Node.js Docs** | [nodejs.org/docs](https://nodejs.org/docs) |
| ⚛️ **React Docs** | [react.dev](https://react.dev) |
| 🐈 **Mongoose Docs** | [mongoosejs.com](https://mongoosejs.com) |
| 🚂 **Express.js Docs** | [expressjs.com](https://expressjs.com) |

---

### 🏆 Project Stats

![GitHub stars](https://img.shields.io/github/stars/akmeonuzraa/FastFood_Delivery?style=social)
![GitHub forks](https://img.shields.io/github/forks/akmeonuzraa/FastFood_Delivery?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/akmeonuzraa/FastFood_Delivery?style=social)

---

<sub>Built with ❤️ using MongoDB, Node.js, Express.js, and React</sub>

**[⬆ Back to Top](#-fastfood-delivery-application)**

</div>
