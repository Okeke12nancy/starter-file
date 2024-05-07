import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
    @Input() isOpen: boolean = false;
  @Input() modalType: string = '';
  @Output() isClose = new EventEmitter<boolean>()

  ngOnChanges(): void {
    this.toggleBodyOverflow(this.isOpen);
  }

  onClose(): void {
    this.isClose.emit();
  }

  onModalClick(event: Event): void {
    event.stopPropagation();
  }

  toggleBodyOverflow(open: boolean): void {
    const body = document.body;
    if (body) {
      body.style.overflow = open ? 'hidden' : 'unset';
    }
  }

}
