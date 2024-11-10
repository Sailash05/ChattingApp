# Build stage
FROM maven:3.8.5-openjdk-17 AS build
WORKDIR /app
COPY . .  # Copy everything from the current directory into the container's /app directory
RUN mvn clean package -DskipTests

# Production stage
FROM openjdk:17.0.1-jdk-slim
WORKDIR /app
COPY --from=build /app/target/chatting-application-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
