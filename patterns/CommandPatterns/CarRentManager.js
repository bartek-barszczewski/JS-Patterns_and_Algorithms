class CarRentManager {
    constructor() {
        this.rentalCars = [];
    }

    execute(command, ...args) {
        const updateRentals = command.execute(this.rentalCars);
        if (updateRentals) {
            this.rentalCars = updateRentals;
        }
    }
}

class Command {
    constructor(execute) {
        this.execute = execute;
    }
}

function ShowRentalCars() {
    const show = (rent) => {
        rent.forEach((renter, idx) => {
            console.log(
                `[${idx}] ${renter.firstName} ${renter.lastName} \t\t${renter.brandCar}\t\t${renter.modelCar}\t\t${renter.id}`
            );
        });
    };

    return new Command(show);
}

function RentCar(firstName, lastName, brandCar, modelCar) {
    const newRent = (rentalCars) => {
        const id = rentalCars.length + 1;
        rentalCars.push({
            id,
            firstName,
            lastName,
            brandCar,
            modelCar,
        });
    };

    return new Command(newRent);
}

function ReturnCar(id) {
    const giveBackCar = (rentalCars) => {
        rentalCars = rentalCars.filter((rentals) => rentals.id != id);

        return rentalCars;
    };

    return new Command(giveBackCar);
}

const rentManager = new CarRentManager();

console.log(rentManager.rentalCars);

rentManager.execute(new RentCar("Adam", "Kowalski", "Fiat", "Bravo"));
rentManager.execute(new RentCar("Jolanta", "Kowalska", "Porshe", "911"));
rentManager.execute(new RentCar("Tomasz", "Kowalski", "Mercedes", "S300"));

console.log(rentManager.rentalCars);

rentManager.execute(new ReturnCar(2));

console.log(rentManager.rentalCars);

module.exports = {
    CarRentManager,
    Command,
    ShowRentalCars,
    RentCar,
    ReturnCar,
    ...module.exports,
};
