# Exam 3 Questions

* Answers should be roughly 2-5 sentences, and in your own words.  
* Some questions ask for a code sample - keep them short and to the point.
* Be sure to be clear - be careful not to use vague pronouns like "it" if I can't be completely sure what "it" is.
* I cannot assume knowledge you don't demonstrate, so be clear and explicit.

* NOTE: Because there is no coding portion to Exam 3, each of these questions is worth more to your grade than the questions on previous Exams!  Be sure to have answers you are confident shows your understanding!

## Q1: I have said that React JSX components are like functions and follow many of the same best practices.  Give at least 2 such best practices that are good for both JS functions and JSX Components.  (Be substantive!)

##A: 1 Both JSX Components and functions need to be small and specific to a functionality
            Having smaller components and functions make debugging and maintainance easy. Incase of changes, updating at a single place completes the job.
    2 Reusablility
           By having components or functions specific to one functionality improves reusablity. The same part of the code can be used multiple times and in multiple ways hence having our code DRY.
    3 Naming according to functionality
           It is preferable to name our functions according to the functionality they provide. As, it would be easy for others to understand the context/purpose without actually reading our code. Also, improper naming can limit reusability of the code.
    4 Commenting where ever necessary
          Commenting only where it is necessary will make the code appear clutter free and also avoids the chances of mixing the code and comments if the code is changed at a later point of time.

## Q2: I have said that using Progressive Enhancement (supporting both MPA and SPA) is best, but many places don't do so because of the effort involved.  What is at least one major reason not to use SPA alone?

##A: Problems of having only SPA:
     1. If the user has turned off browser side javascript or might be using an outdated browser, then the application wouldn't perform to its full extent or may not perform as expected.
     2. Security concerns may raise as front-end is fully available to the user and can be manipulated.
     3. And all clients wouldn't be browsers, so JS would not be present at their end. Like search engines wouldn't run JS and hence wouldn't get the results as expected except a few big search engines.
     4. Also if various devices are being used with Internet Of Things then those devices wouldn't have JS and wouldn't understand the page pointing at.

## Q3: The "proxy" setting in your package.json is required for the create-react-app dev server to call a local service, but not if you are calling a service that will always be on a different domain.  Explain what happens (in terms of network traffic) when your dev server is running on localhost port 3000 and the page makes a call to `/service` when you have "proxy" set to `http://localhost:4000` and a server running on localhost port 4000 that has the `/service` service.  hint: This should list and describe multiple request/response steps.

##A : The call to `/service` is made to port 3000 initally and it checks if there is any service `/service` in it's server and as it doesn't find any, it sends the request to proxy server it has which is to port 4000. The port responds with the response, which is received by port 3000 and sents to the user.

Client --> server at 3000 ('/service')[/service not present, So checks proxy] --> proxy server 4000 (/service) [present, hence responds with response] --> Response to 3000 --> Response to client

## Q4: Follow-up: Using the above scenario, list and describe what the network calls are like after you run `npm run build` and are only running all of your content on localhost port 4000 when your JSX makes a call to `/service`

##A: Once the command `npm run build` is given, we generate static files and the server will be running on port 4000 and hence the call to `/service` goes directly to 4000 which has the request with it. The server serves the request to the user directly.

Client --> server at 4000 (static files being served) [present ] --> Responds with response to Client

## Q5: I have said that you can only pass data "down" in React, not "up".  What does that mean?  Give simple code sample if that makes it easier to describe.

##A: In React, passing data "down" means sending data to its child components or nested components. The data from the higher order components gets passed to child components as "props" where the child components can use the data.

Example: In App:

const App =() => {
    const [userState, setUserState] = useState({isLoggedIn : false});
    return (
        userState.isLoggedIn ? <Chat userState= {userState}/> : <Login/>
    ) 
}

Inside Chat, 
const Chat = ({ userState}) => {
  return (
    <div>
      <p>Welcome to the Chat Online, Status : {userState.isLoggedIn}</p>
    </div>
  );
};
The userState is being passed as props to the chat component where the user who is loggedin can see a welcome message with status passed as a prop.

## Q6: Follow-up: If you can't pass data "up" the component tree, how can anything that is "down" change data?  Give simple code samples if that makes it easier to describe.

##A: The data passes from top to the children components.And the children components generate events like change in input or a button click which gets handled using callback by the parent component and the data  gets modified by the children components.

Example: In App:
const App =() => {
    const [userState, setUserState] = useState({isLoggedIn : false});

    const login = (username) =>{
        setUserState({ 
        isLoggedIn: true,
        username
        });
    };

    return (
        userState.isLoggedIn ? <Chat userState= {userState}/> : <Login onLogin={login}/>
    ) 
}

