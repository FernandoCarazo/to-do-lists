import { Component, ElementRef, HostListener } from '@angular/core';
import { CRUDService } from 'src/app/services/crud/crud.service';
import { ActivatedRoute } from '@angular/router';
// import { user } from 'src/app/services/objects/user';
import { Router } from '@angular/router';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/api/users/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.css'],
  host: {
    '(document:click)': 'onClick($event)',
  },
})
export class UsersPage {
  faEllipsisVertical = faEllipsisVertical;
  Users:User[];

  userVariable: User = {
    id: '',
    firstName: '',
    lastName: '',
    email: ''
  };

   userid:string;
   modalTitle: string = "";
   isCreateUserModalOpen = false;
   isEditUserModalOpen= false;
   isDeleteUserModalOpen = false;

  //  isDropdownOpen: { [key: string]: boolean } = {};   
  //  lastOpenedDropdownId: string | null = null;

  isDropdownOpen = false;

   openModal(modalType: string, user?: User) {
    this.modalTitle = modalType;

    if(modalType === 'Create User') {
     this.isCreateUserModalOpen = true;
     this.userVariable = {
      id: '',
      firstName: '', 
      lastName: '',
      email: '',
    };
    } 
    else if(modalType === 'Edit User') {
      this.isEditUserModalOpen = true;
      this.modalTitle = modalType;
        this.userVariable = {
        id: user.id,
        firstName: user.firstName, 
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
      this.isCreateUserModalOpen = false;
     }   
     else if(modalType === 'Edit User'){
        this.isEditUserModalOpen=false;
     }  
    else if (modalType === 'Delete User') {
          this.isDeleteUserModalOpen = false;
    }
   }

  //  toggleDropdown(userId: string): void {
  //   if (this.lastOpenedDropdownId && this.lastOpenedDropdownId !== userId) {
  //     // Close the last opened dropdown if a different one is clicked
  //     this.isDropdownOpen[this.lastOpenedDropdownId] = false;
  //   }
  //   // Toggle the dropdown for the current user
  //   this.isDropdownOpen[userId] = !this.isDropdownOpen[userId];
  //   // Update the last opened dropdown ID
  //   this.lastOpenedDropdownId = this.isDropdownOpen[userId] ? userId : null;
  // }

   createUser() {
    this.crudService.createUser(this.userVariable).subscribe({
      next: (response) => {
        console.log('Response:', response);
        if(!response.success){
          alert(response.messages.join('\n'));
        }
        else{
          this.userVariable = {
            id: '',
            firstName: '',
            lastName: '',
            email: ''
          };
          window.location.reload();
        }
      }
    });
  }

  updateUser() {
    this.crudService.updateUser(this.userVariable, this.userVariable.id).subscribe({
      next: (response) => {
        console.log(response);

        if(!response.success){
          alert(response.messages.join('\n'));
        }
        else{
          this.userVariable = {
            id: '',
            firstName: '',
            lastName: '',
            email: ''
          };
          window.location.reload();
        }
      }
    })
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
    private crudService: CRUDService, private elementRef: ElementRef) {

  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.closeDropdown();
    }
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }

  ngOnInit(): void {
    this.crudService.GetUsers().subscribe(result=>{
      this.Users = result.data;
      console.log(result)
    })
}
}
