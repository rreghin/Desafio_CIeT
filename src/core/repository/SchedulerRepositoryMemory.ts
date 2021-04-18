import Scheduler from "../entity/Scheduler";
import ISchedulerRepository from "../interface/ISchedulerRepository";

export default class SchedulerRepositoryMemory implements ISchedulerRepository {

    importScheduler(data?: any): Scheduler {
        if (data != undefined && data != null) {
            if (!data.from)
                throw new Error("Start date not informed.");
            if (!data.to)
                throw new Error("End date not informed.");
            return new Scheduler(new Date(data.from), new Date(data.to), data.groups);
        }
        throw new Error("No data to import from.");
    }

}