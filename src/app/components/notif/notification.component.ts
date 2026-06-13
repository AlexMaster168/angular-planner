import { Component, inject, signal } from '@angular/core';

export interface Notification {
  id: number;
  message: string;
  type: 'success' | 'info' | 'warning';
}

@Component({
  selector: 'app-notif',
  standalone: true,
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
})
export class NotificationComponent {
  notifications = signal<Notification[]>([]);

  show(message: string, type: Notification['type'] = 'info'): void {
    const id = Date.now();
    this.notifications.update((list) => [...list, { id, message, type }]);
    setTimeout(() => this.dismiss(id), 3000);
  }

  dismiss(id: number): void {
    this.notifications.update((list) => list.filter((n) => n.id !== id));
  }
}
