import { Component } from '@angular/core';
import { CRUDService } from 'src/app/services/crud/crud.service';
import { ActivatedRoute } from '@angular/router';
import { task } from 'src/app/services/objects/task'; 
import { Router } from '@angular/router';
import { user } from 'src/app/services/objects/user';
import { status } from 'src/app/services/objects/status';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.css']
})
export class TasksPage {
  faPencil = faPencil;
  faTrash = faTrash;
  faEllipsisVertical = faEllipsisVertical;
  public id:string;
  public userid:string;
  public taskid: string;
  public Tasks:task[] =[];
  public ActiveTasks:task[]= [];
  public CanceledTasks:task[]= [];
  public CompletedTasks:task[]= [];
  Users:user[]=[];

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

  statusOptions: any[] = [
    { id: 1, name: 'Active' },
    { id: 2, name: 'Completed' },
    { id: 3, name: 'Canceled' }
  ];
  
  isCreateTaskModalOpen = false;
  isDropdownOpen: { [key: string]: boolean } = {};   
  lastOpenedDropdownId: string | null = null;
  
  isEditTaskModalOpen: { [taskId: string]: boolean } = {}; 
  modalTitle: string = '';
  openModal(modalType: string, task?: task) {
    if (modalType === 'Edit Task') {
      this.isEditTaskModalOpen[task.id] = true;
    }
  }

  openEditTaskModal(modalType: string, task: task, userId: string) {
    this.modalTitle = modalType;

    this.userid = userId;
    this.taskToUpdate = {
      id: task.id,
      assignmentName: task.assignmentName,
      assignmentDescription: task.assignmentDescription,
      assignmentDate: task.assignmentDate,
      StatusId: task.status.id,
    };
    console.log(task.status.id);
    console.log(this.taskToUpdate.StatusId);

    if (modalType === 'Edit Task') {
      this.isEditTaskModalOpen[task.id] = true;
    }
  }

  openCreateTaskModal(modalType: string , userId: string) {
this.modalTitle = modalType;
    this.userid = userId;
    if (modalType === 'Create Task') {
      this.isCreateTaskModalOpen = true;
    }
  }

  closeModal(modalType: string, taskId?: string) {
    if(modalType === 'Create Task'){
      this.isCreateTaskModalOpen = false;
     }   
     else if (modalType === 'Edit Task' && taskId) {
      // Set the flag in the dictionary for this task
      this.isEditTaskModalOpen[taskId] = false;
    }   
  }

  toggleDropdown(userId: string): void {
    if (this.lastOpenedDropdownId && this.lastOpenedDropdownId !== userId) {
      // Close the last opened dropdown if a different one is clicked
      this.isDropdownOpen[this.lastOpenedDropdownId] = false;
    }
    // Toggle the dropdown for the current user
    this.isDropdownOpen[userId] = !this.isDropdownOpen[userId];
    // Update the last opened dropdown ID
    this.lastOpenedDropdownId = this.isDropdownOpen[userId] ? userId : null;
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

      this.isEditTaskModalOpen[this.taskToUpdate.id] = false;
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

        console.log("All Tasks:", this.Tasks);

      this.ActiveTasks = this.Tasks.filter((task: any) => {
        return task.status && +task.status.id === 1;
      });

      this.CompletedTasks = this.Tasks.filter((task: any) => {
        return task.status && +task.status.id === 2;
      });

      this.CanceledTasks = this.Tasks.filter((task: any) => {
        return task.status && +task.status.id === 3;
      });
        
        console.log("Active Tasks:", this.ActiveTasks);
        
      });
      
    }
}
