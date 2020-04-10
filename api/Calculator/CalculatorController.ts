import Units from "./Units";
import Unit from "./Unit";
import SWCustomer from "./SWCustomer";
import SWInvestor from "./SWInvestor";
import Globals from "./Globals";
import Http from "../Utils/Http";
import {IRequest} from "../../Interfaces";
import {Response} from "express";

class CalculatorController{
    units = new Units([
        new Unit(750000,1000,1,0.1),
        new Unit(1000000,5500,1,0.1),
        new Unit(1000000, 7500, 2, 0.2, true)
    ]);

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

    /**
     * @api
     */
    calculate(request: IRequest, response: Response){
        let u:any = [];
        request.body.units.foreach((unit: any) => {
            u.push(new Unit(
                unit.originalPrice,
                unit.initMonthlyRent,
                unit.rentYears,
                unit.upgradeFeePercentage,
                unit.isBought,
                unit.unitPrice,
                unit.annualRentIncreasePercentage,
                unit.annualAppreciationPercentage,
            ));
        });
        this.units = new Units(u);

        this.initValues(
            this.units,
            request.body.SwRentCommissionPercentage,
            request.body.InvestorSellCommissionPercentage,
            request.body.CustomerSellCommissionPercentage
        )

        return Http.sendResponse(response, httpStatus.OK,{
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
        }, 'Result')
    }


}

export default new CalculatorController();