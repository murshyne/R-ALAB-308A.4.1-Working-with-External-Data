/* 308A.4 - AJAX and Data Fetching

New XHR object syntax
const request = new XMLHttpRequest();

The XHR object methods for communicating with the server are open and send.

HTTP request method most commonly used are 
POST - create
GET - read
PUT - update
DELETE - delete


Simple GET request using fetch
==============================
async function getData(){
    let res = await fetch(`https://jsonplaceholder.typicode.com/todos/1`)
    res = await res.json()
    console.log(res)
}
getData()





*/