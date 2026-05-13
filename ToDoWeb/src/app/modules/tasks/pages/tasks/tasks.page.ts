import { Component } from '@angular/core';
import { TaskApi } from 'src/app/api/tasks/task.api';
import { UserApi } from 'src/app/api/users/user.api';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { Task } from 'src/app/api/tasks/task.model';
import { Status } from 'src/app/api/status/status.model'; 
import { User } from 'src/app/api/users/user.model';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.css']
})
export class TasksPage {
  public faPencil = faPencil;
  public faCircleExclamation = faCircleExclamation;
  public id: string;
  public tasks: Task[] =[];
  public user: User;
  public isCreateTaskModalOpen: boolean = false;
  public isEditTaskModalOpen: boolean = false;
  public modalTitle: string = '';
  public taskVariable: Task = new Task();

  public statusOptions: Status[] = [
    { id: '1', status: 'Active' },
    { id: '2', status: 'Completed' },
    { id: '3', status: 'Canceled' }
  ];

  public groupedTasks: { [status: string]: Task[] } = {
    'Active': [],
    'Completed': [],
    'Canceled': []
  };

  constructor(private router: Router, 
    private route: ActivatedRoute, 
    private taskAPI: TaskApi, private userAPI: UserApi) {       
  }

  public ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    this.userAPI.GetUserById(this.id).subscribe(result => {
      this.user = new User(result.data);
    });
    
    this.loadTasks();
  }

  public setAssignmentDate(value: string): void {
    this.taskVariable.assignmentDate = value?new Date(value):null;

    // this.taskVariable.assignmentDate = value?new Date(value)?.toLocaleDisplayString(value);

    // this.taskVariable.assignmentDate = new Date(data.assignmentDate)?.toInputDateString();
  }

  public openModal(modalType: string, task?: Task): void {
    this.modalTitle = modalType;

    if(modalType === 'Create Task'){
      this.taskVariable = new Task({user: this.user});
      this.isCreateTaskModalOpen = true;      
    }
    else if (modalType === 'Edit Task') {
      this.taskVariable = task;
      this.isEditTaskModalOpen = true;
    }
  }

  public closeModal(modalType: string) {
    if(modalType === 'Create Task'){
      this.isCreateTaskModalOpen = false;
      this.loadTasks();
     }   
     else if (modalType === 'Edit Task') {
      this.isEditTaskModalOpen = false;
      this.closeModal('Edit Task');
      this.loadTasks();

    }   
  }

  public createTask(): void {
    this.taskAPI.CreateTask(this.taskVariable, this.taskVariable.user.id).subscribe({
      next: (response) => {
        console.log('Response:', response);
        if(!response.success){
          alert(response.messages.join('\n'));
        }
        else{
          this.closeModal('Create Task');
        }      
      }
    });
  }

  public updateTask(): void {
    this.taskAPI.UpdateTask(this.taskVariable, this.user.id, this.taskVariable.id).subscribe({
      next: (response) => {
      console.log('Response:', response);

      if(!response.success){
        alert(response.messages.join('\n'));
      }
      else{
        this.closeModal('Edit Task');

      }}      
    });
  }

  private groupTasksByStatus() {
    this.groupedTasks = {
      'Active': [],
      'Completed': [],
      'Canceled': []
    };

    this.tasks.forEach(task => {
      switch (task.status.status) {
        case 'Active':
          this.groupedTasks['Active'].push(task);
          break;
        case 'Completed':
          this.groupedTasks['Completed'].push(task);
          break;
        case 'Canceled':
          this.groupedTasks['Canceled'].push(task);
          break;
      }
    });
  }

  public getBorderColor(taskStatus: string): string {
    switch (taskStatus) {
      case 'Active':
        return '#c7d927'; // Set the color for active tasks  
        case 'Completed':
        return '#27d948'; // Set the color for completed tasks
        case 'Canceled':
        return '#d92727'; 
      default:
        return '#4772fd'; 
    }
  }

    private loadTasks(): void{
      this.taskAPI.GetTasks(this.id).subscribe(result=>{
        this.tasks = result.data;
        this.groupTasksByStatus(); 
      });
    }
}
