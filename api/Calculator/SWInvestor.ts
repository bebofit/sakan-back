import Unit from "./Unit";
import Globals from "./Globals";
import Units from "./Units";


export default class SWInvestor {

    globals: Globals;
    units: Units;
    cashRemaining: number;
    rentCollections: Array<number>= [];
    rentCollectionsCash: Array<number>= [];

    constructor(units: Units, globals: Globals) {
        this.units = units;
        this.globals = globals;
    }

    //swInvestor1
    calcRentCollection(){
        let rentCollection = 0;
        this.units.objects.forEach((object)=>{
            let totalPaid = Globals.calcTotalPaid(object);
            let swRentCommission = this.globals.SwRentCommissionPercentage * totalPaid;
            rentCollection = totalPaid - swRentCommission;
            //SW1
            this.rentCollectionsCash.push(swRentCommission);
            this.rentCollections.push(+(rentCollection.toFixed(2)));
        })
    }

    //swInvestor2
    calcCashRemaining(){
        let unit = (this.units.objects.filter(unit => unit.isBought)[0]);
        let unitIndex = this.units.objects.indexOf(unit);
        this.cashRemaining = +((unit.unitPrice - this.calcInvestorBalance(unit.unitPrice,this.rentCollections[unitIndex])).toFixed(2));
    }

    private calcInvestorBalance(unitPrice: number, rentCollection: number): number{
        return rentCollection + (this.globals.InvestorSellCommissionPercentage * unitPrice);
    }
}