# **Dental Service App**

A modern dental service application that allows users to book appointments, manage schedules, and access dental services with ease. This project is built using cutting-edge technologies to ensure a seamless user experience.

---

## **Watch the short walk through video of the project**
https://www.loom.com/share/90c6f92f2afe4c89b7881dd0cc71f2e3?sid=108fce6d-27fa-49c0-9b2d-1c07d330141e

## **Features**
- User authentication (Sign Up, Login, Logout).
- Role-based access (Admin and User).
- Appointment booking system.
- Dentist selection and time slot management.
- Dynamic and responsive UI.
- MongoDB integration for data persistence.
- API endpoints for CRUD operations.

---

## **Tech Stack**
### **Frontend**
- **React**: For building the user interface.
- **Next.js**: For server-side rendering and API routes.
- **Tailwind CSS**: For styling and responsive design.

### **Backend**
- **Node.js**: For server-side logic.
- **MongoDB**: For database management.
- **Mongoose**: For object data modeling (ODM).

### **Tools**
- **VS Code**: Code editor.
- **Postman**: For API testing.
- **Git**: Version control.
- **GitHub**: Repository hosting.

---

## **Libraries Used**
Here’s a list of libraries used in the project:

| Library               | Purpose                                                                 |
|-----------------------|-------------------------------------------------------------------------|
| `next`               | Framework for React with server-side rendering and API routes.         |
| `react`              | Library for building user interfaces.                                  |
| `react-dom`          | DOM rendering for React.                                               |
| `tailwindcss`        | Utility-first CSS framework for styling.                               |
| `mongodb`            | MongoDB driver for Node.js.                                            |
| `mongoose`           | ODM for MongoDB.                                                      |
| `bcrypt`             | Password hashing for authentication.                                   |
| `jsonwebtoken`       | Token-based authentication.                                            |
| `zod`                | Schema validation for API requests.                                    |
| `react-icons`        | Icon library for React.                                                |
| `date-fns`           | Date utility library for formatting and manipulation.                  |

---

## **Folder Structure**
Here’s the folder structure of the project:

```
dental-service-app/
├── public/                     # Public assets (images, icons, etc.)
├── src/
│   ├── app/
│   │   ├── api/                # API routes
│   │   │   ├── booking/        # Booking-related API endpoints
│   │   │   │   ├── cancelSchedule/
│   │   │   │   │   ├── [id]/  # Dynamic route for canceling schedules
│   │   │   │   │   │   └── route.js
│   │   ├── pages/              # Application pages
│   │   │   ├── signup/         # Signup page
│   │   │   ├── login/          # Login page
│   │   │   ├── booking/        # Booking page
│   ├── components/             # Reusable components
│   │   ├── layout/             # Layout components (Header, Footer, etc.)
│   │   ├── homepage/           # Homepage components
│   │   ├── booking/            # Booking-related components
│   │   ├── signup/             # Signup form components
│   │   ├── login/              # Login form components
│   ├── lib/                    # Utility files (e.g., database connection)
│   │   ├── dbConnect.js        # MongoDB connection logic
│   ├── models/                 # Mongoose models
│   │   ├── Booking.js          # Booking schema
│   │   ├── User.js             # User schema
├── .env                        # Environment variables
├── package.json                # Project dependencies and scripts
├── README.md                   # Project documentation
```

---

## **API Documentation**
### **1. Cancel Schedule**
**Endpoint**: `/api/booking/cancelSchedule/[id]`  
**Method**: `PATCH`  
**Description**: Updates the status of a booking.

#### **Request**
- **URL Parameters**:
  - `id` (string): The ID of the booking to update.
- **Body**:
  ```json
  {
    "status": "Cancelled"
  }
  ```

#### **Response**
- **Success**:
  ```json
  {
    "message": "Booking updated",
    "data": {
      "_id": "64a7f8e2b5d1c2a3b4c5d6e7",
      "status": "Cancelled",
      ...
    }
  }
  ```
- **Error**:
  ```json
  {
    "message": "Error updating booking",
    "error": "Error details here"
  }
  ```

---

## **How to Run the Project**
### **1. Clone the Repository**
```bash
git clone https://github.com/Frechwarren/DentalServiceApp.git
cd DentalServiceApp
```

### **2. Install Dependencies**
```bash
npm install
```

### **3. Set Up Environment Variables**
Create a `.env` file in the root directory and add the following:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database>?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret
```

Replace `<username>`, `<password>`, `<cluster-url>`, and `<database>` with your MongoDB credentials.

### **4. Run the Development Server**
```bash
npm run dev
```

### **5. Open in Browser**
Visit [http://localhost:3000](http://localhost:3000) to view the application.

---

## **Contributing**
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

---