# 📚 Bookstore Application

A full-featured online bookstore built with **React** and **Spring Boot**, enabling users to browse and order books while giving admins full control over inventory management.

---

## 🔧 Tech Stack

- **Frontend**: React, React Router, Axios, Bootstrap
- **Backend**: Spring Boot, Spring Data JPA
- **Database**: PostgreSQL
- **Authentication**: Role-based (user / owner)

---

## 🚀 Features

### 👥 Users
- Register & login
- Browse and view books
- Add/remove items to cart
- Place orders and view order history

### 👤 Owner/Admin
- Login as owner
- Add new books
- Update or delete existing books
- View and manage all available books

---

## 📁 Project Structure

```bash
/bookstore-frontend/
  └── src/components/
        ├── BookList.js
        ├── Cart.js
        ├── Orders.js
        ├── Login.js
        ├── Register.js
        ├── AddBook.js
        ├── ManageBooks.js
        └── UpdateBook.js

/bookstore-backend/
  └── src/main/java/com/bookstore/
        ├── model/
        ├── repository/
        ├── controller/
        └── service/
```
## 🛠️ Project Setup

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd bookstore-backend
    ```
2.Configure PostgreSQL in src/main/resources/application.properties or application.yml:

```bash
spring.datasource.url=jdbc:postgresql://localhost:5432/bookstore
spring.datasource.username=your_db_username
spring.datasource.password=your_db_password
spring.jpa.hibernate.ddl-auto=update
```
3.Run the backend:

```bash
mvn spring-boot:run
```

### Frontend Setup
1.Navigate to the frontend directory:

```bash
cd bookstore-frontend
```
2.Install dependencies:

```bash
npm install
```
3.Start the development server:
```bash
npm start
```
> Ensure the proxy in package.json points to your backend (e.g., "proxy": "http://localhost:8080").


### Application

1.User Role
[▶️ Watch demo video](
https://github.com/user-attachments/assets/ae45aa70-398a-4281-a282-397b97e620b7
)

2. Admin Role
[▶️ Watch demo video](https://github.com/user-attachments/assets/559a635c-a186-4880-8cc2-bbcf46da2634)
   
