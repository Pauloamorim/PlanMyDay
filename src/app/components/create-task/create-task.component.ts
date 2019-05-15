import { Component, OnInit } from '@angular/core';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
import { Task } from '../../model/task';
import { TaskService } from '../../service/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.less']
})
export class CreateTaskComponent implements OnInit {
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
   task: Task = new Task();
   addMore: boolean = false;

  constructor(private taskService: TaskService, private router: Router) { }

  ngOnInit() {
   this.defineSugestionStartTime();
   this.defineSugestionEndTime();
  }

  addTask() {
    this.task.done = false;
    this.taskService.createTask(this.task);

	this.task = new Task();
	if (!this.addMore) {
		this.router.navigateByUrl('/task');
	}
  }

  defineSugestionStartTime() {
    const current = new Date();
    const minutes = current.getMinutes();
    let hour = current.getHours();
    let result = '';

    if (minutes <= 30) {
      result = `${hour}:30`;
    } else {
      if (hour === 23) {
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
}
