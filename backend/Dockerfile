# Stage 1: Build the application
FROM eclipse-temurin:21-jdk-alpine AS build
WORKDIR /app

# Copy Maven wrapper files and pom.xml
COPY mvnw pom.xml ./
COPY .mvn .mvn

# Ensure wrapper script is executable
RUN chmod +x mvnw

# Download dependencies
RUN ./mvnw dependency:go-offline -B || true

# Copy source code and build JAR (skipping tests for faster deployment)
COPY src ./src
RUN ./mvnw clean package -DskipTests

# Stage 2: Run the application
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Create directory for file uploads
RUN mkdir -p /app/uploads

# Copy the built jar from build stage
COPY --from=build /app/target/*.jar app.jar

# Environment variable for port
ENV PORT=8080
EXPOSE 8080

# Execute Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]
