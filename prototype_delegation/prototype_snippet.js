function PetInfo(breed, hairLength, age) {
	this.breed = breed,
  this.hairLength = hairLength,
  this.age = age
}

function PetFemale(breed, hairLength, age) {
	PetInfo.call(this, breed, hairLength, age)
	this.sex = 'female'
  this.description()
}

function PetMale(...dogArray) {
	PetInfo.apply(this, dogArray)
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



ellie_cat = new PetFemale('maine coon', 'long', 2, 'female')
bob_dog = new PetMale(['doberman', 'short', 6, 'male'])
ellie_cat.sound('woof')