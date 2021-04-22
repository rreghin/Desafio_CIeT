import SchedulerRepositoryObject from "../src/core/repository/SchedulerRepositoryObject";
import SchedulerRepositoryTextFile from "../src/core/repository/SchedulerRepositoryTextFile";
import ValidateScheduler from "../src/core/usecase/ValidateScheduler";

test("Should import from OBJECT", function() {
    const schedulerRepository = new SchedulerRepositoryObject();
    const validateScheduler = new ValidateScheduler(schedulerRepository);
    const scheduler = validateScheduler.execute({
        from: '2019-11-10 09:00:00',
        to: '2019-11-11 12:00:00',
        serialize: true,
        /*jobs: null*/
    });
    expect(scheduler.windowFromDate.toISOString()).toBe('2019-11-10T09:00:00.000Z');
    expect(scheduler.windowToDate.toISOString()).toBe('2019-11-11T12:00:00.000Z');
    expect(scheduler.serializeGroups).toBe(true);
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

    // roda uma vez pra ver se funciona
    scheduler.buildJobGroups((8/*horas*/ * 60 * 60));
    expect(scheduler.jobGroups.toString()).toBe('1,3,2');
    expect(scheduler.jobs.map(j => j.id).toString()).toBe('1,2,3');

    // roda uma segunda vez pra ver se obtem o mesmo resultado
    scheduler.buildJobGroups((8/*horas*/ * 60 * 60));
    expect(scheduler.jobGroups.toString()).toBe('1,3,2');
    expect(scheduler.jobs.map(j => j.id).toString()).toBe('1,2,3');

    // roda uma terceira vez pra testar outro maximo por grupo
    scheduler.buildJobGroups((4/*horas*/ * 60 * 60));
    expect(scheduler.jobGroups.toString()).toBe('1,2');
    expect(scheduler.jobs.map(j => j.id).toString()).toBe('1,2,3');
});

test("Sould import from TEXT FILE", function() {
    const schedulerRepository = new SchedulerRepositoryTextFile();
    const validateScheduler = new ValidateScheduler(schedulerRepository);
    const scheduler = validateScheduler.execute('/home/app/input-serial.txt');

    expect(scheduler.serializeGroups).toBe(true);

    scheduler.buildJobGroups((8/*horas*/ * 60 * 60));
    expect(scheduler.jobGroups.toString()).toBe('1');
});