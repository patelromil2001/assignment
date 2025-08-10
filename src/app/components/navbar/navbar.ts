import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule], // ✅ so routerLink directives work
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar {}
