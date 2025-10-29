import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: 'header.component.html',
})
export class HeaderComponent implements OnInit {
  constructor() {}
  logo = 'assets/images/logos/logo_no_bg.png';
  ngOnInit() {}
}
