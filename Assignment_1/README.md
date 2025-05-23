# Assignment 1 - React Registration Form with Validation

## Overview

This project is a React.js application implementing a registration form with client-side validation **without using any third-party libraries**.  
The form collects user details and validates inputs such as email format, password complexity, phone number, Aadhar number, and more.  
On successful submission, it displays all the entered data on a new route.

---

## Features

- Fields:  
  - First Name (required)  
  - Last Name (required)  
  - Username (required)  
  - Email (required, valid format)  
  - Password (required, with show/hide toggle)  
  - Phone Number with Country Code (India, USA, UK)  
  - Country (dropdown)  
  - City (dependent dropdown based on country)  
  - PAN Number (required)  
  - Aadhar Number (12 digits, required for India)

- Real-time validation with user-friendly error messages  
- Submit button is disabled until the form is valid  
- Password requirements: minimum 8 characters, at least 1 uppercase, 1 lowercase, 1 number, and 1 special character  
- Proper validation for phone number length based on country  
- Clean and responsive UI styled with CSS

---

## How to Run

1. Clone the repository:

git clone https://github.com/DivyaniUpadhyay/CSI_Intern_assignments.git 

2. Navigate to the Assignment 1 folder:

cd CSI_Intern_assignments/Assignment_1

3. install
npm install

4. Start
   npm start

   # NOTE
   
1. This project uses React Router to navigate between the registration form and success page.

2. No backend integration included; this is a frontend-only implementation.

3. Validation is done using React hooks and JavaScript regex patterns.
