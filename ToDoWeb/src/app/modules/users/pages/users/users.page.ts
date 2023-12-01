import { Component } from '@angular/core';
import { CRUDService } from 'src/app/services/crud/crud.service';
import { ActivatedRoute } from '@angular/router';
import { user } from 'src/app/services/objects/user';
import { Router } from '@angular/router';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.css']
})

export class UsersPage {
  faEllipsisVertical = faEllipsisVertical;
  Users:user[];
  
  userToCreate: any = {
    firstName: '',
    lastName: '',
    email: ''
  };
  userToUpdate: any = {
    firstName: '',
    lastName: '',
    email: ''
  };

   userid:string;
   modalTitle: string = "";
   isCreateModalOpen = false;
   isEditUserModalOpen= false;
   isDeleteUserModalOpen = false;

   isDropdownOpen: { [key: string]: boolean } = {};   
   lastOpenedDropdownId: string | null = null;


   openModal(modalType: string, user?: user) {
    this.modalTitle = modalType;

    if(modalType === 'Create User') {
     this.isCreateModalOpen = true;
    } 
    else if(modalType === 'Edit User') {
      this.isEditUserModalOpen = true;
      this.modalTitle = modalType;
      this.userid = user.id;
      this.userToUpdate = {
        firstName: user.firstName, // You can set initial values if needed
        lastName: user.lastName,
        email: user.email,
      };
    }
    else if (modalType === 'Delete User') {
      this.isDeleteUserModalOpen= true;
    }   
    }
 
   closeModal(modalType: string) {
    if(modalType === 'Create User'){
      this.isCreateModalOpen = false;
     }   
     else if(modalType === 'Edit User'){
        this.isEditUserModalOpen=false;
     }  
    else if (modalType === 'Delete User') {
          this.isDeleteUserModalOpen = false;
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

   createUser() {
    this.crudService.createUser(this.userToCreate).subscribe({
      next: (response) => {
        console.log('User created:', response);
        this.userToCreate = {
          firstName: '',
          lastName: '',
          email: ''
        };
         window.location.reload();
      },
      error: (error) => {
        // Handle errors, e.g., show an error message.
        console.error('Error creating user:', error);
      }
    });
  }

  updateUser() {
    this.crudService.updateUser(this.userToUpdate, this.userid).subscribe(response => {
      console.log('User updated successfully', response);
      this.isEditUserModalOpen = false;
      window.location.reload();
    });
  }

  deleteUser(userId: string) {
    this.crudService.deleteUser(userId).subscribe({
      next: (response) => {
        console.log(userId);
        console.log('User deleted successfully', response);
        this.isDeleteUserModalOpen = false;
        window.location.reload();
      },
      error: (error) => {
        console.error('Error deleting user', error);
      },
    });
  }

  constructor(private router: Router, 
    private route: ActivatedRoute, 
    private crudService: CRUDService) {

  }

  ngOnInit(): void {
    this.crudService.GetUsers().subscribe(result=>{
      this.Users = result.data;
      console.log(result)
    })
}
}
