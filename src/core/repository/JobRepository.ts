import Job from "../entity/Job";

export default interface JobRepository {

    getJob(id: number): Promise<Job>;

}