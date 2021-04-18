import JobRepository from "../repository/JobRepository";

export default class ValidateSchema {
    jobRepository: JobRepository;

    constructor(jobRepository: JobRepository) {
        this.jobRepository = jobRepository;
    }

    async execute(id: number) {
        const job = await this.jobRepository.getJob(id);
        return job;
    }
}