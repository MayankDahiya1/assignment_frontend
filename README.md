
### Frontend README

**admin-panel-frontend/README.md:**


# Admin Panel Frontend

This is the frontend application for the Admin Panel. It provides a user interface for managing users, including user creation, updating, deletion, and retrieval with pagination support.

## Technologies Used

- React
- Redux
- Redux Thunk
- React Bootstrap
- Axios

## Prerequisites

- Node.js (v18.12.0 or higher)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/admin-panel-frontend.git
   cd admin-panel-frontend
   ```
   
2. Install the dependencies:
    ```bash
        pnpm install
    ```

3. Create a .env file in the root directory and add the following environment variables:
    ```bash
        REACT_APP_API_URL=http://localhost:5000/api
    ```

## Running the Application

To start the application, run:
```bash
    pnpm start
```

The application will run on http://localhost:3000.

## Available Scripts
In the project directory, you can run:

npm start - Runs the app in the development mode
npm test - Launches the test runner in the interactive watch mode
npm run build - Builds the app for production to the build folder

## Directory Structure

``` bash
admin-panel-frontend/
├── public/
│   └── index.html
├── src/
│   ├── actions/
│   │   ├── authActions.js
│   │   └── userActions.js
│   ├── components/
│   │   ├── Login.js
│   │   └── UserList.js
│   ├── pages/
│   │   ├── Login.js
│   │   └── UserList.js
│   ├── reducers/
│   │   ├── authReducer.js
│   │   └── userReducer.js
│   ├── store/
│   │   ├── index.js
│   │   └── types.js
│   ├── utils/
│   │   └── api.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── .env
├── package.json
└── README.md
```

