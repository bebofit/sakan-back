
export default class Unit {
    constructor(
        originalPrice: number,
        initMonthlyRent: number,
        rentYears: number,
        upgradeFeePercentage: number,
        isBought: boolean = false,
        unitPrice: number = 0,
        annualRentIncreasePercentage: number = 0.1,
        annualAppreciationPercentage: number = 0.12,
    ){
        this.originalPrice = originalPrice;
        this.initMonthlyRent = initMonthlyRent;
        this.rentYears = rentYears;
        this.upgradeFeePercentage = upgradeFeePercentage;
        this.isBought = isBought;
        this.unitPrice = unitPrice;
        this.annualAppreciationPercentage = annualAppreciationPercentage;
        this.annualRentIncreasePercentage = annualRentIncreasePercentage;
    }

    originalPrice: number;
    initMonthlyRent: number;
    initAnnualRent: number;
    upgradeFeePercentage: number;
    rentYears: number;
    unitPrice: number;
    annualRentIncreasePercentage: number = 0.1;
    annualAppreciationPercentage: number = 0.12;
    
    isBought: boolean;
    
    calcUnitPrice(cumYearsNum: number){
        this.unitPrice = +((this.originalPrice * Math.pow((1 + this.annualAppreciationPercentage), cumYearsNum)).toFixed(2));
    }

    calcInitAnnualRent(cumYearsNum: number, index: any){
        if(index == 0){
            this.initAnnualRent = this.initMonthlyRent * 12;
            return this.initAnnualRent;
        }
        let x = Math.pow(1 + this.annualRentIncreasePercentage , cumYearsNum - this.rentYears);
        this.initAnnualRent = +((this.initMonthlyRent * x * 12).toFixed(2));
    }
}