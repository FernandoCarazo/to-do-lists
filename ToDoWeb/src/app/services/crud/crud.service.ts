import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { user } from '../objects/user';
import { task } from '../objects/task';

@Injectable({
  providedIn: 'root'
})
export class CRUDService {
  API: string='https://localhost:7158/api/persons/'



  constructor(private clienteHttp:HttpClient) { };

  GetUsers(): Observable<any>{
    return this.clienteHttp.get(this.API);
  }

  GetUserById(id:string): Observable<any>{
    return this.clienteHttp.get(this.API +id);
  }

  createUser(user: user): Observable<any> {
    return this.clienteHttp.post(this.API, user);
  }

  updateUser(userToUpdate: user, userid:string) {
    // Construct the URL with the user's ID, but ensure there's no extra trailing slash
    const url = `${this.API}${userid}`;
    return this.clienteHttp.put<user>(url, userToUpdate);
  }

  deleteUser(userId: string): Observable<any> {
    return this.clienteHttp.delete(this.API +userId);
  }

  GetTasks(id:string): Observable<any>{
    return this.clienteHttp.get(this.API+ id + "/tasks");
  } 

  createTask(task: task, userId: string): Observable<any> {
    return this.clienteHttp.post(this.API+ userId + "/tasks", task);
  }

  updateTask(taskToUpdate: task, userId: string, taskId:string) {
    const url = `${this.API}${userId}/tasks/${taskId}`;
    console.log("user:" + userId);
    console.log("task" + taskId)
    return this.clienteHttp.put<task>(url, taskToUpdate);
  }








}
