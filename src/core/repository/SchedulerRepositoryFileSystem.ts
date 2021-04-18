import Scheduler from "../entity/Scheduler";
import ISchedulerRepository from "../interface/ISchedulerRepository";

export default class SchedulerRepositoryFileSystem implements ISchedulerRepository {
    
    importScheduler(data?: any): Promise<Scheduler> {
        throw new Error("Method not implemented.");
    }

}