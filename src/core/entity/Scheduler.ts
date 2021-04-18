import Job from "./Job";

export default class Scheduler {
    windowFromDate: any;
    windowToDate: any;
    serializeGroups: boolean;
    jobs: Array<Job>;
    jobGroups: Array<Array<Number>> = [];

    constructor(windowFromDate: any, windowToDate: any, serializeGroups?: boolean, jobs?: Array<Job>) {
        this.windowFromDate = new Date(windowFromDate);
        this.windowToDate = new Date(windowToDate);
        this.serializeGroups = (serializeGroups||false);
        this.jobs = (jobs||[]);
    }
}