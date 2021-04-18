import Scheduler from "../entity/Scheduler";

export default interface ISchedulerRepository {

    importScheduler(data?: any): Scheduler;

}