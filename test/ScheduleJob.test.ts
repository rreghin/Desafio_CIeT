import JobRepositoryMemory from "../src/core/infra/repository/JobRepositoryMemory";
import ValidateSchema from "../src/core/usecase/ValidateSchema";

test("Schema should match", async function() {
    const jobRepositoryMemory = new JobRepositoryMemory();
    const validateSchema = new ValidateSchema(jobRepositoryMemory);
    const job = await validateSchema.execute(1);
    expect(job.id).toBe(1);
});

test("Should have an MaxStartDate", async function() {
    const jobRepositoryMemory = new JobRepositoryMemory();
    const validateSchema = new ValidateSchema(jobRepositoryMemory);
    const job = await validateSchema.execute(1);
    expect(job.maxStartDate.toISOString()).toBe("2021-04-18T01:30:00.000Z");
});
