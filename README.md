# 🏡 WanderLust – Airbnb Inspired Listing Platform

WanderLust is a full-stack web application inspired by Airbnb that allows users to explore, create, edit, and review property listings. The project is built using the MERN backend stack (Node.js, Express.js, MongoDB) with EJS as the templating engine.

---

## 🚀 Features

- 🔐 User Authentication (Signup, Login & Logout)
- 🏠 Create, Edit and Delete Listings
- 📝 Add and Delete Reviews
- ⭐ Review Validation
- 📷 Image Upload using Cloudinary
- ☁️ Cloud-based Image Storage
- 🔒 Secure Password Hashing using Passport.js
- 🍪 Session Management with Express Session
- 💾 MongoDB Atlas Database Support
- 💬 Flash Messages for User Feedback
- 🎨 Responsive UI with EJS Templates
- 🛡️ Server-side Validation using Joi
- 🔄 RESTful Routing

---

## 🛠️ Tech Stack

### Frontend
- HTML
- CSS
- JavaScript
- EJS
- Bootstrap

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### Authentication
- Passport.js
- Passport Local
- Passport Local Mongoose

### Cloud Storage
- Cloudinary
- Multer
- Multer Storage Cloudinary

### Other Packages
- Express Session
- Connect Mongo
- Connect Flash
- Joi
- Method Override
- Dotenv
- EJS Mate

---

## 📂 Project Structure

```
WanderLust/
│
├── models/
├── routes/
├── controllers/
├── middleware/
├── utils/
├── public/
│   ├── css/
│   ├── js/
│   └── images/
│
├── views/
│   ├── layouts/
│   ├── listings/
│   ├── users/
│   └── includes/
│
├── app.js
├── package.json
└── README.md
```

---

## ⚙️ Installation

### Clone the Repository

```bash
git clone https://github.com/SAGAR-RAJ1/-AirBnb-Reloaded.git
```

### Navigate to Project

```bash
cd -AirBnb-Reloaded
```

### Install Dependencies

```bash
npm install
```

### Create a `.env` File

```env
MONGODB_ATLAS=Your_MongoDB_Connection_String

SECRET=Your_Secret_Key

CLOUD_NAME=Your_Cloudinary_Name
CLOUD_API_KEY=Your_Api_Key
CLOUD_API_SECRET=Your_Api_Secret
```

### Start the Server

```bash
node app.js
```

or

```bash
nodemon app.js
```

The application will run on:

```
https://wonderlust-reloaded.onrender.com/listings
```

---

## 📸 Screenshots

Add screenshots of:

- Home Page
- Listing Details
- Create Listing
- Login
- Signup
- Review Section

Example:

```
screenshots/
│── home.png
│── listing.png
│── login.png
```

---

## 📌 Future Improvements

- Search functionality
- Wishlist/Favorites
- Booking system
- Maps integration
- Payment Gateway
- User Profile Page
- Filter Listings by Category
- Pagination

---

## 👨‍💻 Author

**Sagar Raj**

GitHub: https://github.com/SAGAR-RAJ1

---

## 📄 License

This project is developed for educational purposes as part of learning Full Stack Web Development.