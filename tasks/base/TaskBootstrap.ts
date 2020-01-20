import testTask from '../TestTask';
import { ITask } from '../../Interfaces/ITask';


class TaskBootstrap{
    TASKS: Array<ITask> = [testTask];

    bootstrap(): void{
        this.TASKS.forEach(task => {
            task.run();
        });
    }
}

export default new TaskBootstrap();
