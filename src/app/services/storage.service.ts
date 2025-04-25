import { Injectable } from '@angular/core';
import { Preferences } from '../interfaces/models';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  defaultPreferences: Preferences = {
    username: 'Invitado',
    darkMode: true,
    cardBack: 'Waves.png',
    backgroundMusic: 'backgroundMusic1.mp3',
    effectsVolume: 0.5,
    musicVolume: 0.5
  }

  constructor() { }

  // Generic methods
  setItem(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string) {
    let item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  clearAll() {
    localStorage.clear();
  }


  // Preferences managment methods
  setPreferences(userPreferences: Preferences) {
    let preferences = this.getItem('preferences') as Preferences[] || [];

    let index = preferences.findIndex((preference: any) => preference.username === userPreferences.username);

    if (index !== -1) {
      preferences[index] = userPreferences;
    }
    else {
      preferences.push(userPreferences);
    }

    this.setItem('preferences', preferences);
  }

  getPreferences(username: string = ''): Preferences | Preferences[] {
    const preferencesList = (this.getItem('preferences') as Preferences[]) || [];

    if (!username) {
      return preferencesList.length ? preferencesList : [this.defaultPreferences];
    }

    return preferencesList.find(pref => pref.username === username) ?? this.defaultPreferences;
  }

  removePreferences(username: string = '') {

    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar!'
    }).then((result) => {
      if (result.isConfirmed) {
        if (username) {
          let preferences = this.getItem('preferences') as Preferences[] || [];
          let index = preferences.findIndex(pref => pref.username === username);

          if (index !== -1) {
            preferences.splice(index, 1);
            this.setItem('preferences', preferences);
          }
        }
        else {
          this.setItem('preferences', []);
        }
      }
    });
  }


}
