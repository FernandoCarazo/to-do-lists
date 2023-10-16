import { Component } from '@angular/core';
import { CRUDService } from 'src/app/services/crud/crud.service';
import { user } from 'src/app/services/crud/objects/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.css']
})

export class UsersPage {
  public Users:user[];

  constructor(private crudService: CRUDService) {

  }

  ngOnInit(): void {
    this.crudService.GetUsers().subscribe(result=>{
      this.Users = result.data;
      console.log(result)
    })
}
}
