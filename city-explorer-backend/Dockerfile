# Use AdoptOpenJDK 21 as the base image
FROM adoptopenjdk:21-jdk-hotspot

# Set the working directory inside the container
WORKDIR /app

# Copy the compiled JAR file into the container at /app
COPY build/libs/*.jar app.jar

# Expose the port that the application runs on
EXPOSE 8080

# Run the Spring Boot application with environment variables
CMD ["java", "-Dspring.profiles.active=docker", "-jar", "app.jar"]
