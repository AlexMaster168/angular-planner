import { Injectable, signal, computed } from '@angular/core';
import { Todo, Folder } from '../models/todo.model';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private readonly TODOS_KEY = 'angular_todos';
  private readonly FOLDERS_KEY = 'angular_folders';

  readonly todos = signal<Todo[]>(this.loadTodos());
  readonly folders = signal<Folder[]>(this.loadFolders());
  readonly selectedFolderId = signal<number | null>(null);
  readonly searchQuery = signal<string>('');

  readonly filteredTodos = computed(() => {
    let result = this.todos();
    const folderId = this.selectedFolderId();
    const query = this.searchQuery().toLowerCase().trim();

    if (folderId !== null) {
      result = result.filter((t) => t.folderId === folderId);
    }

    if (query) {
      result = result.filter((t) => t.title.toLowerCase().includes(query));
    }

    return result.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  });

  readonly todoCountByFolder = computed(() => {
    const map = new Map<number, number>();
    for (const todo of this.todos()) {
      map.set(todo.folderId, (map.get(todo.folderId) || 0) + 1);
    }
    return map;
  });

  readonly selectedFolderName = computed(() => {
    const id = this.selectedFolderId();
    if (id === null) return 'Все задачи';
    return this.folders().find((f) => f.id === id)?.name ?? 'Все задачи';
  });

  private loadTodos(): Todo[] {
    try {
      const data = localStorage.getItem(this.TODOS_KEY);
      if (data) {
        return JSON.parse(data).map((t: any) => ({
          ...t,
          createdAt: new Date(t.createdAt),
        }));
      }
    } catch {}
    return this.getDefaultTodos();
  }

  private loadFolders(): Folder[] {
    try {
      const data = localStorage.getItem(this.FOLDERS_KEY);
      if (data) return JSON.parse(data);
    } catch {}
    return this.getDefaultFolders();
  }

  private saveTodos(): void {
    localStorage.setItem(this.TODOS_KEY, JSON.stringify(this.todos()));
  }

  private saveFolders(): void {
    localStorage.setItem(this.FOLDERS_KEY, JSON.stringify(this.folders()));
  }

  private getDefaultFolders(): Folder[] {
    return [
      { id: 1, name: 'Личное', color: '#4fc3f7' },
      { id: 2, name: 'Работа', color: '#81c784' },
      { id: 3, name: 'Покупки', color: '#ffb74d' },
    ];
  }

  private getDefaultTodos(): Todo[] {
    return [
      { id: 1, title: 'Изучить Angular 22', completed: false, folderId: 1, createdAt: new Date() },
      { id: 2, title: 'Сделать проект', completed: false, folderId: 2, createdAt: new Date() },
      { id: 3, title: 'Купить продукты', completed: true, folderId: 3, createdAt: new Date() },
    ];
  }

  addTodo(title: string, folderId: number): void {
    const todo: Todo = {
      id: Date.now(),
      title: title.trim(),
      completed: false,
      folderId,
      createdAt: new Date(),
    };
    this.todos.update((todos) => [...todos, todo]);
    this.saveTodos();
  }

  toggleTodo(id: number): void {
    this.todos.update((todos) =>
      todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
    this.saveTodos();
  }

  removeTodo(id: number): void {
    this.todos.update((todos) => todos.filter((t) => t.id !== id));
    this.saveTodos();
  }

  editTodo(id: number, title: string): void {
    this.todos.update((todos) =>
      todos.map((t) => (t.id === id ? { ...t, title: title.trim() } : t))
    );
    this.saveTodos();
  }

  moveTodo(id: number, folderId: number): void {
    this.todos.update((todos) =>
      todos.map((t) => (t.id === id ? { ...t, folderId } : t))
    );
    this.saveTodos();
  }

  addFolder(name: string, color: string): void {
    const folder: Folder = {
      id: Date.now(),
      name: name.trim(),
      color,
    };
    this.folders.update((folders) => [...folders, folder]);
    this.saveFolders();
  }

  removeFolder(id: number): void {
    this.folders.update((folders) => folders.filter((f) => f.id !== id));
    this.todos.update((todos) => todos.filter((t) => t.folderId !== id));
    if (this.selectedFolderId() === id) {
      this.selectedFolderId.set(null);
    }
    this.saveFolders();
    this.saveTodos();
  }

  editFolder(id: number, name: string, color: string): void {
    this.folders.update((folders) =>
      folders.map((f) => (f.id === id ? { ...f, name, color } : f))
    );
    this.saveFolders();
  }

  selectFolder(id: number | null): void {
    this.selectedFolderId.set(id);
  }

  setSearch(query: string): void {
    this.searchQuery.set(query);
  }
}
