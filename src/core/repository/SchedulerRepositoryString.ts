import Scheduler from "../entity/Scheduler";
import ISchedulerRepository from "../interface/ISchedulerRepository";

export default class SchedulerRepositoryString implements ISchedulerRepository {
    
    importScheduler(data?: any): Scheduler {
        throw new Error("Method not implemented.");
    }

}