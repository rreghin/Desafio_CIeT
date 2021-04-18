import IJobRepository from "../interface/IJobRepository";

export default class ValidateJob {
    jobRepository: IJobRepository;

    constructor(jobRepository: IJobRepository) {
        this.jobRepository = jobRepository;
    }

    execute(id: number) {
        const job = this.jobRepository.getJob(id);
        return job;
    }
}