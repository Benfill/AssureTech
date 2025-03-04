FROM openjdk:8-jdk-alpine
RUN apk add --no-cache curl
VOLUME /tmp
COPY target/*.jar discovery-service.jar
ENTRYPOINT ["java","-jar","/discovery-service.jar"]