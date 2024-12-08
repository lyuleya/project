# Hotel Booking Management Application

## About the Project

The Hotel Booking Management Application is designed to streamline the process of managing room bookings. It provides functionality for both regular users and hotel administrators, offering a seamless experience for booking and tracking room reservations.

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

   - Create a `.env` file. Add the content from `.env.example`. Example:

   ```bash
   PORT=5001
   ```

   - Start the backend server:

   ```bash
   npm run start
   ```

   The backend server will run on http://localhost:5001 (port setup in .env)

3. #### Frontend Setup

   - Navigate to the frontend folder:

   ```bash
   cd frontend
   ```

   - Install dependencies:

   ```bash
   npm install
   ```

   - Create a `.env` file. Add the content from `.env.example`. Make sure the port matches the one specified in the backend's `.env` file. Example:

   ```bash
   VITE_API_BASE_URL=http://localhost:5001/api
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
- Verify that the ports in the backend `.env` and frontend `.env` match to enable proper communication.