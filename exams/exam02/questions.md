# Exam 2 Questions

* Answers should be roughly 2-5 sentences, and in your own words.  
* Some questions ask for a code sample - keep them short and to the point.
* Be sure to be clear - be careful not to use vague pronouns like "it" if I can't be completely sure what "it" is.
* I cannot assume knowledge you don't demonstrate, so be clear and explicit.

## Q1: The first rule I've given about REST services is that the URL should represent a resource.  What does that mean?  Give an example where a url DOES not represent a resource, then describe how to modify it so that it does.
##Answer: The URL of a REST service should represent a resource means the URL should be semantically meaningful and should represent a noun and not a verb.
Example: To fetch the login info about the user: (/load)
app.get('./load' , (req,res) =>{
  const uID = req.cookies.uid;
  if(!uID){
    res.sendStatus(401);
    return;
  }
  res.sendStatus(200);
})

Instead of load the call should be something like /session which is more meaningful indicating that the call is to fetch session info of the user.
app.get('./session' , (req,res) =>{
  const uID = req.cookies.uid;
  if(!uID){
    res.sendStatus(401);
    return;
  }
  res.sendStatus(200);
})


## Q2: If the service returns the username as a plain text string, what is wrong with the below and what would fix it? (Assume the service works without error)
```
  const username = fetch('/username');
  console.log(`user is named ${username}`);
```  
##Answer: The server returns HTTP response but not plain text. Inorder to extract plain text information from the response we need to add text() to the response, so the example changes as follows:

fetch('/username')
.then((result) =>{
  return result.text();
})
.then( (username) =>{
  console.log(`user is named ${username});
}

## Q3: What does it mean to "store your state in the DOM"?  Why shouldn't you do this?
##Answer: We should not store data in DOM because
 1. Security Issues and anyone can manipulate data in the browser.
 2. As the display get complicated, so does the state interactions get complicated.
 3. It doesn't follow MVC pattern, maintaing MVC pattern helps to have neat code.
 4. Memory Leakage can occur.

## Q4: Explain the differences between a multiple-page-web application and single-page-web application.  Be sure to fully demonstrate your understanding.
##Answer: 
Multipage Application:
1. Contains multiple pages and reloads
2. The pages change from one to another depending on the server routings
3. Each page is rendered using a separate page load
4. Changes to the front end occurs using a reload
5. Uses server-side javascript
6. Data is submitted using forms
7. More secure

Single Page Application:
1. Page load occurs in the beginning of the application
2. Uses browser-side javascript 
3. Changes are done using REST-API calls to and from the server
4. No reload occurs on changes and hence is rendered fastly
5. Data is sent using service calls
6. Less secure

## Q5: What is Progressive Enhancement?  What is the difference in an SPA that uses Progressive Enhancement compared to an SPA that doesn't use Progressive Enhancement?
##Answer: Progressive Enhancement is a strategy for web design that allows users to build core web content first. After that user can progressively build more layers to the web application to create an enhanced version with more advanced browser features. 
Example, initially building a multiple-page web application and then adding advanced front end javascript and using RESTful APIs to make the web application work as a single page web application can be explained as one form of Progressive Enhancement.

An SPA that uses progressive enhancement will work even when the javascript is turned off at the client-side(browser has disabled Javascript). In such scenarios, these SPAs behave like multiple-page web applications, because of progressive enhancement. An SPA that uses progressive enhancement will have code that executes the web application functionalities using front-end javascript(RESTful APIs) as well as backend javascript(server side page reloads) whereas the SPA without progressive Enhancement will only have front-end javascript using REST APIs.

## Q6: Explain how a REST service is or is not similar to a dynamic asset.
##Answer: Dynamic assets are constructed either immediate or for a short span, mostly not an actual file, whereas REST services are web service calls that follows REST(REpresentational State Transfer) protocols to perform various CRUD operations using the HTTP methods(GET, PUT, POST etc).

REST services are similar to dynamic assets as REST services are async in nature, runs in the background and creates responses in run-time. Since it is async, it starts at a particular time and gets excetued and completed some other time. Dynamic asset triggers are also async in nature.

## Q7: Give an example of a piece of information you should not store in a cookie, and why you should not store it that way.
##Answer: Cookies are not a good option to store data. FOr example, passwords are one of information that should not be stored in cookies. The data stored in cookies are visible as plain text. Hence if we store passwords, others can easily see our passwords which can be used in a wrong way. The same password might be even used in multiple places causing high security issues.

## Q8: Explain why it is useful to separate a function that fetches data from the what you do with that data
##Answer: Separation of Concerns is used to reduce coupling among the files. If both the files are written together, we need to change the entire code but if the files are written separately the fetch call will have any changes irrespective of how the data is being manipulated.

However having entire code together will make debugging difficult and any changes will not happen easily. Having separate files, it becomes easier to understand, debug the code as well as change the code multiple times easily.And also provides code reusability.

## Q9: Explain why try/catch is useless when dealing with asynchronous errors (assume you aren't using async/await)
##Answer: Putting try catch around the code will put the code in the queue as the code resolved/rejected promise are part of a callback, being added to the queue. And the entire code outside of the try/catch block gets executed. And later the queue is emptied and the error goes uncaught.

Example: try {
Promise.resolve()
.then( () => {
  console.log(1);
  throw new Error("poop");
});
} catch(err) {
  console.log(`caught ${err}`);
}
console.log(2);

Here the output is 2 1, the code execution starts at the beginning of try block and the code in the callback(the one which throws error) is put in the queue and the rest of the code executes printing 2 and later the code from the queue is extracted and throws error which goes uncaught.

## Q10: Is separation of concerns a front end issue, a server-side issue, or both?  Describe an example the demonstrates your answer.
##Answer: Separation of concerns is a issue of both front end and server side.
Example: For a chat based Single page application. At the server-side we need to maintain a record of the messages being posted, which needs to be separated from the main server code which handles the service calls from the user. Hence on the server side we achieved separation of concerns. Now at the client side, we will be having three files. One for rendering static information. One to manipulate the data and other which fetches the data from the server. Server side uses require to use files and client side uses export and import
