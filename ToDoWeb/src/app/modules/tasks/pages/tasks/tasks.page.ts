import { Component } from '@angular/core';
import { CRUDService } from 'src/app/services/crud/crud.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { Task } from 'src/app/api/tasks/task.model';
import { Status } from 'src/app/api/status/status.model'; 
import { User } from 'src/app/api/users/user.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.css']
})
export class TasksPage {
  faPencil = faPencil;

  public id:string;
  public Tasks:Task[] =[];
  Users:User[]=[];

  statusOptions: Status[] = [
    { id: '1', status: 'Active' },
    { id: '2', status: 'Completed' },
    { id: '3', status: 'Canceled' }
  ];

  groupedTasks: { [status: string]: Task[] } = {
    'Active': [],
    'Completed': [],
    'Canceled': []
  };

  taskVariable: Task = {
    id: '',
    assignmentName: '',
    assignmentDescription: '',
    assignmentDate: null,
    status: {
      id: '',
      status: '',
    },
    user: {
      id: '',
      firstName: '',
      lastName: '',
      email: ''
    }
  };

  isCreateTaskModalOpen = false;
  isEditTaskModalOpen = false;
  modalTitle: string = '';


  openModal(modalType: string, task?: Task, user?: User) {
    this.modalTitle = modalType;

    if(modalType === 'Create Task'){
      this.taskVariable = {
        id: '',
        assignmentName: '',
        assignmentDescription: '',
        assignmentDate: null,
        status: {
          id: '',
          status: '',
        },
        user: {
          id: '',
          firstName: '',
          lastName: '',
          email: ''
        }
      };
      this.isCreateTaskModalOpen = true;      
    }
    else if (modalType === 'Edit Task') {
      this.taskVariable = {
        id: task.id,
        assignmentName: task.assignmentName,
        assignmentDescription: task.assignmentDescription,
        assignmentDate: task.assignmentDate,
        status: task.status,
        user: user
      };
      this.isEditTaskModalOpen = true;
    }
  }

  closeModal(modalType: string) {
    if(modalType === 'Create Task'){
      this.isCreateTaskModalOpen = false;
     }   
     else if (modalType === 'Edit Task') {
      this.isEditTaskModalOpen = false;
    }   
  }

  createTask() {
    let TaskCreate: Task;
    TaskCreate = new Task(this.taskVariable);

    this.crudService.createTask(TaskCreate, TaskCreate.user.id).subscribe({
      next: (response) => {
        console.log('Response:', response);
        if(!response.success){
          alert(response.messages.join('\n'));
        }
        else{
          this.taskVariable = {
            id: '',
            assignmentName: '',
            assignmentDescription: '',
            assignmentDate: null,
            status: {
              id: '',
              status: '',
            },
            user: {
              id: '',
              firstName: '',
              lastName: '',
              email: ''
            }
          };
          window.location.reload();
        }      
      }
    });
  }

  updateTask(task?: Task, user?: User) {
    let TaskUpdate: Task;
    TaskUpdate = new Task(this.taskVariable);
    
    this.crudService.updateTask(TaskUpdate, TaskUpdate.user.id, TaskUpdate.id).subscribe({
      next: (response) => {
      console.log('Response:', response);

      if(!response.success){
        alert(response.messages.join('\n'));
      }
      else{
        this.isEditTaskModalOpen= false;
        this.taskVariable = {
          id: '',
          assignmentName: '',
          assignmentDescription: '',
          assignmentDate: null,
          status: {
            id: '',
            status: '',
          },
          user: {
            id: '',
            firstName: '',
            lastName: '',
            email: ''
          }
        };
        window.location.reload();
      }}      
    });
  }

  groupTasksByStatus() {
    this.groupedTasks = {
      'Active': [],
      'Completed': [],
      'Canceled': []
    };

    this.Tasks.forEach(task => {
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

  getBorderColor(taskStatus: string): string {
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

    constructor(private router: Router, 
      private route: ActivatedRoute, 
      private crudService: CRUDService) { 
    }

    ngOnInit(): void {
      this.id = this.route.snapshot.paramMap.get('id');

      this.crudService.GetUserById(this.id).subscribe(result => {
        this.Users = [result.data]; // Wrap the user object in an array if necessary
        console.log("All Users:", this.Users);
      });
      
      this.crudService.GetTasks(this.id).subscribe(result=>{
        this.Tasks = result.data;
        this.groupTasksByStatus(); 
      });
      
    }
}
