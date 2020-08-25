import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource} from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Task } from '../../model/task';
import { TaskService } from '../../service/task.service';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

@Component({
 selector: 'app-task',
 templateUrl: './task.component.html',
 styleUrls: ['./task.component.less']
})
  export class TaskComponent implements OnInit {

  @ViewChild('swal') private swalDialog: SwalComponent;
  title = 'PlanMyDay';

  displayedColumns: string[] = ['selection', 'task', 'start_time', 'end_time', 'remove_task'];
  dataSource = new MatTableDataSource<Task>();
  selection = new SelectionModel(true, []);
  tasks: Task[];
  task: Task = new Task();
  dateForFilter = new Date();

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.getTasks();
  }

  getTasks(date?: Date) {
    this.taskService.getTasks(date).subscribe(data => {
      this.tasks = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Task;
      });
      this.dataSource.data = this.tasks;
    });
  }

  checkSelection(task) {
    task.done = !task.done;
    if (task.done) {
      this.swalDialog.show();
    }
    this.taskService.updateTask(task);
  }

  removeTask(id) {
    this.taskService.deleteTask(id);
  }

  searchPreviousDay() {
    this.dateForFilter.setDate(this.dateForFilter.getDate() - 1);

    this.getTasks(this.dateForFilter);
  }

  displayDate() {
	const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' });
	const [{ value: month },, { value: day },, { value: year }] = dateTimeFormat .formatToParts(this.dateForFilter);
	return `${day}/${month}/${year}`;
  }

  searchNextDay() {
    this.dateForFilter.setDate(this.dateForFilter.getDate() + 1);

    this.getTasks(this.dateForFilter);
  }

}
