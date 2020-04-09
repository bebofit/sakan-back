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
}