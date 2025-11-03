import { Component } from '@angular/core';
import { getSafeHtml } from '@/app/utils/html.utils';
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
})
export class BlogComponent {
  getSafeHTML = getSafeHtml;
}
