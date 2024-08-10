# Order Matching System

This project implements an order matching system similar to stock exchanges, using Express.js for the backend, MongoDB for the database, and React.js for the frontend.

## Features

- Place buy and sell orders
- Automatic order matching based on price and time priority
- Real-time updates of pending and completed orders
- Dynamic price chart showing matched order prices
- RESTful API for order placement and retrieval

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js 
- MongoDB 

## Installation

1. Clone the repository:
 
  ```
   git clone https://github.com/Phanindrababu5868/Order-Matching-System.git
   cd order-matching-system
  ```
2. Install backend dependencies:
  
  ```
   cd backend
   npm install
  ```
3. Install frontend dependencies:

 ```
  cd ../frontend
  npm install

 ```
4. Create a `.env` file in the backend directory with the following content:
 ```
  MONGODB_URI=mongoDB_url
  PORT=5000

 ```
## Running the Application

1. Start the backend server:
  ```
  cd backend
  node server.js

  ```
2. In a new terminal, start the frontend development server:
```
 cd frontend
 npm start

 ```

4. Open your browser and navigate to `http://localhost:5173` to view the application.

## API Endpoints

- `POST /api/orders/place`: Place a new order
- `GET /api/orders/pending`: Retrieve all pending orders
- `GET /api/orders/completed`: Retrieve all completed orders

## Project Structure

```
order-matching-system/
|
├── backend/
│   ├── models/
│   │   ├── PendingOrder.js
│   │   └── CompletedOrder.js
│   ├── routes/
│   │   └── orders.js
│   ├── services/
│   │   └── orderMatchingService.js
│   ├── config.js
│   ├── server.js
│   └── package.json
|
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── OrderForm.jsx
│   │   │   ├── PendingOrdersTable.jsx
│   │   │   ├── CompletedOrdersTable.jsx
│   │   │   └── PriceChart.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── README.md
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.


Happy Coding;
















