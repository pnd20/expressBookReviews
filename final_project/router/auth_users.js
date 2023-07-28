const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ 
//write code to check is the username is valid. Returns boolean
let userswithsamename = users.filter((user)=>{
    return user.username === username
});
if(userswithsamename.length > 0) {
    return true;
} else {
    return false;
}
} 

const authenticatedUser = (username,password)=>{ 
    //returns boolean
    //write code to check if username and password match the one we have in records.
    let validusers = users.filter((user)=>{
        return (user.username === username && user.password === password)
    });
    if (validusers.length > 0) {
        return true;
    } else {
        return false;
    }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(404).json({message: "Error logging in"});
}

if (authenticatedUser(username,password)) {
    let accessToken = jwt.sign({
        data: password 
    }, 'access', { expiresIn: 60 * 60 });
    
    req.session.authorization = {
        accessToken,username
    }
    return res.status(200).json({message: "User successfully logged in"});
} else {
    return res.status(208).json({message: "Invalid Login. Check username and password"});
}
});


// Function to add book review
function addReview(books,isbn,newReview,userParam) {
    // Check is user already has made a review. If so, replace their review. If not, make a new review.
    if (Object.keys(books[isbn].reviews).length === 0 || books[isbn].reviews.hasOwnProperty(userParam)) {
        books[isbn].reviews.userParam = newReview;
    }
    return "A review has been added by " + userParam + "to " + books[isbn].title;
} 

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.send(addReview(books,req.params.isbn,req.params.reviews,req.params.username));
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
