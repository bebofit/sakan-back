import Unit from "./Unit";


export default class Units{

    public objects: Array<Unit>;

    constructor(units: Array<Unit>) {
        this.objects = units;
        this.initUnits();
    }

    initUnits(){
        let cumYearsCount: number = 0;
        this.objects.forEach((unit , index)=> {
            cumYearsCount += unit.rentYears;
            unit.calcUnitPrice(cumYearsCount);
            unit.calcInitAnnualRent(cumYearsCount, index);
        });
    }

    getBoughtUnit(){
        let unit = (this.objects.filter(unit => unit.isBought)[0]);
        let unitIndex = this.objects.indexOf(unit);
        return {unit, unitIndex};
    }

}