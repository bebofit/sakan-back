import Unit from "./Unit";


export default class Globals {

    static SwRentCommissionPercentage: number = 0.6;

    static calcTotalPaid(unit: Unit): number{
        let annualInitRent = unit.initAnnualRent;
        return annualInitRent * (Math.pow((1+unit.annualRentIncreasePercentage), unit.rentYears)-1) / ((1+unit.annualRentIncreasePercentage)-1);
    }

}