import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Task } from './model/task';
import { TaskService } from '../app/service/task.service';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  @ViewChild('swal') private swalDialog: SwalComponent;
  title = 'PlanMyDay';
  darkTheme: NgxMaterialTimepickerTheme = {
    container: {
        bodyBackgroundColor: '#424242',
        buttonColor: '#fff'
    },
    dial: {
        dialBackgroundColor: '#555',
    },
    clockFace: {
        clockFaceBackgroundColor: '#555',
        clockHandColor: '#9fbd90',
        clockFaceTimeInactiveColor: '#fff'
    }
  };
  form = {
    date: new Date(),
    startTime: '17:00',
    endTime: '18:00',
    description: ''
  };
  displayedColumns: string[] = ['selection', 'task', 'start_time', 'end_time', 'remove_task'];
  dataSource = new MatTableDataSource<Task>();
  selection = new SelectionModel(true, []);
  tasks: Task[];
  task: Task = new Task();
  dateForFilter = new Date();

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.defineSugestionStartTime();
    this.defineSugestionEndTime();
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

  addTask() {
    this.task.done = false;
    this.taskService.createTask(this.task);

    // clear form
    this.task = new Task();
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

  defineSugestionStartTime() {
    const current = new Date();
    let hour = current.getHours(),
      minutes = current.getMinutes(),
      result = '';

    if (minutes <= 30) {
      result = `${hour}:30`;
    } else {
      if (hour == 23) {
        result = '00:00';
      } else {
        hour++;
        result = `${hour}:00`;
      }
    }
    this.task.startTime = result;
  }

  defineSugestionEndTime() {
    const current = new Date();
    current.setHours(+this.task.startTime.substring(0, 2));
    current.setMinutes(+this.task.startTime.substring(3, 5));

    const result = new Date(current.getTime() + 30 * 60000);
    this.task.endTime = `${result.getHours()}:${result.getMinutes()}`;
  }

  searchPreviousDay() {
    this.dateForFilter.setDate(this.dateForFilter.getDate() - 1);

    this.getTasks(this.dateForFilter);
  }

  searchNextDay() {
    this.dateForFilter.setDate(this.dateForFilter.getDate() + 1);

    this.getTasks(this.dateForFilter);
  }

}
