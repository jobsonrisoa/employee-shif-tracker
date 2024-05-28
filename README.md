# Employee Shift Tracker API

## Overview

The Employee Shift Tracker API is designed to manage employee data and track their shifts, providing functionalities for creating employees, starting and ending shifts, and retrieving total work hours.

## Technologies Used

- **TypeScript**: A strongly typed programming language that builds on JavaScript.
- **Express**: A minimal and flexible Node.js web application framework.
- **Sequelize**: A promise-based Node.js ORM for Postgres.
- **PostgreSQL**: A powerful, open-source object-relational database system.
- **Jest**: A delightful JavaScript Testing Framework with a focus on simplicity.
- **Swagger**: Simplifies API development by providing a unified RESTful API interface.
- **Docker**: A platform for developing, shipping, and running applications in containers.

## Project Structure

src
│
├── data
│ ├── data-sources
│ │ └── sequelize
│ │ ├── models
│ │ │ └── employee.ts
│ │ │ └── shift.ts
│ │ ├── sequelize-employee-data-source.ts
│ │ └── sequelize-shift-data-source.ts
│ └── interfaces
│ ├── database-wrapper.ts
│ ├── employee-data-source.ts
│ └── shift-data-source.ts
│
├── domain
│ ├── models
│ │ ├── employee.ts
│ │ └── shift.ts
│ ├── use-cases
│ │ └── employee
│ │ ├── create-employee.ts
│ │ └── get-employee.ts
│ │ └── shift
│ │ ├── start-shift.ts
│ │ └── end-shift.ts
│ ├── repositories
│ │ ├── employee-repository.ts
│ │ └── shift-repository.ts
│ └── interfaces
│ ├── IEmployeeRepository.ts
│ └── IShiftRepository.ts
│
├── presentation
│ ├── routes
│ │ ├── employee-router.ts
│ │ └── shift-router.ts
│
├── main.ts
├── server.ts
└── tests
├── routes
│ ├── employee-routes.test.ts
│ └── shift-routes.test.ts


## Getting Started

### Prerequisites

- Node.js (>=14.x)
- Docker (for containerized PostgreSQL)
- PostgreSQL

### Installation

1. Clone the repository:

```sh
git clone https://github.com/yourusername/employee-shift-tracker.git](https://github.com/jobsonrisoa/employee-shif-tracker
cd employee-shift-tracker

2. Install dependencies:

npm install

3. Create a .env file in the root directory with the following content:

DATABASE_URL=your_database_url
TEST_DATABASE_URL=your_test_database_url

### Running the Application

1. Start the PostgreSQL database using Docker:

docker-compose up -d

2. Run the database migrations:

npx sequelize-cli db:migrate

3. Start the application:

npm start

The application will be running on http://localhost:3000.

Visit http://localhost:3000/api-docs to view the Swagger documentation.

### Running Tests

1. Ensure the TEST_DATABASE_URL is correctly set in your .env file.

2. Run the tests:

npm test



