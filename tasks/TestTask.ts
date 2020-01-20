import ScheduleTask from "./base/ScheduleTask";


class TestTask extends ScheduleTask{
    cronTime: string = '00 00 00 * * *'; //At Midnight
    do(): void {
        console.log('You will see this message at midnight everyday');
    }
}

export default new TestTask();