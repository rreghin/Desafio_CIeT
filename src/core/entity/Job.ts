export default class Job {

    public id: number;
    public description: string;
    public estimatedTimeSeconds: number;
    public maxStartDate: any;
    public maxEndDate: any;

    constructor(id: number, description: string, estimatedTimeSeconds: number, maxEndDate: any) {
        this.id = id;
        this.description = description;
        this.estimatedTimeSeconds = estimatedTimeSeconds;
        this.maxEndDate = maxEndDate;    
        this.maxStartDate = new Date(this.maxEndDate - (this.estimatedTimeSeconds * 1000));
    }

}