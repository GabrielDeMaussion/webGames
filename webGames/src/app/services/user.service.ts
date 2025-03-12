import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

constructor(private readonly storageService: StorageService) { }

  getUsername(){
    return this.storageService.getItem('username');
  }
  
  setUsername(username: string){
    this.storageService.setItem('username', username);
  }

}
