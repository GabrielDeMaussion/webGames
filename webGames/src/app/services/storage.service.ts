import { Injectable } from '@angular/core';
import { Preferences } from '../interfaces/models';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setItem(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string) {
    let item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

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


  getPreferences(username: string = ''): Preferences | Preferences[] | null {
    let preferences = this.getItem('preferences') as Preferences[] || [];

    return username ? preferences.find(pref => pref.username === username) || null : preferences;
  }



}
