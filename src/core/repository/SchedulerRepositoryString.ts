import Scheduler from "../entity/Scheduler";
import ISchedulerRepository from "../interface/ISchedulerRepository";

export default class SchedulerRepositoryString implements ISchedulerRepository {
    
    importScheduler(data: string): Scheduler {
        var lines: Array<string> = data?.split('\n').map(s => s.trim());
        if (lines && lines.length > 0) {
            const windowFrom = new Date(lines.shift());
            const windowTo = new Date(lines.shift());

            return new Scheduler(windowFrom, windowTo);
        }
        throw new Error("No data to import from.");
    }

}