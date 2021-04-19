import Job from "./Job";

export default class Scheduler {
    windowFromDate: Date;
    windowToDate: Date;
    serializeGroups: boolean;
    jobs: Array<Job>;
    jobGroups: Array<Array<Number>> = undefined;

    constructor(windowFromDate: Date, windowToDate: Date, serializeGroups?: boolean, jobs?: Array<Job>) {
        this.windowFromDate = new Date(windowFromDate);
        this.windowToDate = new Date(windowToDate);
        this.serializeGroups = (serializeGroups||false);
        this.jobs = (jobs||[]);
    }

    buildJobGroups(maxGroupTimeSeconds: number) {
        this.jobGroups = [];
        
        var tempJobs: Array<Job> = Array.from(this.jobs).sort(function(job1,job2) {
            if (job1.maxStartDate > job2.maxStartDate)
                return 1;
            else if (job1.maxStartDate < job2.maxStartDate)
                return -1;
            else if (job1.estimatedTimeSeconds > job2.estimatedTimeSeconds)
                return 1;
            else if (job1.estimatedTimeSeconds < job2.estimatedTimeSeconds)
                return -1;
            else
                return 0;
        }).reverse();

        var newWindowFromDate: any = new Date(this.windowFromDate);
     
        while (tempJobs.length > 0) {
            var tempGroup: Array<Number> = [];
            var groupTimeSeconds: number = 0;
     
            for (var index=tempJobs.length-1; index>=0; index--) {
                if (tempJobs[index].maxStartDate >= newWindowFromDate && tempJobs[index].maxEndDate <= this.windowToDate) {
                    if (tempJobs[index].estimatedTimeSeconds <= (maxGroupTimeSeconds - groupTimeSeconds)) {
                        var job = tempJobs.splice(index, 1)[0];
                        tempGroup.push(job.id);
                        groupTimeSeconds += job.estimatedTimeSeconds;
                        if (!!this.serializeGroups === true) {
                            newWindowFromDate = new Date(newWindowFromDate - (job.estimatedTimeSeconds * -1000)); // Date só permite subtração??
                        }
                        if (groupTimeSeconds >= maxGroupTimeSeconds)
                            break;
                    }
                }
            }
     
            if (tempGroup.length > 0)
                this.jobGroups.push(tempGroup);
            else 
                break;
        }
    }
}