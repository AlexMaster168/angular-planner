import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  email = '';
  password = '';
  error = '';
  loading = false;

  login(): void {
    this.error = '';
    this.loading = true;

    setTimeout(() => {
      const result = this.authService.login(this.email, this.password);
      this.loading = false;

      if (result.success) {
        this.router.navigate(['/']);
      } else {
        this.error = result.error ?? 'Ошибка авторизации';
      }
    }, 800);
  }
}
