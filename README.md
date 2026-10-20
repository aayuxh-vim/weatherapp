# Weather Dashboard

A React-based Weather Dashboard with a Gruvbox-inspired interface.

The application uses the Open-Meteo API to fetch weather information based
on the city entered by the user.

## Technologies Used

- React
- JavaScript
- Open-Meteo API
- Docker
- Nginx
- Jenkins
- Docker Hub
- Kubernetes
- Minikube
- GitHub

## Application Features

- Search weather by city
- Display current temperature
- Display humidity
- Display wind speed
- Display atmospheric pressure
- Display 5-day weather forecast
- Gruvbox-inspired user interface

## CI/CD Pipeline

The project uses Jenkins to automate the following workflow:

1. Jenkins checks out the latest source code from GitHub.
2. Node.js dependencies are installed using `npm ci`.
3. Automated tests are executed.
4. The React application is built.
5. A Docker image is created.
6. The Docker image is pushed to Docker Hub.
7. Kubernetes manifests are applied to Minikube.
8. The Kubernetes deployment is restarted and verified.

## Docker

The application uses a multi-stage Docker build.

The React application is first built using Node.js and then served
using Nginx.

Docker image:

`aayuxh/weatherapp:latest`

## Kubernetes

The application is deployed on Minikube using:

- Kubernetes Deployment
- Kubernetes Service

The Deployment runs two replicas of the application.

The Service exposes the application using NodePort.

## Repository Structure

```text
weatherapp/
├── public/
├── src/
├── k8s/
│   ├── deployment.yaml
│   └── service.yaml
├── Dockerfile
├── Jenkinsfile
├── package.json
└── README.md
