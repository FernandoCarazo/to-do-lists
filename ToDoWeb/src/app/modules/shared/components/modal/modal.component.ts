import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() title: string;
  @Input() isOpen: boolean;
  @Output() closeModal = new EventEmitter<void>();
  @Input() contentType: string;

}
