import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent implements OnChanges {
  @Input() isOpen = false;
  @Input() title = '';
  @Input() todoTitle = '';
  @Input() todoFolderId = 0;
  @Input() folderOptions: { id: number; name: string; color: string }[] = [];

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<{ title: string; folderId: number }>();

  editTitle = '';
  editFolderId = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpen'] && this.isOpen) {
      this.editTitle = this.todoTitle;
      this.editFolderId = this.todoFolderId;
    }
  }

  onSave(): void {
    if (this.editTitle.trim()) {
      this.save.emit({ title: this.editTitle.trim(), folderId: this.editFolderId });
      this.close.emit();
    }
  }

  onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.close.emit();
    }
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.close.emit();
    }
  }
}
