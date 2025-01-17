const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
      if (!isValid(username)) {
          users.push({"username":username,"password":password});
          return res.status(200).json({message: "User successfully registered. Now you can login"});
      } else {
          return res.status(404).json({message: "User already exists!"});
      }
  }
  return res.status(404).json({message: "Unable to resgister user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.send(JSON.stringify(books,null,4));

});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  return res.send(books[isbn]);
 });


// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const authorParam = req.params.author;
    // Iterate through 'books' array
    for (let i = 1; i < 10; i++) {
        let author = books[i]?.author.replace(/ /g,"");
        if(author === authorParam) {
            bookAuthor = books[i];
        } 
    }

    if (typeof bookAuthor === 'undefined') {
        return res.send("Author is not found.")
    } else {
        return res.send(bookAuthor)
    }
});


// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const titleParam = req.params.title;
  for (let i = 1; i < 10; i++) {
    let title = books[i]?.title.replace(/ /g,"");
    if(title === titleParam) {
        bookFound = books[i];
    } 
   }

    if (typeof bookFound === 'undefined') {
        return res.send("Title is not found.")
    } else {
        return res.send(bookFound)
    }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  return res.send(books[isbn].reviews);
});

module.exports.general = public_users;
