import Unit from "./Unit";
import Globals from "./Globals";

export default class SWCustomer {

    units: Array<Unit>;
    swCredit: number;

    constructor(units: Array<Unit>) {
        this.units = units;
        this.calcSwCredit();
    }

    calcSwCustomer(sellingCommissionCustomer: number){
        let unit = (units.filter(unit => unit.isBought)[0]);
        let sellingCommission = this.calcSellingCommission(unit, sellingCommissionCustomer);
        return +((unit.unitPrice - (this.swCredit - sellingCommission)).toFixed(2));
    }

    calcSellingCommission(unit: Unit, sellingCommissionCustomer: number){
        return sellingCommissionCustomer * unit.unitPrice * Number(unit.isBought)
    }

    calcSwCredit(){
        let cumSafyPaid: number = 0;
        let cumYearsCount: number = 0;
        let swCredit: number = 0;
        this.units.forEach((unit , index)=> {
            cumYearsCount += unit.rentYears;
            unit.calcUnitPrice(cumYearsCount);
            unit.calcInitAnnualRent(cumYearsCount, index);
            cumSafyPaid += this.calcSafyPaid(unit);
            swCredit += cumSafyPaid * Number(unit.isBought);
        });
        this.swCredit = +(swCredit.toFixed(2));
        return +(swCredit.toFixed(2));
    }

    private calcSafyPaid(unit: Unit): number{
        let totalPaid = Globals.calcTotalPaid(unit);
        let upgradeFee = unit.upgradeFeePercentage * totalPaid; 
        return totalPaid -  upgradeFee;
    }


}

let units = [
    new Unit(750000,1000,1,0.1),
    new Unit(1000000,5500,1,0.1),
    new Unit(1000000, 7500, 2, 0.2, true)
];

const swCustomer = new SWCustomer(units);
let sw = swCustomer.calcSwCustomer(0.05);
// console.log(units);
console.log(sw);