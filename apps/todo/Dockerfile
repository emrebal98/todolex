FROM gradle:8-jdk17 AS build
WORKDIR /app
COPY . .
RUN gradle bootJar --no-daemon

FROM openjdk:17-jdk-slim
# curl for healthcheck
RUN apt-get update && apt-get install -y curl
WORKDIR /app
COPY --from=build /app/build/libs/*.jar todo.jar
CMD ["java", "-jar", "todo.jar"]