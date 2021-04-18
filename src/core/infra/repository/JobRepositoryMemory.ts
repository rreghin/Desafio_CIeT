import Job from "../../entity/Job";
import JobRepository from "../../repository/JobRepository";

export default class JobRepositoryMemory implements JobRepository {

    getJob(id: number): Promise<Job> {
        return Promise.resolve(new Job(1, "Backup", (2 * 60 * 60), new Date("2021-04-18T03:30:00")));
    }

}