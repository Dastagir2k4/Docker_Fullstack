# ReservEat

ReservEat is a web application that allows users to reserve tables at hotels without having to wait in queues. Users can log in securely, browse available restaurants, book tables, and make payments seamlessly.

## Features

- **Secure Authentication**: User login is authenticated, and passwords are hashed using the bcrypt method for enhanced security.
- **Redux Store**: User data is stored in the Redux store after successful login, providing easy access to user information throughout the application.
- **Restaurant Reservation**: Users can browse available restaurants and book tables with ease.
- **Payment Integration**: Seamless integration with payment gateways allows users to make secure payments after entering their card details.
- **Email Confirmation**: Upon successful booking, a confirmation email is sent to the user's email address.

## Tech Stack

- **Frontend**: Built with React.js and styled using Tailwind CSS for a modern and responsive UI.
- **Backend**: Powered by Node.js and Express.js to handle server-side logic and API requests.
- **Database**: MySQL database is used to store user information, restaurant data, and booking details.
- **State Management**: Redux is utilized for efficient state management across components.

## Setup

1. Clone the repository:

```bash
   git clone https://github.com/your-username/ReservEat.git
# Frontend Dependencies (React.js with Tailwind CSS)
cd ReservEat/frontend
npm init -y
npm install react react-dom
npm install tailwindcss@latest postcss@latest autoprefixer@latest
npx tailwindcss init -p

# Backend Dependencies (Node.js with Express.js)
cd ../backend
npm init -y
npm install express body-parser cors bcrypt mysql
