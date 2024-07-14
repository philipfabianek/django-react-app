# Django-React Application

This project consists of a Django backend and a React frontend. It was created as an example project for my video about deploying Django-React apps on a Linux VPS available at https://youtu.be/E9Ly_rASuS8.

## Directory Structure

```
backend/     # Django project
frontend/    # React project
```

## Backend Setup (Django)

1. Navigate to the backend directory:
    ```sh
    cd backend
    ```
2. Create a virtual environment:
    ```sh
    python -m venv venv
    ```
3. Activate the virtual environment:
- On Windows:
    ```sh
    venv\Scripts\activate
    ```
- On macOS and Linux:
    ```sh
    source venv/bin/activate
    ```
4. Install required packages:
    ```sh
    pip install -r requirements.txt
    ```
5. Create database
6. Set up environment variables:
Create a `.env` file with the following content:
    ```
    SECRET_KEY='django-secret-key'
    DEBUG=True
    SESSION_COOKIE_SECURE=False
    CSRF_COOKIE_SECURE=False
    ALLOWED_HOSTS=localhost
    DATABASE_URL=postgres://appuser:asd123123@127.0.0.1:5432/appdb
    CSRF_TRUSTED_ORIGINS=http://localhost:3000,http://localhost:8000
    ```
7. Run migrations:
    ```sh
    python manage.py migrate
    ```
8. Start the Django development server:
    ```sh
    python manage.py runserver
    ```

## Frontend Setup (React)

1. Navigate to the frontend directory:
    ```sh
    cd frontend
    ```
2. Install dependencies using Bun:
    ```sh
    bun install
    ```
3. Start the development server:
    ```sh
    bun run dev
    ```
4. To build the project:
    ```sh
    bun run build
    ```
5. To run linting:
    ```sh
    bun run lint
    ```

## Additional Information

- The frontend uses Vite as the build tool and development server.
- TypeScript is used in the frontend project.
- The backend uses PostgreSQL as the database. Make sure to have PostgreSQL installed and running with the appropriate credentials as specified in the `DATABASE_URL` environment variable.
- CSRF protection is enabled for the frontend-backend communication.

## Running the Application

1. Start the Django backend server.
2. Start the React frontend development server.
3. Access the application at `http://localhost:3000`.

Note: Make sure both the backend and frontend servers are running simultaneously for the full application to work.