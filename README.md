# Hotel Booking Management Application

## About the Project

[The Hotel Booking Management Application](https://hotel_booking_project.surge.sh/) is designed to streamline the process of managing room bookings. It provides functionality for both regular users and hotel administrators, offering a seamless experience for booking and tracking room reservations.

## Features

### For Users:

- Browse all hotel rooms with detailed descriptions and images.
- Filter rooms based on criteria such as dates and guest numbers.
- Book room for specific dates.
- View and manage their own bookings, delete bookings if needed.

### For Hotel Administrators:

- Access reports of all bookings.
- View detailed booking information, including user details and payment statuses.
- Filter bookings based on date ranges and payment statuses.

## Technologies Used

- **Frontend:** React, React Router, Vite
- **Backend:** Express.js
- **Database:** JSON files used as mock data
- **Styling:** Bootstrap

## Getting Started

### Prerequisites

Ensure the following are installed:

- **Node.js** (v18 or above)
- **npm** (v9 or above)

### Setup Instructions

1. #### Clone the repository:

   ```bash
   git clone <repository-url>
   cd project
   ```

2. #### Backend Setup

   - Navigate to the backend folder:

   ```bash
   cd backend
   ```

   - Install dependencies:

   ```bash
   npm install
   ```

   - Start the backend server:

   ```bash
   npm run start
   ```

   The backend server will run on http://localhost:5001

3. #### Frontend Setup

   - Navigate to the frontend folder:

   ```bash
   cd frontend
   ```

   - Install dependencies:

   ```bash
   npm install
   ```

   - Run the application locally:

   ```bash
   npm run start
   ```

   The frontend will be available at http://localhost:5173

   - Alternatively, build and serve the application:

   ```bash
   npm run build
   npm run start:dist
   ```

   The built application will be available at http://localhost:3000

## Notes

- Ensure the backend server is running before starting the frontend application.

## DEMO

[https://hotel_booking_project.surge.sh/](https://hotel_booking_project.surge.sh/)

- **Admin:**
  ```
  email: admin@gmail.com
  password: admin
  ```
- **User:**
  ```
  email: user@gmail.com
  password: user
  ```
