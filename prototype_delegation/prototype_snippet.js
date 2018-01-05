/*

Feel free to pop this into JS Fiddle to play around and bring up your console to inspect what's going on!

Every object is created by a constructor call -
(a function called with the 'new' keyword and creates a new object).
A called constructor creates an internal link
that points from the newly created object to the constructor's prototype object.

All constructors are functions. It's only considered a constructor because we use the 'new' word
to call the function and create an object from it.

And, remember, functions are objects aka reference types!

*/

//Create a function, it takes in 3 parameters
function PetInfo(breed, hairLength, age) {
	this.breed = breed,
  this.hairLength = hairLength,
  this.age = age
}

//Create a constructor, it takes in 3 parameters
function PetFemale(breed, hairLength, age) {

/*Invoke PetInfo function and pass in PetFemale's created object (from the new keyword) for the 'this' context in PetInfo and pass in parameters 
	since PetInfo takes in arguments. When we create a new object from invoking PetFemale(), we get a new,
	empty object on line 96. We can then initialize properties and methods on our created objects with the assignment operator (equal sign).
*/
	PetInfo.call(this, breed, hairLength, age)

//initializes a property on empty object
	this.sex = 'female'

/*Invokes the description method that's on the PetInfo prototype.
	See lines starting at 54 for more details on how it works.
*/
  this.description()
}

/*Create a constructor, it takes in an array,
	In this case, the argument is a spread operator and 'spreads' the array out into individual values
	...['doberman', 'short', 6] will be the equivalent of: 'doberman', 'short', 6
	The code below is similar to PetFemale. I used apply instead of call because we pass in an array.
*/
function PetMale(...petMaleArray) {
	PetInfo.apply(this, ...petMaleArray)
	this.sex = 'male'
  this.description()
}

/*
Create an empty object and assign it to PetFemale.prototype. 
PetFemale's constructor is destroyed! So if we were to ask a new object created
by PetFemale where is it's constructor, the constructor property will
implicitly point to PetInfo (even if a new object is created by PetFemale).

The empty PetFemale.prototype can be initialized with methods and
properties by manually adding them in. PetFemale now has an internal link to
PetInfo's prototype, allowing us to access methods and properties from
PetInfo such as that on line 39.
*/
PetFemale.prototype = Object.create(PetInfo.prototype)
/*
Like the above, we create an empty object and assign it to PetMale.
PetMale's constructor is also destroyed.

We create an internal link to PetFemale's prototype. And, since PetFemale's
prototype points to PetInfo's prototype, PetMale can also access PetInfo's
prototype properties and methods. We're linking the objects together!
This is why PetMale has access to PetInfo's prototype description() on line 50.
*/
PetMale.prototype = Object.create(PetFemale.prototype)

/*
Add a method on PetFemale's prototype.
*/
PetFemale.prototype.sound = function (noise) {
//Adds the noise property to the object when function is invoked
	this.noise = noise
	var petSound = `My animal makes a ${this.noise} sound!`
  console.log(petSound)
}

/*
Add a method on PetInfo's prototype.
*/
PetInfo.prototype.description = function () {
	var description = `My animal is a ${this.sex}`
  console.log(description)
}


// Create new objects by invoking functions with the 'new' keyword
ellie_cat = new PetFemale('maine coon', 'long', 2)
bob_dog = new PetMale(['doberman', 'short', 6])


/*
Acceses sound method from PetFemale prototype
First, the object will look and see if 
it has the sound method itself. Nope, looks at its
own prototype on PetFemale and sure enough it does
*/
ellie_cat.sound('meow')
/*
First, object will look and see if it has sound method on itself,
and nope, it doesn't. It looks on its own prototype, and it doesn't
exist. So it looks to the PetFemale prototype from its internal
linkage (we do this on line 69) and sure enough, it exists! Yay!
*/
bob_dog.sound('woof')