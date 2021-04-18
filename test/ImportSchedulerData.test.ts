import SchedulerRepositoryObject from "../src/core/repository/SchedulerRepositoryObject";
import SchedulerRepositoryString from "../src/core/repository/SchedulerRepositoryString";
import SchedulerRepositoryTextFile from "../src/core/repository/SchedulerRepositoryTextFile";
import ValidateScheduler from "../src/core/usecase/ValidateScheduler";

test("Should import from OBJECT", function() {
    const schedulerRepository = new SchedulerRepositoryObject();
    const validateScheduler = new ValidateScheduler(schedulerRepository);
    const scheduler = validateScheduler.execute({
        from: '2019-11-10 09:00:00',
        to: '2019-11-11 12:00:00',
        serialize: undefined,
        jobs: null
    });
    expect(scheduler.windowFromDate.toISOString()).toBe('2019-11-10T09:00:00.000Z');
    expect(scheduler.windowToDate.toISOString()).toBe('2019-11-11T12:00:00.000Z');
    expect(scheduler.serializeGroups).toBe(false);
    expect(scheduler.jobs.toString()).toBe('');
});

test.skip("Sould import from MULTI-LINE STRING", function() {
    const schedulerRepository = new SchedulerRepositoryString();
    const validateScheduler = new ValidateScheduler(schedulerRepository);
    const scheduler = validateScheduler.execute(`
        2019-11-10 09:00:00\n
        2019-11-11 12:00:00\n
    `);
    expect(scheduler.windowFromDate.toISOString()).toBe('2019-11-10T09:00:00.000Z');
    expect(scheduler.windowToDate.toISOString()).toBe('2019-11-11T12:00:00.000Z');
    expect(scheduler.serializeGroups).toBe(false);
    expect(scheduler.jobs.toString()).toBe('');
});

test("Sould import from TEXT FILE", function() {
    const schedulerRepository = new SchedulerRepositoryTextFile();
    const validateScheduler = new ValidateScheduler(schedulerRepository);
    const scheduler = validateScheduler.execute('/home/app/input.txt');
    expect(scheduler.windowFromDate.toISOString()).toBe('2019-11-10T09:00:00.000Z');
    expect(scheduler.windowToDate.toISOString()).toBe('2019-11-11T12:00:00.000Z');
    expect(scheduler.serializeGroups).toBe(false);
    expect(scheduler.jobs.toString()).toBe('[object Object],[object Object],[object Object]');
});