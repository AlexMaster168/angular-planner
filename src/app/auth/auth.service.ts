import { Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';

export interface User {
  id: number;
  email: string;
  name: string;
  avatar: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'auth_user';

  readonly currentUser = signal<User | null>(this.loadUser());
  readonly isAuthenticated = computed(() => !!this.currentUser());

  private fakeUsers = [
    { id: 1, email: 'admin@test.com', password: '123456', name: 'Администратор', avatar: '👨‍💻' },
    { id: 2, email: 'user@test.com', password: 'qwerty', name: 'Пользователь', avatar: '👤' },
  ];

  constructor(private router: Router) {}

  private loadUser(): User | null {
    try {
      const data = localStorage.getItem(this.USER_KEY);
      const token = localStorage.getItem(this.TOKEN_KEY);
      if (data && token) return JSON.parse(data);
    } catch {}
    return null;
  }

  login(email: string, password: string): { success: boolean; error?: string } {
    const user = this.fakeUsers.find((u) => u.email === email && u.password === password);
    if (!user) {
      return { success: false, error: 'Неверный email или пароль' };
    }

    const token = btoa(`${user.id}:${user.email}:${Date.now()}`);
    const userData: User = { id: user.id, email: user.email, name: user.name, avatar: user.avatar };

    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(userData));
    this.currentUser.set(userData);

    return { success: true };
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
}
