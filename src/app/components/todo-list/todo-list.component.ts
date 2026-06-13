import { Component, inject, ViewChild } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { ModalComponent } from '../modal/modal.component';
import { NotificationComponent } from '../notif/notification.component';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [TodoItemComponent, ModalComponent, NotificationComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent {
  todoService = inject(TodoService);

  @ViewChild('notif') notif!: NotificationComponent;

  modalOpen = false;
  editingTodo: Todo | null = null;
  modalTitle = '';
  modalFolderId = 0;

  getFolderColor(folderId: number): string {
    return this.todoService.folders().find((f) => f.id === folderId)?.color ?? '#89b4fa';
  }

  onToggle(id: number): void {
    this.todoService.toggleTodo(id);
    const todo = this.todoService.todos().find((t) => t.id === id);
    if (todo) {
      this.notif.show(
        todo.completed ? `«${todo.title}» выполнена` : `«${todo.title}» возвращена в работу`,
        todo.completed ? 'success' : 'info'
      );
    }
  }

  onRemove(id: number): void {
    const todo = this.todoService.todos().find((t) => t.id === id);
    this.todoService.removeTodo(id);
    if (todo) {
      this.notif.show(`«${todo.title}» удалена`, 'warning');
    }
  }

  openEditModal(todo: Todo): void {
    this.editingTodo = todo;
    this.modalTitle = todo.title;
    this.modalFolderId = todo.folderId;
    this.modalOpen = true;
  }

  closeModal(): void {
    this.modalOpen = false;
    this.editingTodo = null;
  }

  onSaveEdit(data: { title: string; folderId: number }): void {
    if (!this.editingTodo) return;

    const oldFolder = this.todoService.folders().find((f) => f.id === this.editingTodo!.folderId);
    const newFolder = this.todoService.folders().find((f) => f.id === data.folderId);

    this.todoService.editTodo(this.editingTodo.id, data.title);

    if (data.folderId !== this.editingTodo.folderId) {
      this.todoService.moveTodo(this.editingTodo.id, data.folderId);
      this.notif.show(
        `«${data.title}» перемещена в «${newFolder?.name ?? 'Без папки'}»`,
        'info'
      );
    } else {
      this.notif.show(`«${data.title}» обновлена`, 'success');
    }
  }
}
