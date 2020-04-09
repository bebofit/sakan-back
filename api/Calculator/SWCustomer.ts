import Unit from "./Unit";
import Globals from "./Globals";
import Units from "./Units";

export default class SWCustomer {

    units: Units;
    swCredit: number;
    swCustomer:number;

    constructor(units: Units) {
        this.units = units;
        this.calcSwCredit();
    }

    calcSwCustomer(sellingCommissionCustomer: number){
        let unit = (this.units.objects.filter(unit => unit.isBought)[0]);
        let sellingCommission = this.calcSellingCommission(unit, sellingCommissionCustomer);
        this.swCustomer = +((unit.unitPrice - (this.swCredit - sellingCommission)).toFixed(2));
        return this.swCustomer;
    }

    private calcSellingCommission(unit: Unit, sellingCommissionCustomer: number){
        return sellingCommissionCustomer * unit.unitPrice * Number(unit.isBought)
    }

    calcSwCredit(){
        let cumSafyPaid: number = 0;
        let cumYearsCount: number = 0;
        let swCredit: number = 0;
        this.units.objects.forEach((unit , index)=> {
            cumYearsCount += unit.rentYears;
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