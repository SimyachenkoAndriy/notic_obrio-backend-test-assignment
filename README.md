
# NOTIC | Obrio Backend Test Assignment

### Quick Start

Quick start for a test with a 10-second delay ([the user record request is not sent automatically](#usage)):

```bash
git clone https://github.com/SimyachenkoAndriy/notic_obrio-backend-test-assignment
cd notic_obrio-backend-test-assignment
NOTIFICATION_DELAY=10000 WEBHOOK_URL=https://webhook-test.com/31f65c9bf3cdc397178ec6fc5e6fb551 docker-compose up --build
```

```bash
  NOTIFICATION_DELAY={desired delay time} WEBHOOK_URL={target hook} docker-compose up --build
```

---


- [Overview](#overview)
- [Architecture](#architecture)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Environment Variables](#environment-variables)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Usage](#usage)

---

## Overview

- **Notification Service**: Processes and sends notifications using the Bull library to manage background jobs and interacts with a webhook for push notifications.
- **User Service**: Manages user data and persists it in a MySQL database. On user creation, it schedules a notification job via a shared Redis-backed queue.

---

## Architecture

This application follows a microservices architecture and utilizes Docker-based containerization:

- **Docker Compose** orchestrates:
  - **MySQL**: Database service for user persistence.
  - **Redis**: Queue manager used by Bull to handle asynchronous jobs.
  - **Notification Service**: Processes notification jobs.
  - **User Service**: Manages user data and schedules notification jobs.

Inter-service communication is managed through **Redis** queues. Both services are built using NestJS, employing TypeORM (User Service) and Bull (Notification Service).

---

## Features

- **Microservices**: Separate services for handling notifications and user management.
- **Queue Management**: Utilizes Bull with Redis for processing background tasks.
- **Database Integration**: Integrates MySQL via TypeORM for the User Service.
- **Dockerized Environment**: Simplified setup and deployment using Docker Compose.
- **Environment Configuration**: Parameters for webhook URLs, notification delays, and service ports can be easily configured.

---

## Getting Started

### Prerequisites

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- Node.js (if running services outside of Docker)

### Environment Variables

The project uses environment variables to simplify testing different configurations without code changes.

- **NOTIFICATION_DELAY**: Sets the delay between notifications (in milliseconds), allowing you to simulate various notification intervals.
- **WEBHOOK_URL**: Specifies the target URL (webhook endpoint) for sending notifications.

### Installation

Clone the repository and navigate to the project directory:

```bash
git clone https://github.com/SimyachenkoAndriy/notic_obrio-backend-test-assignment
cd notic_obrio-backend-test-assignment
```

### Running the Application

**Examples:**

- With a 10-second delay:

  ```bash
  NOTIFICATION_DELAY=10000 WEBHOOK_URL=https://webhook-test.com/31f65c9bf3cdc397178ec6fc5e6fb551 docker-compose up --build
  ```

- With a 24-hour delay (default):

  ```bash
  NOTIFICATION_DELAY=86400000 WEBHOOK_URL=https://webhook-test.com/31f65c9bf3cdc397178ec6fc5e6fb551 docker-compose up --build
  ```

**What Happens:**

- **Docker Images are Built:** Both microservices are containerized.
- **All Services Start:** MySQL, Redis, Notification Service, and User Service are launched.
- **Port Mapping:**
  - MySQL: Port 3306
  - Redis: Port 6379
  - Notification Service: Port 2222
  - User Service: Port 1111

This setup ensures that all necessary components are running and properly configured for development and testing.

---

## Project Structure

```
NOTIC_OBRIO-BACKEND-TEST-ASSIGNMENT
├─ notification-service
│  ├─ src
│  │  ├─ app.module.ts                # NestJS module with Bull configuration for notifications
│  │  ├─ main.ts                      # Application entry point
│  │  ├─ types
│  │  │  └─ notification.types.ts     # Notification data types
│  │  └─ notification
│  │     └─ notification.processor.ts # Processes 'send-notification' jobs via webhook
│  └─ yarn.lock
├─ user-service
│  ├─ src
│  │  ├─ app.module.ts                # Main NestJS module with TypeORM and Bull configuration
│  │  ├─ main.ts                      # Application entry point with global validation pipe
│  │  ├─ user
│  │  │  ├─ user.controller.ts         # Endpoints for user creation and listing
│  │  │  ├─ user.dto.ts                # DTO for user creation
│  │  │  ├─ user.module.ts             # User module definition
│  │  │  └─ user.service.ts            # Business logic and scheduling notifications
│  │  ├─ config
│  │  │  ├─ bull.config.ts             # Redis/Bull configuration
│  │  │  └─ typeorm.config.ts          # MySQL configuration for TypeORM
│  │  └─ queues
│  │     └─ notification.queue.ts     # Queue definition for notifications
│  └─ yarn.lock
└─ docker-compose.yml                  # Orchestrates all services (MySQL, Redis, Notification Service, User Service)
```

![image](https://github.com/user-attachments/assets/65a3a33d-9ca5-4aaf-b4a7-4a5f5f0e8fd4)


---

## Usage

### API Endpoints (User Service)

- **Create a User**

  **Endpoint:**

  ```
  POST /users
  ```

  **Headers:**

  ```
  Content-Type: application/json
  ```

  **Body:**

  ```json
  {
    "name": "John Doe"
  }
  ```

This endpoint creates a new user and schedules a notification job to be processed after the configured delay.

