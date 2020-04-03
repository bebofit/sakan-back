import Unit from "./Unit";
import Globals from "./Globals";
import SWCustomer from "./SWCustomer";


export default class SWInvestor {

    rentCollection: number;
    cashRemaining: number;

    constructor() {
    }

    calcRentCollection(unit: Unit){
        let totalPaid = Globals.calcTotalPaid(unit);
        let swRentCommission = Globals.SwRentCommissionPercentage * totalPaid;
        console.log(totalPaid, swRentCommission);
        this.rentCollection = totalPaid - swRentCommission;
        return this.rentCollection;
    }
}

let units = [
    new Unit(750000,1000,1,0.1),
    new Unit(1000000,5500,1,0.1),
    new Unit(1000000, 7500, 2, 0.2, true)
];

const swInvestor = new SWInvestor();
let sw = swInvestor.calcRentCollection(new Unit(750000,1000,1,0.1));
// console.log(units);
console.log(sw);