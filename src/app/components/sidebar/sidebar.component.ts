import { Component, inject, ViewChild } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { FormsModule } from '@angular/forms';
import { NotificationComponent } from '../notif/notification.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [FormsModule, NotificationComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  todoService = inject(TodoService);

  @ViewChild('notif') notif!: NotificationComponent;

  newFolderName = '';
  newFolderColor = '#4fc3f7';
  showAddForm = false;
  editingFolderId: number | null = null;
  editFolderName = '';
  editFolderColor = '';

  colorOptions = ['#4fc3f7', '#81c784', '#ffb74d', '#f06292', '#ba68c8', '#ff8a65', '#4dd0e1', '#aed581'];

  selectFolder(id: number | null): void {
    this.todoService.selectFolder(id);
    this.editingFolderId = null;
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
    this.newFolderName = '';
    this.newFolderColor = '#4fc3f7';
  }

  addFolder(): void {
    if (this.newFolderName.trim()) {
      this.todoService.addFolder(this.newFolderName, this.newFolderColor);
      this.notif.show(`Папка «${this.newFolderName}» создана`, 'success');
      this.newFolderName = '';
      this.newFolderColor = '#4fc3f7';
      this.showAddForm = false;
    }
  }

  startEdit(folder: { id: number; name: string; color: string }): void {
    this.editingFolderId = folder.id;
    this.editFolderName = folder.name;
    this.editFolderColor = folder.color;
  }

  saveEdit(id: number): void {
    if (this.editFolderName.trim()) {
      this.todoService.editFolder(id, this.editFolderName, this.editFolderColor);
      this.notif.show(`Папка переименована в «${this.editFolderName}»`, 'info');
      this.editingFolderId = null;
    }
  }

  cancelEdit(): void {
    this.editingFolderId = null;
  }

  removeFolder(id: number, event: Event): void {
    event.stopPropagation();
    const folder = this.todoService.folders().find((f) => f.id === id);
    this.todoService.removeFolder(id);
    if (folder) {
      this.notif.show(`Папка «${folder.name}» удалена`, 'warning');
    }
  }
}
