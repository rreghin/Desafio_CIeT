import JobRepositoryMemory from "../src/core/repository/JobRepositoryMemory";
import ValidateJob from "../src/core/usecase/ValidateJob";

test("Schema should match", function() {
    const jobRepositoryMemory = new JobRepositoryMemory();
    const validateJob = new ValidateJob(jobRepositoryMemory);
    const job = validateJob.execute(1);
    expect(job.id).toBe(1);
});

test("Should have an MaxStartDate", function() {
    const jobRepositoryMemory = new JobRepositoryMemory();
    const validateJob = new ValidateJob(jobRepositoryMemory);
    const job = validateJob.execute(1);
    expect(job.maxStartDate.toISOString()).toBe("2021-04-18T01:30:00.000Z");
});
