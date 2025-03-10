import { Component } from '@angular/core';
import { CookiesService } from '../../services/cookies.service';

@Component({
  selector: 'app-config-menu',
  standalone: true,
  imports: [],
  templateUrl: './config-menu.component.html',
  styleUrl: './config-menu.component.css'
})
export class ConfigMenuComponent {

  constructor(
    private readonly cookiesService: CookiesService
  ) { }
  
  saveConfig(user: string){
    const username = user;
    const darkMode = true;
    const cardBack = 'red';
    this.cookiesService.setPreferences({username, darkMode, cardBack});
  }
  
  showConfig(){
    console.log(this.cookiesService.getPreferences());
  }
}
