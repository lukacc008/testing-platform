Application Overview:

I developed a comprehensive web application designed to streamline the hiring process for companies by allowing users to take skill-based tests. The app consists of a frontend and backend architecture, integrating several features to ensure a smooth and secure experience for both applicants and administrators.

Key Features:

User Authentication & Role Management:

New users must register and log in, with all data stored in a MongoDB database.
The app supports role-based access control, with users assigned either "Admin" or "User" roles. Admins can view and manage test results, while regular users can only take tests.
Dynamic Test Interface:

Users can select from a variety of available tests, each displayed on cards with details like the number of questions and test description.
Each test presents questions with four possible answers (one correct) and includes a timer to ensure time management during testing.
An instruction page precedes each test, warning users that if they switch tabs or minimize the window, the current question will be marked as incorrect, with an alert displayed via the Material-UI (MUI) library.
Test Result Tracking:

Upon completing a test, the results are logged into the MongoDB database, including the user’s name, email, correct/wrong/skipped answers, and timestamp.
These results can be accessed and managed by Admin users via a separate "Results" section in the app’s navigation.
Admin Panel for Result Management:

Admins have access to a results management interface, which includes features like table sorting, pagination, and customizable row display options to effectively review test outcomes for all users.
Technology Stack:

Frontend: React.js with Material-UI for component styling and user interface design.
Backend: Node.js with Express for API handling, integrated with MongoDB for data storage.
Database: MongoDB for storing user data, test results, and managing user roles.
Authentication: Custom user authentication with role-based access control for Admins and Users.
This app was built with scalability and security in mind, ensuring a robust experience for both job applicants and administrators, while also maintaining data integrity and a smooth user experience.
