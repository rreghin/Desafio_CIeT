import Job from "../entity/Job";
import IJobRepository from "../interface/IJobRepository";

export default class JobRepositoryMemory implements IJobRepository {

    getJob(id: number): Job {
        return new Job(1, "Backup", (2 * 60 * 60), new Date("2021-04-18T03:30:00"));
    }

}