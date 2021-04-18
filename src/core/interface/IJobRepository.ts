import Job from "../entity/Job";

export default interface IJobRepository {

    getJob(id: number): Job;

}