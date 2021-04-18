import Scheduler from "./core/entity/Scheduler";
import ISchedulerRepository from "./core/interface/ISchedulerRepository";
import SchedulerRepositoryTextFile from "./core/repository/SchedulerRepositoryTextFile";

function printResult(array: Array<Array<Number>>) {
	var stringResult = '';
	array.forEach(function(group: Array<Number>) {
		stringResult += (stringResult?',\n':'') + '    ' + JSON.stringify(group).split(',').join(', ');
	});
	process.stdout.write('[\n' + stringResult + '\n]\n\n');
}

(function /*main*/() {
    const tempoMaximoHoras: number = 8;
    const tempoMaximoSegundos: number = 60 * 60 * tempoMaximoHoras;

    const repository: ISchedulerRepository = new SchedulerRepositoryTextFile();
    const scheduler: Scheduler = repository.importScheduler('/home/app/input.txt');

    scheduler.buildJobGroups(tempoMaximoSegundos);

    printResult(scheduler.jobGroups);
})();
