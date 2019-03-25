import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private firestore: AngularFirestore) { }

  getTasks(filterDate?: Date) {
    if(!filterDate){
      filterDate = new Date();
    }
    //remove hours to fiter timestamp in firebase
    filterDate.setHours(0, 0, 0, 0);
    return this.firestore.collection('tasks', ref => ref.where('date', '==', filterDate).orderBy('startTime', 'asc')).snapshotChanges();
  }

  createTask(task: Task){
    task.date.setHours(0, 0, 0, 0);
    return this.firestore.collection('tasks').add({...task});
  }

  deleteTask(taskId: string){
    this.firestore.doc('tasks/' + taskId).delete();
  }

  updateTask(task: Task){ 
    this.firestore.doc('tasks/' + task.id).update(task);
  }
}
