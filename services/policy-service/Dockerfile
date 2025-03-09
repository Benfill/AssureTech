FROM openjdk:8-jdk-alpine
RUN apk add --no-cache curl
VOLUME /tmp
COPY target/*.jar policy-service.jar
ENTRYPOINT ["java","-jar","/policy-service.jar"]
