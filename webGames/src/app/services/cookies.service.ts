import { Injectable } from '@angular/core';
import { Preferences } from '../interfaces/models';

@Injectable({
  providedIn: 'root'
})
export class CookiesService {

  constructor() { }
  
  getCookie(name: string) {
    const cookieName = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(cookieName) == 0) {
        return c.substring(cookieName.length, c.length);
      }
    }
    return "";
  }

  // Set the cookie with the user preferences and an expiration date into the list
  setPreferences(userPreferences: Preferences, expireDays: number = 7) {
    // Set the expiration date
    const date = new Date();
    date.setTime(date.getTime() + (expireDays * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    
    // Get the current preferences list
    let preferences : Preferences[] = this.getPreferences() as Preferences[];
    
    // Update the preferences list with the user preferences
    if(preferences.length){
      const index = preferences.findIndex((preference : any) => preference.username === userPreferences.username);
      if(index !== -1){
        preferences[index] = userPreferences;
      }else{
        preferences.push(userPreferences);
      }
    }else{
      preferences.push(userPreferences);
    }
    
    // Set the updated preferences list into the cookie
    document.cookie = `preferences=${JSON.stringify(preferences)};${expires};path=/`;
  }
  
  
  // Get the user preferences from the cookie list
  getPreferences(username: string = '') : Preferences | Preferences[] {
    const name = `preferences=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    console.log('decoded: ', decodedCookie);
    
    const ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        let preferences = JSON.parse(c.substring(name.length, c.length));
        if(username){
          return preferences.find((preference : any) => preference.username === username);
        }
        return preferences;
      }
    }
    
    return [];
  }
  
  // Get the user preferences from the cookie list
  getPreferences2(username: string = '') : Preferences | Preferences[] {
    const name = `preferences=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    console.log('decoded: ', decodedCookie);
    
    const ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        let preferences = JSON.parse(c.substring(name.length, c.length));
        if(username){
          return preferences.find((preference : any) => preference.username === username);
        }
        return preferences;
      }
    }
    
    return [];
  }
}
