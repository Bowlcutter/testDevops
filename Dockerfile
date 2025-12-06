# Dockerfile - expects JAR to be built by CI/CD
FROM eclipse-temurin:17-jre-alpine

# Set working directory
WORKDIR /app

# Copy pre-built JAR from target directory
# CI/CD builds this with: mvn package
COPY target/*.jar app.jar

# Expose port
EXPOSE 8080

# Set environment variables (can be overridden at runtime)
ENV SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/testdevops
ENV SPRING_DATASOURCE_USERNAME=devuser
ENV SPRING_DATASOURCE_PASSWORD=devpass123

# Run
ENTRYPOINT ["java", "-jar", "app.jar"]
