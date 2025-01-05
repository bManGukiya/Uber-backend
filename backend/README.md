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

# Captain Registration Endpoint

## POST /captains/register

### Description
This endpoint is used to register a new captain. It validates the input data and creates a new captain in the database.

### Request Body
The request body should be a JSON object containing the following fields:
- `fullname`: An object containing:
  - `firstname` (string, required): The first name of the captain. Must be at least 3 characters long.
  - `lastname` (string, optional): The last name of the captain. Must be at least 3 characters long.
- `email` (string, required): The email address of the captain. Must be a valid email format.
- `password` (string, required): The password for the captain. Must be at least 6 characters long.
- `vehicle`: An object containing:
  - `color` (string, required): The color of the vehicle. Must be at least 3 characters long.
  - `plate` (string, required): The plate number of the vehicle. Must be at least 3 characters long.
  - `capacity` (number, required): The capacity of the vehicle. Must be at least 1.
  - `vehicaltype` (string, required): The type of the vehicle. Must be one of `car`, `bike`, or `auto`.

### Example Request
```json
{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Doe"
  },
  "email": "jane.doe@example.com",
  "password": "password123",
  "vehicle": {
    "color": "Red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicaltype": "car"
  }
}
```

### Responses

#### Success
- **Status Code**: 201 Created
- **Response Body**:
  ```json
  {
    "token": "jwt_token_here",
    "captain": {
      "_id": "captain_id_here",
      "fullname": {
        "firstname": "Jane",
        "lastname": "Doe"
      },
      "email": "jane.doe@example.com",
      "vehicle": {
        "color": "Red",
        "plate": "ABC123",
        "capacity": 4,
        "vehicaltype": "car"
      }
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
      },
      {
        "msg": "Color must be 3 characters long",
        "param": "vehicle.color",
        "location": "body"
      },
      {
        "msg": "Plate must be 3 characters long",
        "param": "vehicle.plate",
        "location": "body"
      },
      {
        "msg": "Capacity must be 1 character long",
        "param": "vehicle.capacity",
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

# Captain Login Endpoint

## POST /captain/login

**Description:** Login a captain.

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Responses:**
- `200 OK`: Returns the token and user information.
- `400 Bad Request`: Validation errors.
- `401 Unauthorized`: Invalid email or password.

# Captain Profile Endpoint

## GET /captain/profile

**Description:** Get the profile of the logged-in captain.

**Headers:**
- `Authorization: Bearer <token>`

**Responses:**
- `200 OK`: Returns the captain's profile.
- `401 Unauthorized`: If the token is missing or invalid.

# Captain Logout Endpoint

## GET /captain/logout

**Description:** Logout the captain.

**Headers:**
- `Authorization: Bearer <token>`

**Responses:**
- `200 OK`: Logout successful.
- `401 Unauthorized`: If the token is missing or invalid.

# Create Ride Endpoint

## POST /rides/create-ride

### Description
This endpoint is used to create a new ride. It validates the input data and creates a new ride in the database.

### Request Body
The request body should be a JSON object containing the following fields:
- `pickup` (string, required): The pickup location of the ride.
- `destination` (string, required): The destination location of the ride.
- `vehicaltype` (string, required): The type of vehicle for the ride. Must be one of `auto`, `motorcycle`, or `car`.

### Example Request
```json
{
  "pickup": "Location A",
  "destination": "Location B",
  "vehicaltype": "car"
}
```

### Responses

#### Success
- **Status Code**: 201 Created
- **Response Body**:
  ```json
  {
    "_id": "ride_id_here",
    "user": "user_id_here",
    "pickup": "Location A",
    "destination": "Location B",
    "fare": 100,
    "status": "pending",
    "otp": "123456"
  }
  ```

#### Validation Errors
- **Status Code**: 400 Bad Request
- **Response Body**:
  ```json
  {
    "errors": [
      {
        "msg": "Pickup location is required",
        "param": "pickup",
        "location": "body"
      },
      {
        "msg": "Destination location is required",
        "param": "destination",
        "location": "body"
      },
      {
        "msg": "Invalid vehical type",
        "param": "vehicaltype",
        "location": "body"
      }
    ]
  }
  ```

# Get Fare Endpoint

## GET /rides/get-fare

### Description
This endpoint is used to get the fare for a ride based on the pickup and destination locations.

### Query Parameters
- `pickup` (string, required): The pickup location of the ride.
- `destination` (string, required): The destination location of the ride.

### Example Request
```
GET /rides/get-fare?pickup=Location+A&destination=Location+B
```

### Responses

#### Success
- **Status Code**: 200 OK
- **Response Body**:
  ```json
  {
    "auto": "50.00",
    "motorcycle": "40.00",
    "car": "60.00"
  }
  ```

#### Validation Errors
- **Status Code**: 400 Bad Request
- **Response Body**:
  ```json
  {
    "errors": [
      {
        "msg": "Pickup and destination are required"
      }
    ]
  }
  ```

# Get Coordinates Endpoint

## GET /maps/get-coordinates

### Description
This endpoint is used to get the coordinates (latitude and longitude) of a location.

### Query Parameters
- `location` (string, required): The name of the location.

### Example Request
```
GET /maps/get-coordinates?location=New+York
```

### Responses

#### Success
- **Status Code**: 200 OK
- **Response Body**:
  ```json
  {
    "latitude": 40.7128,
    "longitude": -74.0060
  }
  ```

#### Validation Errors
- **Status Code**: 400 Bad Request
- **Response Body**:
  ```json
  {
    "errors": [
      {
        "msg": "Location name is required",
        "param": "location",
        "location": "query"
      }
    ]
  }
  ```

# Get Distance and Time Endpoint

## GET /maps/get-distance

### Description
This endpoint is used to get the distance and estimated time between two locations.

### Query Parameters
- `origin` (string, required): The origin location.
- `destination` (string, required): The destination location.

### Example Request
```
GET /maps/get-distance?origin=Location+A&destination=Location+B
```

### Responses

#### Success
- **Status Code**: 200 OK
- **Response Body**:
  ```json
  {
    "distance": {
      "fixedDistance": "10.00",
      "value": 10000
    },
    "time": {
      "time": "0 hours 10 minutes",
      "value": 10
    },
    "status": "OK"
  }
  ```

#### Validation Errors
- **Status Code**: 400 Bad Request
- **Response Body**:
  ```json
  {
    "errors": [
      {
        "msg": "Origin must be 3 characters",
        "param": "origin",
        "location": "query"
      },
      {
        "msg": "Destination must be 3 characters",
        "param": "destination",
        "location": "query"
      }
    ]
  }
  ```

# Get Suggestions Endpoint

## GET /maps/get-suggestion

### Description
This endpoint is used to get location suggestions based on an input query.

### Query Parameters
- `input` (string, required): The input query for location suggestions.

### Example Request
```
GET /maps/get-suggestion?input=New
```

### Responses

#### Success
- **Status Code**: 200 OK
- **Response Body**:
  ```json
  [
    {
      "display_name": "New York, USA",
      "latitude": 40.7128,
      "longitude": -74.0060
    },
    {
      "display_name": "New Delhi, India",
      "latitude": 28.6139,
      "longitude": 77.2090
    }
  ]
  ```

#### Validation Errors
- **Status Code**: 400 Bad Request
- **Response Body**:
  ```json
  {
    "errors": [
      {
        "msg": "Input must be 3 characters",
        "param": "input",
        "location": "query"
      }
    ]
  }
  ```
