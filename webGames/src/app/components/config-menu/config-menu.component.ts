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
  cardBacks: string[] = [
    "Cats.png",
    "Flowers.png",
    "Japan.png",
    "Panter.png",
    "Waves.png"
  ]
  preferences: Preferences = {
    username: 'Invitado',
    darkMode: true,
    cardBack: 'Waves.png',
    volume: 0.5
  }

  constructor(
    private readonly cookiesService: CookiesService,
    private readonly userService: UserService,
    private readonly storageService: StorageService
  ) { }
  
  
  ngOnInit(): void {
    let loggedUser = this.userService.getUsername();
    this.preferences = this.storageService.getPreferences(loggedUser) as Preferences;
    console.log("Configuración de", loggedUser, "cargada:", this.preferences);
    
  }
  
  changeCardBack() {
    this.saveConfig();
    console.log("Cambiando carta trasera a", this.preferences.cardBack);
  }
  
  changeVolume() {
    this.saveConfig();
    console.log("Cambiando volumen a", this.preferences.volume);
  }
  
  changeTheme() {
    this.saveConfig();
    console.log("Cambiando modo oscuro a", this.preferences.darkMode);
  }
  
  saveConfig() {
    let loggedUser = this.userService.getUsername();
    this.preferences.username = loggedUser;
    this.storageService.setPreferences(this.preferences);
    console.log("Configuración de", loggedUser, "guardada:", this.preferences);
    
  }
}
