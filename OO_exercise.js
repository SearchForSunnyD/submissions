class Vehicle{
    constructor(make, model, year){
        if(!Number.isInteger(year)){
            throw new Error(`Not a valid model year`)
        }
        this.make = make
        this.model = model
        this.year = year
        this.isVehicle = true
    }
    honk(){
        return 'Beep'
    }
    toString(){
        return `The vehicle is a ${this.make} ${this.model} from ${this.year}`
    }
}

class Car extends Vehicle{
    constructor(make, model, year){
        super(make, model, year)
        this.numWheels = 4
    }
}

class Motorcycle extends Vehicle{
    constructor(make, model, year){
        super(make, model, year)
        this.numWheels = 2
    }
    revEngine(){
        return 'VROOM!!!'
    }
}

class Garage{
    constructor(capacity){
        if(!Number.isInteger(capacity)){
            throw new Error(`Not a valid capacity size`)
        }
        this.vehicles = []
        this.capacity = capacity
    }
    add(vehicle){
        if(!vehicle.isVehicle){
            throw Error(`Only vehicles are allowed in here!`)
        }
        if(this.capacity <= this.vehicles.length){
            throw Error(`Sorry, we're full.`)
        }
        this.vehicles.push(vehicle)
        return 'Vehicle added!'
    }
}
