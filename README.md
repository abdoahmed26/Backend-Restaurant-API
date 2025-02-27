# 🎨 **Restaurant API**

A Restaurant APIs implemented with (Node.js, Express.js, MongoDB)


## ✨ Follow Me
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=flat&logo=linkedin&labelColor=blue)](https://www.linkedin.com/in/abdo-ahmed-67185a28a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app)
 [![GitHub](https://img.shields.io/badge/GitHub-Follow-black?style=flat&logo=github&labelColor=black)](https://github.com/abdoahmed26)


## 📋 Table of content
- [Installation](#Installation)
- [Usage](#Usage)
- [Tech Stack](#Tech-Stack)
- [Features](#Features)
- [Documentation](#Documentation)

## 📥 Installation

1- **Clone the repo**

```bash
git clone https://github.com/abdoahmed26/Backend-Restaurant-API.git
cd Backend-Restaurant-API
```
2- **Install dependencies**

```bash
npm install
```
3- **Setup environment variables**
```env
DB_USER = your database user

DB_DATABASE = your database name

DB_PASSWORD = your database password

DB_HOST = your database host

DB_PORT = your database port

CLOUDINARY_CLOUD_NAME = your cloudinary cloud name

CLOUDINARY_API_KEY = your cloudinary api key

CLOUDINARY_API_SECRET = your cloudinary api secret

CLOUDINARY_FOLDER_NAME = your cloudinary folder name

STRIPE_SCRET_KEY = your stripe scret key

JWT_SCRET_KEY = random value

PORT = your port ex(5000)

NODE = development / producation
```

## 🔧 Usage

```bash
npm run dev
```

## 🚀 Tech Stack
- **Node.js**: JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express**: Web application framework for Node.js.
- **PostgreSQL**: SQL database.
- **Multer**: Middleware for handling multipart/form-data,   primarily used for file uploads.
- **Cloudinary**: Cloud-based image and video management.
- **Stripe**: Payment processing.
- **Helmet**: Middleware for help secure Express apps.
- **Express Rate Limit**: Middleware for limit repeated requests to public APIs and/or endpoints.
- **Express Validator**: Middleware for server-side validation.
- **Compression**: Middleware to compress response bodies.
- **Dotenv**: Module to load environment variables from a .env file.
- **CORS**: Middleware to enable CORS.
- **Bcrypt**: Library to hash passwords.
- **Nodemailer**: Library for sending email
- **Jsonwebtoken**: Library for sign and verify token 


## ⚙ Features

- **👤 User Management** 
    - user can register new account or use  his google account
    - user can login 
    - user can update his (personal infos, email, profile image, password)
    - user can reset his password in case of forgotten 
- **Category Management**
    - user can read all categories
    - admins and manager can (create, update, delete) category
    - user can see food categories
- **Foods Management**
    - user can read all foods
    - admins and manager can (create, update, delete) foods
- **Shopping cart management**
    - user cant add or update or delete items to cart
- **File uploads Management**
    - admin and manager can upload images for cattegories and foods
    - user can upload image for profile image 
- **Reviews Management**
    - users can add review about the food, can update or delete it, and can view all reviews
- **Payment**
    - user can pay the price of foods using stripe

## Documentation

**[Documentation](https://documenter.getpostman.com/view/31014616/2sAYHxoQEh)**