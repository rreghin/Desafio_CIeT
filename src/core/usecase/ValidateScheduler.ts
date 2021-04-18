import Scheduler from "../entity/Scheduler";
import ISchedulerRepository from "../interface/ISchedulerRepository";

export default class ValidateScheduler {
    schedulerRepository: ISchedulerRepository;

    constructor(schedulerRepository: ISchedulerRepository) {
        this.schedulerRepository = schedulerRepository;
    }

    execute(data?: any) {
        const scheduler = this.schedulerRepository.importScheduler(data);
        return scheduler;
    }
}