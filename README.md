# Wanderlust — Accommodation Booking Platform

Wanderlust is a full-stack accommodation booking platform inspired by Airbnb.
It was built to practice end-to-end system design, authentication, and real-world CRUD workflows using Node.js and MongoDB.

## Live Demo
https://wanderlust.onrender.com
 (example – update if different)

## Demo Login

Email: demo@gmail.com

Password: demo

## Problem

Most tutorials focus on isolated features.
I wanted to build a complete system that connects:

Users

Listings

Images

Reviews

Authentication

Maps

Server-side rendering

## Solution

Wanderlust provides a full booking-style platform where users can:

Create and manage listings

Upload images

View listings on a map

Leave reviews

Authenticate securely

## Features

User authentication (Passport.js)

Create, edit, and delete listings

Image uploads with Cloudinary

Reviews and ratings

Interactive maps using Mapbox

Server-side rendered pages (EJS)

Flash messages and validations

Session-based authentication

## Tech Stack
### Backend

Node.js

Express.js

MongoDB (Mongoose)

Passport.js (Local Strategy)

Joi (validation)

### Frontend

EJS

Bootstrap (or custom CSS)

### Other Tools

Cloudinary (image storage)

Mapbox (maps)

Express Session + MongoDB Store

Render (deployment)

## Architecture

MVC-based backend structure

RESTful routing

Secure session handling

Modular route & controller design

## Project Structure
```csharp
├── models/        # Mongoose schemas
├── routes/        # Express routes
├── controllers/   # Business logic
├── views/         # EJS templates
├── public/        # Static assets
├── utils/         # Custom errors & helpers
├── app.js         # App entry point
```

## Running Locally
```bash
git clone https://github.com/Noobod/Wanderlust
cd Wanderlust
npm install
npm start
```

## Create a .env file:
```ini
ATLASDB_URL=your_mongodb_url
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_key
CLOUD_API_SECRET=your_secret
MAP_TOKEN=your_mapbox_token
SECRET=your_session_secret
```

## What I Learned

Designing relational data models in MongoDB

Implementing authentication with Passport

Handling file uploads securely

Building SSR apps with Express + EJS

Validations, error handling, and UX feedback

Deploying full-stack apps to Render
