
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
    initAnnualRent = this.initMonthlyRent * 12;
    upgradeFeePercentage: number;
    rentYears: number;
    unitPrice: number;
    annualRentIncreasePercentage: number = 0.1;
    annualAppreciationPercentage: number = 0.12;
    
    isBought: boolean;
    
    calcUnitPrice(){
        this.unitPrice = this.originalPrice * Math.pow((1 + this.annualAppreciationPercentage), this.rentYears);
        return this.unitPrice;
    }
}