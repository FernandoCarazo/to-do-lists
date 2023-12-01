import { Component } from '@angular/core';
import { CRUDService } from 'src/app/services/crud/crud.service';
import { ActivatedRoute } from '@angular/router';
import { task } from 'src/app/services/objects/task'; 
import { Router } from '@angular/router';
import { user } from 'src/app/services/objects/user';
import { faPencil } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.css']
})
export class TasksPage {
  faPencil = faPencil;

  public id:string;
  public userid:string;
  public taskid: string;
  public Tasks:task[] =[];
  Users:user[]=[];

  statusOptions: any[] = [
    { id: 1, name: 'Active' },
    { id: 2, name: 'Completed' },
    { id: 3, name: 'Canceled' }
  ];

  groupedTasks: { [status: string]: task[] } = {
    'Active': [],
    'Completed': [],
    'Canceled': []
  };

  taskToCreate: any = {
    assignmentName: '',
    assignmentDescription: '',
    assignmentDate: ''
  };

  taskToUpdate: any = {
    id:'',
    assignmentName: '',
    assignmentDescription: '',
    assignmentDate: '',
    StatusId: ''
  };

  isCreateTaskModalOpen = false;
  isEditTaskModalOpen = false;
  modalTitle: string = '';


  openModal(modalType: string, task?: task, userId?: string) {
    this.modalTitle = modalType;

    if(modalType === 'Create Task'){
      this.userid = userId;
      this.isCreateTaskModalOpen = true;      
    }
    else if (modalType === 'Edit Task') {
      this.userid = userId;
      this.taskToUpdate = {
        id: task.id,
        assignmentName: task.assignmentName,
        assignmentDescription: task.assignmentDescription,
        assignmentDate: task.assignmentDate,
        StatusId: task.status.id,
      };
      this.isEditTaskModalOpen = true;
    }
  }

  closeModal(modalType: string, taskId?: string) {
    if(modalType === 'Create Task'){
      this.isCreateTaskModalOpen = false;
     }   
     else if (modalType === 'Edit Task' && taskId) {
      this.isEditTaskModalOpen = false;

    }   
  }

  createTask() {
    this.crudService.createTask(this.taskToCreate, this.userid).subscribe({
      next: (response) => {
        console.log('Task created:', response);
        this.taskToCreate = {
          assignmentName: '',
          assignmentDescription: '',
          assignmentDate: ''
        };
        this.userid='';
        window.location.reload();

      },
      error: (error) => {
        // Handle errors, e.g., show an error message.
        console.error('Error creating user:', error);
        console.log(this.taskToCreate);
      }
    });
  }

  updateTask() {
    this.crudService.updateTask(this.taskToUpdate, this.userid, this.taskToUpdate.id).subscribe(response => {
      console.log('Task updated successfully', response);
      console.log(this.taskToUpdate.status);

      this.isEditTaskModalOpen= false;
      this.taskToUpdate = {
        id:'',
        assignmentName: '',
        assignmentDescription: '',
        assignmentDate: '',
        StatusId: ''
      };
      this.userid='';
       window.location.reload();
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
        default:
          // Handle other status values if needed
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
        return '#d92727'; // Set the color for canceled tasks
      default:
        return '#4772fd'; // Default color for unknown status
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
        console.log("All Tasks:", this.Tasks);  
      });
      
    }
}
