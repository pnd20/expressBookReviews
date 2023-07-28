const axios = require('axios').default;

let bookList = 'https://pndabney-5000.theiadocker-2-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/';
let isbnBook = 'https://pndabney-5000.theiadocker-2-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/isbn/2';
let authorBook = 'https://pndabney-5000.theiadocker-2-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/author/ChinuaAchebe';
let titleBook = 'https://pndabney-5000.theiadocker-2-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/title/TheDivineComedy';

const connectURL = (url) => {
    const req = axios.get(url);
    req.then(resp => {
        console.log("Fullfilled. ")
        console.log(resp.data);
    })
    .catch(err => {
        console.log("Rejected. ")
        console.log(err.toString())
    })
}

async function testApp() {
    // Retrieve code for list of books
    const response1 = await connectURL(bookList)
    // Retrieve code for book details based on ISBN
    const response2 = await connectURL(isbnBook)
    // Retrieve code for book details based on Author
    const response3 = await connectURL(authorBook)
    // Retrieve code for book details based on Title
    const response4 = await connectURL(titleBook)
}

// Execute async function
testApp()