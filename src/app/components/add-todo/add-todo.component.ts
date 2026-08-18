import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.scss',
})
export class AddTodoComponent {
  todoService = inject(TodoService);
  newTitle = '';

  add(): void {
    if (this.newTitle.trim()) {
      const folderId = this.todoService.selectedFolderId() ?? this.todoService.folders()[0]?.id ?? 1;
      this.todoService.addTodo(this.newTitle, folderId);
      this.newTitle = '';
    }
  }
}
