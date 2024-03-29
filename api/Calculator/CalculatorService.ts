import Units from "./Units";
import SWCustomer from "./SWCustomer";
import SWInvestor from "./SWInvestor";
import Globals from "./Globals";

export default class CalculatorService{
    units: Units;
    swCustomer: SWCustomer;
    swInvestor: SWInvestor;
    //globals
    globals: Globals;
    // vars
    sw2: number = 0;
    actualCollCashFromRent: number;
    totalSwCollection: number;
    profitPercentage: number;

    constructor() {}

    initValues(
        units: Units,
        SwRentCommissionPercentage: number,
        InvestorSellCommissionPercentage: number,
        CustomerSellCommissionPercentage: number
    ){
        this.units = units;
        this.globals = new Globals(
            SwRentCommissionPercentage,
            InvestorSellCommissionPercentage,
            CustomerSellCommissionPercentage
        );

        this.swCustomer = new SWCustomer(this.units);
        this.swInvestor = new SWInvestor(this.units, this.globals);


        this.swCustomer.calcSwCustomer(this.globals.CustomerSellCommissionPercentage);
        this.swCustomer.calcSwCredit();

        this.swInvestor.calcRentCollection();
        this.swInvestor.calcCashRemaining();

        this.sw2 = +((this.swCustomer.swCustomer - this.swInvestor.cashRemaining).toFixed(2));
        this.actualCollCashFromRent = this.swInvestor.rentCollectionsCash.reduce((a,b) => a + b, 0);

        this.totalSwCollection = this.calcTotalSwCollection();
        this.profitPercentage = this.calcProfitPercentage();
    }

    private calcTotalSwCollection(){
        return this.sw2 + this.actualCollCashFromRent;
    }

    private calcProfitPercentage(){
        let {unit} = this.units.getBoughtUnit();
        return +((this.sw2 / unit.unitPrice * 100).toFixed(2));
    }

    getData(){
        return {
            units: this.units,
            swCredit: this.swCustomer.swCredit,
            swCustomerCashAmountRemaining: this.swCustomer.swCustomer,
            swInvestorRentCollection: this.swInvestor.rentCollections,
            swInvestorCashAmountRemaining: this.swInvestor.cashRemaining,
            swRentCollectionCash: this.swInvestor.rentCollectionsCash,
            swSellCollectionCash: this.sw2,
            actualRentCollectionCash: this.actualCollCashFromRent,
            actualSwSellCollectionCash: this.sw2,
            totalSwCollection: this.totalSwCollection,
            profitPercentage: this.profitPercentage
        }
    }

}