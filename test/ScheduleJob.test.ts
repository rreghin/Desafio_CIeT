import JobRepositoryMemory from "../src/core/infra/repository/JobRepositoryMemory";
import ValidateSchema from "../src/core/usecase/ValidateSchema";

test("Schema should match", async function() {
    const jobRepositoryMemory = new JobRepositoryMemory();
    const validateSchema = new ValidateSchema(jobRepositoryMemory);
    const job = await validateSchema.execute(1);
    expect(job.id).toBe(1);
});