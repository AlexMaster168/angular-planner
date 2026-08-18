import { Component, inject } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { AddTodoComponent } from '../../components/add-todo/add-todo.component';
import { TodoListComponent } from '../../components/todo-list/todo-list.component';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SidebarComponent, SearchBarComponent, AddTodoComponent, TodoListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  authService = inject(AuthService);
  todoService = inject(TodoService);
}
