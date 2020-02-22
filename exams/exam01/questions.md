# Exam 1 Questions

* Answers should be roughly 2-5 sentences, and in your own words.  
* Some questions ask for a code sample - keep them short and to the point.
* Be sure to be clear - be careful not to use vague pronouns like "it" if I can't be completely sure what "it" is.
* I cannot assume knowledge you don't demonstrate, so be clear and explicit.

## Q: What is the difference between a dynamic asset and a static asset?
   A: Static asset consists of basic Javascript, HTML,CSS files. Static assets do not receive anything from the server.The content of static assets is loaded from the basic files. Dynamic assets gets the content from the server every time a request is rendered.

## Q: What is the difference between a relative and absolute file path in an href?  What is the "webserver root/document root" and how do absolute/relative paths relate to this document root?
   A: Relative path in href refers to a path relative to the current folder and absolute path in href is a path taken from some "root" on the server. Server root is not the root of the file system. The document root is how the server treats the requests for root.
## Q: What is the difference between server-side and client-side JS?
  A: Client side JS runs in the browser of a machine and not in server. All changes are visible. No information other than what page the request is made. We can add as reference in Javascript or CSS files.Only JS is the option to run on browser. Server-side JS can be in any language. We would not be having access to rendered page. Server can only respond to request.

## Q: What are the differences between `var`, `const`, and `let`, and when should you use each of them?
  A: 'var' should be used only when dealing with old JS browsers. Its scope is only within the function is it declared or globally available when declared outside the function. 'var' is hoisted which means the variable is treated as placed at the top no matter where it exists in the real code and the value is lost. 'let' has scope pertaining to the block. 'let is not hoisted. 'const' is also a blocked scoped variable, it doesn't allow the value assigned to a variable to be changed or reassigned. This can be used to store constants.

## Q: What are the 4 ways to create inheritance in JS? (no examples needed, just a sentence describing each)
   A: Constructor Function: new keyword is used on the function call, if called the prototype property is assigned as prototype of new object
   Object.create : object.create gives a new object with the prototypes assigned to the new one as passed object's prototypes'.
   ES6 Classes: this way is similar to that in other languages like Java, done using new keyword.
   Bruteforce prototype Assignment: Just to directly force the prototype of the object by assigning.

## Q: Give a short code demonstration of 1 way to create JS inheritance to __inherit__ a method named "purr".
   A: const bird = {
			purr: function() {
				console.log(`${this.name} like to purr`);
			}
		};
const tommy = Object.create(bird);
tommy.name = 'Tommy';
tommy.purr();

## Q: Give a short code demonstration of a different way to create JS inheritance to __inherit__ a method named "hiss".
   A: class Snake {
			constructor(name) {
				this.name = name;
			}
			hiss() {
				console.log(`${this.name} says Hiss`);
				}
			}
const topy = new Snake('Topy');
topy.hiss();

## Q: Explain what a callback is, and give an example.
   A: Callback is a function passed to anothe function so that the receiving function gets the control.
   Eg: const shadesOfRed = {
			Yellow: 45,
			Red: 90,
			black: 255,
			white: 0
       };
		const checkShades = function( shadesOfRed, shadeIndicator ) {
		for( let name of Object.keys(shadesOfRed) ) {
				if( shadesOfRed[color] < 124 ) {
					shadeIndicator(color, shadesOfRed[color]);
					}
			}
		};
const shadeIndicator = function( color, shade ) {
console.log(`${color} has ${shade} of Red mixed`);
};
checkShades(shadesOfRed, shadeIndicator);

## Q: What are the words that would correctly fill in the space in this sentence:

"If a function using `this` is `used as callback`, then `this` will not have the expected implicit value"

## Q: In CSS, what does it mean "You shouldn't name your classes after what they look like"?   Why?  Give an example of a class that is well named and a class that is poorly named.
   A:We should name classes after what is the functionality rather than what they look like. Because just by seeing the name we can figure out what does the class do and where other places can this be used just by a glance.
   Eg: Good: class= "chat-app"; Bad: "square-shape"; 
