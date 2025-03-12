import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UsernameButtonComponent } from "../assets/username-button/username-button.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, UsernameButtonComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

}
