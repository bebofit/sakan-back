import Unit from "./Unit";


export default class Globals {

    SwRentCommissionPercentage: number;
    InvestorSellCommissionPercentage: number;
    CustomerSellCommissionPercentage: number

    constructor(
        SwRentCommissionPercentage: number,
        InvestorSellCommissionPercentage: number,
        CustomerSellCommissionPercentage: number
    ) {
        this.SwRentCommissionPercentage = SwRentCommissionPercentage;
        this.InvestorSellCommissionPercentage = InvestorSellCommissionPercentage;
        this.CustomerSellCommissionPercentage = CustomerSellCommissionPercentage;
    }

    static calcTotalPaid(unit: Unit): number{
        let annualInitRent = unit.initAnnualRent;
        return annualInitRent * (Math.pow((1+unit.annualRentIncreasePercentage), unit.rentYears)-1) / ((1+unit.annualRentIncreasePercentage)-1);
    }

}