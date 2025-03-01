# Full Stack Application

This repository contains a full-stack web application built using modern technologies for both the frontend and backend. The application is designed to be scalable, maintainable, and efficient, leveraging a robust tech stack that includes React.js, Next.js, Material-UI, Redux-Toolkit, Node.js, Express.Js and Mongodb.

## Tech Stack

### Frontend

- **React.js**: A JavaScript library for building interactive user interfaces.
- **Next.js**: A React framework that enables server-side rendering (SSR) and static site generation (SSG) for better performance and SEO.
- **Material-UI**: A React UI framework that provides pre-built, customizable components following Google's Material Design principles.
- **Redux-Toolkit**: A state management library that simplifies Redux development with a more efficient and structured approach.

### Backend

- **Typescript**: A high-level programming language known for its simplicity and versatility.
- **Express.Js**: A modern web framework for building APIs high performance.
- **Node.js**: A free, open-source, cross-platform JavaScript runtime environment that lets developers create servers, web apps, command line tools and scripts.

### Database

- **Mongodb**: A powerful, open-source database management system (NoSQL) known for its performance, scalability, and reliability.

### Docker
Package and run applications in isolated containers,

## Features

- Full authentication system (JWT-based authentication and authorization)
- RESTful API built with Express.Js
- Frontend with dynamic and static page generation using Next.js
- State management with Redux-Toolkit for a predictable and maintainable application state
- Material-UI components for a modern and responsive UI design
- Mongodb database integration with optimized queries
- Deployment-ready architecture that can be easily containerized using Docker

## Installation and Setup

### Prerequisites

- Ensure you have the following installed:
- Node.js (for frontend development)
- Node.js 20.0+ (for backend development)
- Mongodb (for database management)

## Backend Setup
1. Clone the repository:
```bash
    git clone https://github.com/balajihambeere/raptai.git
    cd raptai
    cd fast-next-app/backend
```

2. Create a virtual environment and activate it:
```bash
    python -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
```
3. Install dependencies:
```bash
    pip install -r requirements.txt
```
4. Run the FastAPI server:
```bash
    uvicorn main:app --reload
```
The API should now be running at http://localhost:3200.

## Frontend Setup
1. Navigate to the frontend directory:
```bash
    cd ../frontend
```

2. Install dependencies:
```bash
    npm install
```
3. Start the development server:
```bash
    npm run dev
```
The application should now be accessible at http://localhost:3000.

## API Documentation
FastAPI provides automatic API documentation, which can be accessed at:

- Swagger UI: http://localhost:3200/api-docs/

## Contributing

1. Fork the repository
2. Create a feature branch (git checkout -b feature-name)
3. Commit your changes (git commit -m "Add feature")
4. Push to the branch (git push origin feature-name)
5. Open a Pull Request

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contact

For any questions or suggestions, feel free to open an issue or reach out via GitHub Discussions.