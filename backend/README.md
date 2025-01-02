# User Registration Endpoint

## POST /users/register

### Description
This endpoint is used to register a new user. It validates the input data and creates a new user in the database.

### Request Body
The request body should be a JSON object containing the following fields:
- `fullname`: An object containing:
  - `firstname` (string, required): The first name of the user. Must be at least 3 characters long.
  - `lastname` (string, optional): The last name of the user. Must be at least 3 characters long.
- `email` (string, required): The email address of the user. Must be a valid email format.
- `password` (string, required): The password for the user. Must be at least 6 characters long.

### Example Request
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Responses

#### Success
- **Status Code**: 201 Created
- **Response Body**:
  ```json
  {
    "token": "jwt_token_here",
    "user": {
      "_id": "user_id_here",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
    }
  }
  ```

#### Validation Errors
- **Status Code**: 400 Bad Request
- **Response Body**:
  ```json
  {
    "errors": [
      {
        "msg": "Invalid Email",
        "param": "email",
        "location": "body"
      },
      {
        "msg": "First name must be 3 characters",
        "param": "fullname.firstname",
        "location": "body"
      },
      {
        "msg": "Password must be 6 characters long",
        "param": "password",
        "location": "body"
      }
    ]
  }
  ```

#### Missing Fields
- **Status Code**: 400 Bad Request
- **Response Body**:
  ```json
  {
    "errors": [
      {
        "msg": "All fields are required"
      }
    ]
  }
  ```

# User Login Endpoint

## POST /users/login

### Description
This endpoint is used to log in an existing user. It validates the input data and returns a JWT token if the credentials are correct.

### Request Body
The request body should be a JSON object containing the following fields:
- `email` (string, required): The email address of the user. Must be a valid email format.
- `password` (string, required): The password for the user. Must be at least 6 characters long.

### Example Request
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Responses

#### Success
- **Status Code**: 200 OK
- **Response Body**:
  ```json
  {
    "token": "jwt_token_here",
    "user": {
      "_id": "user_id_here",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
    }
  }
  ```

#### Validation Errors
- **Status Code**: 400 Bad Request
- **Response Body**:
  ```json
  {
    "errors": [
      {
        "msg": "Invalid Email",
        "param": "email",
        "location": "body"
      },
      {
        "msg": "Password must be 6 characters long",
        "param": "password",
        "location": "body"
      }
    ]
  }
  ```

#### Invalid Credentials
- **Status Code**: 401 Unauthorized
- **Response Body**:
  ```json
  {
    "errors": [
      {
        "msg": "Invalid email or password"
      }
    ]
  }
  ```

# User Profile Endpoint

## GET /users/profile

### Description
This endpoint is used to get the profile of an authenticated user.

### Headers
- `Authorization` (string, required): The JWT token of the authenticated user. Must be in the format `Bearer jwt_token`.

### Example Request
```
Authorization: Bearer jwt_token
```

### Responses

#### Success
- **Status Code**: 200 OK
- **Response Body**:
  ```json
  {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "user@example.com"
  }
  ```

# User Logout Endpoint

## GET /users/logout

### Description
This endpoint is used to log out an authenticated user.

### Headers
- `Authorization` (string, required): The JWT token of the authenticated user. Must be in the format `Bearer jwt_token`.

### Example Request
```
Authorization: Bearer jwt_token
```

### Responses

#### Success
- **Status Code**: 200 OK
- **Response Body**:
  ```json
  {
    "message": "Logout successfully"
  }
  ```
