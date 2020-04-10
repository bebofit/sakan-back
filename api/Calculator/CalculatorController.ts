import Units from "./Units";
import Unit from "./Unit";
import Http from "../Utils/Http";
import {IRequest} from "../../Interfaces";
import {Response} from "express";
import CalculatorService from "./CalculatorService";
import httpStatus = require("http-status");

class CalculatorController{


    /**
     * @api
     */
    calculate(request: IRequest, response: Response){
        let calculatorService = new CalculatorService();
        let u:any = [];
        request.body.units.forEach((unit: any) => {
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
        calculatorService.units = new Units(u);

        calculatorService.initValues(
            calculatorService.units,
            request.body.SwRentCommissionPercentage,
            request.body.InvestorSellCommissionPercentage,
            request.body.CustomerSellCommissionPercentage
        )

        return Http.sendResponse(response, httpStatus.OK, calculatorService.getData(),'Result')
    }


}

export default new CalculatorController();