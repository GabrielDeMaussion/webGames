import { Component, OnInit } from '@angular/core';
import { CookiesService } from '../../services/cookies.service';
import { StorageService } from '../../services/storage.service';
import { Preferences } from '../../interfaces/models';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-config-menu',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './config-menu.component.html',
  styleUrl: './config-menu.component.css'
})
export class ConfigMenuComponent implements OnInit{
  username: string = 'Invitado';
  cardBacks: string[] = [
    "Cats.png",
    "Flowers.png",
    "Japan.png",
    "Panter.png",
    "Waves.png"
  ]
  preferences: Preferences = {
    username: this.username,
    darkMode: false,
    cardBack: 'Waves.png',
    volume: 0.5
  }

  constructor(
    private readonly cookiesService: CookiesService,
    private readonly userService: UserService,
    private readonly storageService: StorageService
  ) { }
  
  
  ngOnInit(): void {
    this.username = this.userService.getUsername();
    this.preferences = this.storageService.getPreferences(this.username) as Preferences;
  }
  
  changeCardBack() {
    this.storageService.setPreferences(this.preferences);
    console.log("Cambiando carta trasera a", this.preferences.cardBack);
  }
  
  saveConfig(user: string){
    let preferences: Preferences = {
      username: user,
      darkMode: false,
      cardBack: 'Waves.png',
      volume: 0.5
    }
    this.storageService.setPreferences(preferences);
  }
  
  showConfig(){
    console.log(this.storageService.getPreferences());
  }
}
