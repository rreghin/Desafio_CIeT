import SchedulerRepositoryMemory from "../src/core/repository/SchedulerRepositoryMemory";
import ValidateScheduler from "../src/core/usecase/ValidateScheduler";

test("Should import from ordinary string", function() {
    const schedulerRepository = new SchedulerRepositoryMemory();
    const validateScheduler = new ValidateScheduler(schedulerRepository);
    const scheduler = validateScheduler.execute();
    expect(job.id).toBe(1);
});