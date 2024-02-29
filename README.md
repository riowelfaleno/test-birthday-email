# test-birthday-email

- Please run npm install first
- then npm run dev

<!-- Create User -->

POST http://localhost:3000/user
Body: {
"firstName": "Paul",
"lastName": "Atreides",
"email":"paul@gmail.com",
"dob":"2000-03-01",
"timezone":"Australia/Melbourne"
}

<!-- Delete User -->

DEL http://localhost:3000/user/:email

<!-- Update User -->

PUT http://localhost:3000/:email
Body: {
"firstName": "James",
"lastName": "",
"dob":"1998-01-07"
"timezone":"Australia/Melbourne"
}
