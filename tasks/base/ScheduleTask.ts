import { CronJob } from "cron";
import { ITask } from "../../Interfaces/ITask";

abstract class ScheduleTask implements ITask{
    
    abstract cronTime: string;
    abstract do(): void;
    timeZone: string = 'Africa/Cairo';
    task: CronJob;
    run(): void{
        this.task = new CronJob(this.cronTime, this.do, null, false, this.timeZone);
        this.task.start();
    }
}

export default ScheduleTask;