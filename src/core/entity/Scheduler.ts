import Job from "./Job";

export default class Scheduler {
    windowFromDate: any;
    windowToDate: any;
    serializeGroups: boolean;
    jobGroups: Array<Array<Job>>;

    constructor(windowFromDate: any, windowToDate: any, serializeGroups?: boolean, jobGroups?: Array<Array<Job>>) {
        this.windowFromDate = new Date(windowFromDate);
        this.windowToDate = new Date(windowToDate);
        this.serializeGroups = (serializeGroups||false);
        this.jobGroups = (jobGroups||[]);
    }
}