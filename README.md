## Spring Boot Application With React

### Pre Requisites
1. Clone Repository
  ```
    git clone https://github.com/nil1729/spring-react-p1.git
  ```
2. Any IDE for Java Environment. I am using `IntelliJ Ulitimate Student`
3. `Docker Desktop` installed on local machine

### Setup `PostgreSQL` Docker container
- Creating `PostgreSQL` Container
    ```
    docker run \
        --name=postgres_db \
        -v postgres_data:/var/lib/postgresql/data \
        -e POSTGRES_PASSWORD=password \
        -p 5432:5432 \
        --rm -d \
        postgres:13
    ```
- Run this command to log into `Postgres` database
  ```
    docker exec -it postgres_db psql -U postgres
  ```
- Create new Database
  ```
    CREATE DATABASE v2_react_spring_demo;
  ``` 

### Backend Setup (Spring Boot Application)
- Open this project using any Java IDE
- Install Maven Dependencies
- Change `application-dev.properties` file to change the `PORT` and Database properties
- Before running the Application change the profile to `dev` using edit configuration

### Frontend Setup (React)
- Navigate to `/src/frontend` and install all dependencies via `npm install`
- Create a new file `.env.development` on the root directory and set your `BACKEND_HOST_URL` (for example see `.env.sample`)
- Run the frontend via `npm start` and open `http://localhost:3000`

