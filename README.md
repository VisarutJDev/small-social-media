# Small Social Media

This project is a small social media application built using Next.js. It provides functionalities for user management, creating posts, and interacting with posts. This README will guide you through setting up the project, running tests, and understanding how to interact with the application.

## Table of Contents
1. [Setup Instructions](#setup-instructions)
2. [Running Tests](#running-tests)
3. [Application Overview](#application-overview)
4. [Interacting with the Application](#interacting-with-the-application)

## Setup Instructions

To set up the project locally, follow these steps:

1. **Install Node.js**: Ensure that you have Node.js installed on your machine. You can download it from the [official Node.js website](https://nodejs.org/).

2. **Clone the Repository**: Clone the repository to your local machine using:
    ```sh
    git clone https://github.com/VisarutJDev/small-social-media.git
    cd small-social-media
    ```

3. **Install Dependencies**: Install the required dependencies using:
    ```sh
    npm install
    ```

4. **Configure Environment Variables**: Set up your environment variables. Create a `.env.local` file in the root directory and add necessary configurations (e.g., database connection strings, API keys).

5. **Run the Application**: Start the development server using:
    ```sh
    npm run dev
    ```

    The application will be available at `http://localhost:3000`.

## Running Tests

To ensure the application is working correctly, you can run the tests included in the project. Follow these steps:

1. **Navigate to the Project Directory**: Ensure you are in the project directory.
    ```sh
    cd small-social-media
    ```

2. **Run Tests**: Execute the following command to run all tests:
    ```sh
    npm test
    ```

## Application Overview

The Small Social Media application is designed to provide a platform for users to create and interact with social media posts. It includes functionalities such as user registration, authentication, post creation, and interaction management.

### Features:
- **User Management**: Register, authenticate, and manage user profiles.
- **Post Management**: Create, update, delete, and retrieve posts.

## Interacting with the Application

The application provides a user-friendly interface to interact with the social media platform. Below are examples of how to use some of the main features.

### User Registration

To register a new user, navigate to the registration page and fill out the required fields such as email, and password.

### User Authentication

To log in, navigate to the login page and enter your registered email and password. Once logged in, you will be able to access your profile and create new posts.

### Create a Post

To create a new post, navigate to the create post page and fill out the required fields such as the post title and content. After submitting, the post will be visible on the main feed.

### Edit a Post

To edit a post, click the edit button associated with the post. Edit message and comfirm to update or cancel to abort edit opration.

### Delete on a Post

To delete on a post, click the delete button associated with the post. Message will be delete.
