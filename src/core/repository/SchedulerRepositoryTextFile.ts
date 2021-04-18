import Job from "../entity/Job";
import Scheduler from "../entity/Scheduler";
import ISchedulerRepository from "../interface/ISchedulerRepository";
import JobRepositoryMemory from "./JobRepositoryMemory";

var fs = require('fs');

export default class SchedulerRepositoryTextFile implements ISchedulerRepository {

    importScheduler(filename: string): Scheduler {
        if (filename) {
            if (fs.existsSync(filename)) {
                var data = fs.readFileSync(filename, 'utf8');
                if (data) {
                    var lines: Array<string> = data?.split('\n').map(s => s.trim());
                    if (lines && lines.length > 0) {
                        const windowFrom = new Date(lines.shift());
                        const windowTo = new Date(lines.shift());

                        var doSerialize = false;
                        if (lines[0] != '[') 
                            doSerialize = (lines.shift().toLowerCase() === 'true');

                        const jobs = this.buildJobsArray(lines);
            
                        return new Scheduler(windowFrom, windowTo, doSerialize, jobs);
                    }
                }
            }
            throw new Error("File not found.");
        }
        throw new Error("File not specified.");
    }

    private buildJobsArray(array: Array<string>): Array<Job> {
        var tempJobsStr: string = "";

        array.forEach(function(line: string) {
            if (line.indexOf(': ') >= 0) {
                var parts = line.split(': ',2);
                if (line.indexOf('",') < 0)
                    line = parts[0] + ':\'' + (parts[1]||'').split(',')[0].trim() + '\','
                else
                    line = parts[0] + ':' + (parts[1]||'').trim().replace(/\"/gi,'\'');
            }
            tempJobsStr += line;
        });
     
        tempJobsStr = tempJobsStr.replace(/ID/gi,'id').
                    replace(/Descrição/gi,'descricao').
                    replace(/Data Máxima de conclusão/gi,'dataMaximaDeConclusao').
                    replace(/Tempo estimado/gi,'tempoEstimado');
     
        var tempJobs: Array<any> = eval(tempJobsStr);
        const result: Array<Job> = [];

        tempJobs.forEach(function(job: any) {
            var whole = job.tempoEstimado.split(' ');
            var value = Number.parseInt(whole[0]);
            var unit = whole[1];
            if (unit.search(/HORAS/i) >= 0)
                job.tempoEstimadoSegundos = (60 * 60) * value;
            else if (unit.search(/MINUTOS/i) >= 0)
                job.tempoEstimadoSegundos = (60) * value;
            else if (unit.search(/SEGUNDOS/i) >= 0)
                job.tempoEstimadoSegundos = value;
     
            result.push(new Job(
                Number.parseInt(job.id),
                job.descricao,
                job.tempoEstimadoSegundos,
                job.dataMaximaDeConclusao
            ));
        });

        return result;
    }

}