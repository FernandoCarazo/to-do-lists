import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayout } from './layouts/main/main.layout';
import { RouterModule } from '@angular/router';
import { ModalComponent } from './components/modal/modal.component';
import { TaskCardComponent } from './components/taskCard/task-card/task-card.component';

@NgModule({
  declarations: [
    MainLayout,
    ModalComponent,
    TaskCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,

  ],
  exports: [
    ModalComponent
  ]
})
export class SharedModule { }
