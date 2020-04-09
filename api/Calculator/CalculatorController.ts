import Units from "./Units";
import Unit from "./Unit";
import SWCustomer from "./SWCustomer";
import SWInvestor from "./SWInvestor";

class CalculatorController{
    units = new Units([
        new Unit(750000,1000,1,0.1),
        new Unit(1000000,5500,1,0.1),
        new Unit(1000000, 7500, 2, 0.2, true)
    ]);
    swCustomer = new SWCustomer(this.units);
    swInvestor = new SWInvestor(this.units);

    // vars
    sw2: number = 0;

    constructor() {
        this.swCustomer.calcSwCustomer(0.05);
        this.swCustomer.calcSwCredit();

        this.swInvestor.calcRentCollection();
        this.swInvestor.calcCashRemaining();

        this.sw2 = Math.abs(+((this.swCustomer.swCustomer - this.swInvestor.cashRemaining).toFixed(2)));
        let actuallCollCashFromRent = this.swInvestor.rentCollectionsCash.reduce((a,b) => a + b, 0)
    }


}

export default new CalculatorController();