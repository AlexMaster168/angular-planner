import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss',
})
export class TodoItemComponent {
  @Input({ required: true }) todo!: Todo;
  @Input() folderColor = '#89b4fa';
  @Output() toggle = new EventEmitter<number>();
  @Output() remove = new EventEmitter<number>();
  @Output() openEdit = new EventEmitter<Todo>();
}
