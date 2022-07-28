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

### Frontend Deployment
- I deployed my frontend on the `Netlify` CDN.
- Here I am describing the procedure for the same (Root directory `src/frontend`)
  - Install `netlify-cli` using `npm`
    ```
      npm install -D netlify-cli
    ``` 
  - Login to `Netlify` account
    ```
      netlify login
    ```
  - Create a new file `.env.production` which contains the `BACKEND_HOST_URL` (which hosted on some remote server)
  - Build the frontend project using `npm run build`
  - Deploy the project on the `Netlify` 
    ```
      netlify deploy --prod -d build
    ``` 
    
### Backend Deployment (API)
- I deployed my Spring Boot Backend on the `Digital Ocean` Droplet and for the Database, I am using a `PostgreSQL` Database instance on the `Digital Ocean` Platform.
- These are the steps to deploy the Backend to any Standalone VPS (Ubuntu 20+)
  - Create a new User (set the password as well for this user) and add the user to the `sudoers` Group 
     ```
        $ sudo useradd nil1729
        $ usermod -aG sudo nil1729
     ```
  - Login using the new user `ssh nil1729@<ip_address>` and Setup Java environment
     ```
        $ sudo apt update
        $ sudo apt install default-jre
        $ java -version # 11.x.x
        $ sudo apt install default-jdk
        $ javac -version # 11.x.x
     ```
  - Install `Maven`
     ```
        $ sudo apt update
        $ sudo apt install maven
        $ mvn -version # 3.x.x
     ```
  - Clone the repository on the VPS (you may need a personal access token if repository is private)
  - Navigate to the project directory. First we need to create a application properties file for `production` environment with given properties.
     ```
        server:
         port: 5000
         error:
           include-message: always
         servlet:
           context-path: /api

        spring:
          datasource:
            hikari:
              jdbc-url: jdbc:postgresql://<DATABASE_HOST_URL>:<DATABASE_PORT>/<DATABASE_NAME>
              username: <DATABASE_USER>
              password: <DATABASE_PASSWORD>
              maximum-pool-size: 20
     ```
     ```
        $ cd src/main/resources
        $ nano application-prod.yml
     ```
  - Install all dependencies and Create a `JAR` file to deploy
    ```
      $ mvn clean install -Pproduction-api-server
    ``` 
  - Now create a `spring-react-p1.service` file on user home directory with the following content
    ```
      [Unit]
      Description=Spring Boot API
      After=network.target
      StartLimitIntervalSec=0
      [Service]
      Type=simple
      Restart=always
      RestartSec=1
      User=nil1729
      ExecStart=java -jar <absolute path to JAR file>
      [Install]
      WantedBy=multi-user.target
    ```
  - Now set up the service file to execute by our system
    ```
      $ sudo cp spring-react-p1.service /etc/systemd/system/spring-react-p1.service
      $ sudo chmod 644 /etc/systemd/system/spring-react-p1.service
      $ sudo systemctl start spring-react-p1
      $ sudo systemctl status spring-react-p1
      $ sudo systemctl enable spring-react-p1
    ``` 
  - Now we can access our API(s) via `http://<ip_address>:5000/api/v1/students`.
  - Now we have to set up Firewall to allow only `http`, `https` and `ssh` traffic.
    ```
      $ sudo ufw enable
      $ sudo ufw status
      $ sudo ufw allow ssh (Port 22)
      $ sudo ufw allow http (Port 80)
      $ sudo ufw allow https (Port 443)
    ```
  - Setup Nginx to pass the incoming `http` traffic to `http://localhost:5000`
    ```
      $ sudo apt install nginx
      $ sudo nano /etc/nginx/sites-available/default
    ``` 
  - Add the Following to the location part of the server block
    ```
        server_name yourdomain.com www.yourdomain.com;

        location / {
           proxy_pass http://localhost:5000; #whatever port your app runs on
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
        }
    ``` 
  - Add `SSL` with `Let's Encrypt`
    ```
      $ sudo apt install certbot python3-certbot-nginx
      $ sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
    ```
    
### References
- [Java installation Ubuntu](https://www.digitalocean.com/community/tutorials/how-to-install-java-with-apt-on-ubuntu-22-04#step-3-setting-the-java_home-environment-variable)
- [Maven installation](https://linuxize.com/post/how-to-install-apache-maven-on-ubuntu-18-04/)
- [Deployment using Digital Ocean](https://gsswain.medium.com/springboot-digitalocean-droplets-410b8bbc6fe6)
- [Service File Setup](https://www.linode.com/docs/guides/start-service-at-boot/)
- [Nginx Setup](https://gist.github.com/bradtraversy/cd90d1ed3c462fe3bddd11bf8953a896)
