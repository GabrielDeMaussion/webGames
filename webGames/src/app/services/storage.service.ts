import { Injectable } from '@angular/core';
import { Preferences } from '../interfaces/models';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  defaultPreferences: Preferences = {
    username: 'invitado',
    darkMode: true,
    cardBack: 'Waves.png',
    volume: 0.5
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
  
  clearAll(){
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
    if (username) {
      let preferences = this.getItem('preferences') as Preferences[] || [];
      let index = preferences.findIndex(pref => pref.username === username);

      if (index !== -1) {
        preferences.splice(index, 1);
        this.setItem('preferences', preferences);
      }
    }
    else{
      this.setItem('preferences', []);
    }
  }


}
