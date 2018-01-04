/*

Feel free to pop this into JS Fiddle to play around and bring up your console to inspect what's going on!

Every object is created by a constructor call -
(a function called with the 'new' keyword and creates a new object).
A called constructor creates an internal link
that points from the newly created object to the constructor's prototype object.

All constructors are functions. It's only considered a constructor because we use the 'new' word
to call the function and create an object from it.

*/

//Create a constructor, it takes in 3 parameters
function PetInfo(breed, hairLength, age) {
	this.breed = breed,
  this.hairLength = hairLength,
  this.age = age
}

//Create a constructor, it takes in 3 parameters
function PetFemale(breed, hairLength, age) {

/*Invoke PetInfo function and pass in PetFemale's created object (from the new keyword) for the 'this' context in PetInfo and pass in parameters 
	since PetInfo takes in arguments. When we create a new object from invoking PetFemale(), we get a new,
	empty object on line 55. We can then initialize properties and methods on objects with the equal sign.
*/
	PetInfo.call(this, breed, hairLength, age)

//initializes a property on empty object
	this.sex = 'female'

/*Invokes the description method that's on the PetInfo prototype.
	See line 46 for more details
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

PetFemale.prototype = Object.create(PetInfo.prototype) 
PetMale.prototype = Object.create(PetFemale.prototype)

PetFemale.prototype.sound = function (noise) {
	this.noise = noise
	var petSound = `My animal makes a ${this.noise} sound!`
  console.log(petSound)
}

PetInfo.prototype.description = function () {
	var description = `My animal is a ${this.sex}`
  console.log(description)
}



ellie_cat = new PetFemale('maine coon', 'long', 2)
bob_dog = new PetMale(['doberman', 'short', 6])
ellie_cat.sound('woof')