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
  preferencesList: Preferences[] = [];
  cardBacks: string[] = [
    "Cats.png",
    "Flowers.png",
    "Japan.png",
    "Panter.png",
    "Waves.png"
  ]
  preferences: Preferences | null = null;

  constructor(
    private readonly cookiesService: CookiesService,
    private readonly userService: UserService,
    private readonly storageService: StorageService
  ) { }
  
  
  ngOnInit(): void {
    let loggedUser = this.userService.getUsername();
    this.preferencesList = this.storageService.getPreferences() as Preferences[];
    console.log('Configuraciones cargadas:', this.preferencesList);
    this.preferences = this.preferencesList.find(preference => preference.username === loggedUser) || this.storageService.defaultPreferences;
    console.log("Configuración de", loggedUser, "cargada:", this.preferences);
    
  }
  
  changeCardBack() {
    this.saveConfig();
    console.log("Cambiando carta trasera a", this.preferences!.cardBack);
  }
  
  changeVolume() {
    this.saveConfig();
    console.log("Cambiando volumen a", this.preferences!.volume);
  }
  
  changeTheme() {
    this.saveConfig();
    console.log("Cambiando modo oscuro a", this.preferences!.darkMode);
  }
  
  saveConfig() {
    let loggedUser = this.userService.getUsername();
    this.preferences!.username = loggedUser;
    this.storageService.setPreferences(this.preferences!);
    console.log("Configuración de", loggedUser, "guardada:", this.preferences);
    
  }
  
  resetConfig() {
    this.storageService.removePreferences(this.userService.getUsername());
  }
}
