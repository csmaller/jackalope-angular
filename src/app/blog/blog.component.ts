import { Component } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
})
export class BlogComponent {
  posts = [
    {
      title: 'How to Train for Altitude Races',
      author: 'Core Shot',
      date: 'Oct 10, 2025',
      excerpt: 'Preparing for thin air? Here’s how to acclimate effectively...',
    },
    {
      title: 'Running Hydration Myths',
      author: 'Guest Contributor',
      date: 'Sep 2, 2025',
      excerpt:
        'We separate fact from fiction about electrolytes and water intake.',
    },
  ];
}
