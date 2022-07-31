FROM alpine:edge

RUN apk add --no-cache openjdk8
RUN apk add --no-cache maven

WORKDIR /app
COPY . /app

RUN mvn clean install -Pproduction-api-server

CMD ["java", "-jar", "target/spring-react-0.0.1-SNAPSHOT.jar"]