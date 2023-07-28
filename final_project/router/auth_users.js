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
      if(userswithsamename.length > 0){
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
      if(validusers.length > 0){
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
    }, 'access', { expiresIn: 60 });

    req.session.authorization = {
      accessToken,username
  }
  return res.status(200).send("User successfully logged in");
  } else {
    return res.status(208).json({message: "Invalid Login. Check username and password"});
  }
});
  

// Add a book review
regd_users.put("/auth/review/:isbn", function (req, res) {
  //Write your code here
  const username = req.body.username;
  const review = req.body.review;
  const isbn = req.params.isbn;
  let book = books[isbn];
  // Check is user already has made a review. 
  // If so, replace their review. If not, make a new review.
  if (Object.keys(book.reviews).length === 0) {
    let objreviews = book.reviews;
    objreviews[username] = review;

    return res.send(username + " has added a review.");

  } else if (book.reviews.hasOwnProperty(username)) {
    return res.send(username + " has modifed their review.");
} else {
    return res.send("No review has been added")
}
});
      
// Delete a book review
regd_users.delete("/auth/review/:isbn", function (req,res) {
    //Write code here
    const username = req.body.username;
    const isbn = req.params.isbn;
    let book = books[isbn];
    // // Check is user already has made a review. 
    // If so, delete review.
    if (book.reviews.hasOwnProperty(username)) {
        let objreviews = book.reviews;
        delete objreviews[username]
        return res.send( username + " removed book their review.")
    } else {
        return res.send("No review by " + username + " was found.")
    }
});
  

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