const Login = ({ onLogin}) => {
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');

    const performLogin = () =>{
        const name = username;
        fetchLogin(name)
        .then( userInfo => {
            onLogin(userInfo);
        })
        .catch( (err) =>{
            setError(err.error);
        });
    };

    return (
        <div className="login">
            <input className="user-name" onChange={ (e) => setUsername(e.target.value)} placeholder="Enter name"/>
            <button className="add-user" onClick={ performLogin }>Login</button>
        </div>
    );
};

In the above example, there is a onLogin event, which changes the state of the user to true. The Login component triggers the event of login upon a button click and the callback to onLogin modifies the data of the parent component.

## Q7: Imagine you have a collection of student records, with each having a student id, a name, and an address. (an example of one item in the collection would be: { id: "654321", name: "Bao", address: "123 Main Street" })  Imagine you also have collection of steps to create a pizza, with each step having an ingredient, a quantity, and an instruction. (an example of one item in the collection would be the object { qty: "1 cup", ingredient: "shredded cheese", instructions: "sprinkle over pizza" })

Give a code sample where each collection is shown with at least one more element (2+ students for the first collection, 2+ pizza-making steps).  Make sure you make proper use of arrays and objects.  Explain why you've chosen each way of making a collection (e.g. Why you use an array for one or both, or why you use an object for one or both)

##A: Student records need to stored using an object.As objects are the best way to store unordered data. Also, we may have students with same names/addresses, storing each student using ID would uniquely identify a student and would be easier to retrieve details.
 Example: const students = {};
let id = 0;

 students[++id] = {id: id, name: "Bao", address: "123 Main Street"};
 students[++id] = {id: id, name: "Amit", address: "456 Terry Avenue"};
 students[++id] = {id: id, name: "Bao", address: "789 Yale Avenue"};

 Though having records 1 and 3 with same name, we can easily differentiate both students by storing the records in an object with id as keys.

 Array would be a better option to store steps of pizza making as we have an order to be followed to make a pizza and we don't need to identify any unique steps. Also we need to iterate over entire array to make a pizza. Therefore, using an array to store data would be a good choice.

 const steps = [];

steps.push({qty:"1 cup", ingredient: "Pizza Sauce", instructions: "Spread on the base"})
steps.push({qty: "1/2 cup", ingredient: "Olives", instructions: "Toss over the base"})
steps.push({qty: "1 cup", ingredient: "shredded cheese", instructions:"sprinkle over pizza"})


## Q8: How does inheritance in JS relate to a prototype?  Give a simple code sample if it helps explain.

##A: Prototype is an object. Objects can have inheritance to use properties/methods of another object. So when a code tries to access a property of an object and the object doesn't have it defined for itself. The code checks to see if prototype has it. And this contiues until an object doesn't have a prototype.

Example:  const name = "Bao";
name.isLengthy = false;
console.log(name.isLengthy) ==>  the property of the object is being directly accessed ==> false (output)
console.log(name.toUpperCase()) ==> This property has been inherited from the prototype ==> BAO(output)
console.log(name.length) ==> this property has also been inherited from the prototype of name ==> 3(output)

## Q9: What is wrong about this code sample? `if( !username || username == undefined) { ` be sure to explain why that is wrong.

##A: The user here tried to check if the username has a value or not. If the username is having an explicit value of undefined also, only the first part to check the existence will be sufficient.

Example: let username;

if(!username){
    console.log("No name exists");
}

Here the output is: "No name exists" 

let username = undefined;

if(!username){
    console.log("No name exists");
}

Though a username has a value assigned, but it being undefined, we will still have a output of "No name exists". But if we have any other value for username then our output would be blank.

## Q10: What is decoupling?  What is an example of decoupling in a React app?

##A: Decoupling is to maintain separate files or to write separate functions of code for each functionality rather than putting entire logic in one component.With decoupling, changes to code can be done at only required places when any requirements change, without effecting the rest of the code. Decoupling in react is to separate out functionalities of components, which means to have one component per file and make reusable components. Having separate components we can improve resuablity, and use those components at multiple projects. Decoupling also means separating Vanilla JS from JSX components.

Example:
 Consider the example of chat application, we may have a login component and logout component separate from main app. These components can be re-used for multiple projects. Also, we can separate out services(which has fetch calls to the server) from React and have services as pure JavaScript file rather than a JSX Component.This way React components and Vanilla JS can be separated and can be re-used in multiple places as required. If these two files were combined, that would be used only to this project. But separating out both, we can reuse any of them at different projects without the other file. Decoupling enhances reusability and also enhances the testing quality.


