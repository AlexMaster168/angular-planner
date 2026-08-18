import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {
  todoService = inject(TodoService);

  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.todoService.setSearch(value);
  }

  clearSearch(): void {
    this.todoService.setSearch('');
  }
}
