# Multi-stage build for Spring Boot application
FROM maven:3.9-eclipse-temurin-17 AS build

# Set working directory
WORKDIR /app

# Copy pom.xml and download dependencies (cached layer)
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy source code
COPY src ./src

# Build the application
RUN mvn clean package -DskipTests

# Production stage
FROM eclipse-temurin:17-jre-alpine

# Set working directory
WORKDIR /app

# Copy JAR from build stage
COPY --from=build /app/target/*.jar app.jar

# Expose port
EXPOSE 8080

# Set environment variables (can be overridden)
ENV SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/testdevops
ENV SPRING_DATASOURCE_USERNAME=devuser
ENV SPRING_DATASOURCE_PASSWORD=devpass123

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
