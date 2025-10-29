import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  heroUrl =
    'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2400&auto=format&fit=crop&crop=entropy';

  newsItems = [
    { title: 'Trail Tips for Winter Running' },
    { title: 'Gear Roundup: Minimalist vs Cushion' },
    { title: '5 Quick Workouts You Can Do Anywhere' },
  ];

  email = 'coreysmaller@gmail.com';
  currentYear = new Date().getFullYear();

  subscribe(event: Event) {
    event.preventDefault();
    if (this.email) {
      alert(`Subscribed with: ${this.email}`);
      this.email = '';
    }
  }
}
