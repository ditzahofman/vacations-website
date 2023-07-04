Vacation Website
Description

This repository contains the source code for a Vacation website. The website allows users to search and filter vacations based on different categories. It is built using a responsive design and utilizes a server-side language (Node.js) and a client-side language (React) to provide an interactive user experience.

The website is divided into three main entities: Admin, Guest, and Registered User. The admin has full management rights and can control vacations, users, and other data within the system. Guests are redirected to the registration page and do not have the ability to view vacations or perform searches, while registered users have various options such as browsing vacations, saving favorites, and viewing vacation details.

The website uses a MySQL database to store and retrieve data. It is deployed using Docker, which provides a containerized application for easy deployment and management.
Features

    Advanced vacation filtering based on categories
    Different user roles: Admin, Guest, and Registered User
    Responsive design for a seamless experience across devices
    MySQL database for data storage
    Docker deployment for easy setup and management

Getting Started

To get started with the Vacation website, follow these steps:

    Clone the repository: git clone <repository-url>
    Install the required dependencies by running npm install
    Set up the MySQL database and configure the connection in the code
    Build the project by running npm run build
    Start the server by running npm start
    Access the website by opening it in a web browser

Dependencies

The project has the following dependencies:

    Node.js: The server-side JavaScript runtime environment.
    React: The JavaScript library for building user interfaces.
    MySQL: The relational database management system.

Please refer to the package.json file for the complete list of dependencies and their versions.
