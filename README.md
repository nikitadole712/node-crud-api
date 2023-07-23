# nodejs CRUD API

Simple CRUD API application with Node.js and Express

---

## APIs

### Create new user

POST `localhost:5000/users`

```javascript
{
    "name": "John Doe",
    "password": "manhattan"
}
```

### Get user

GET `localhost:5000/users/${id}`

### Get all users

GET `localhost:5000/users`

### Update existing user

PATCH `localhost:5000/users`

```javascript
{
    "id": "91ecaae2-4b94-4984-b3d5-d2fe01b28583",
    "password": "Philadelphia"
}
```

### Delete user

DELETE `localhost:5000/users/${id}`
