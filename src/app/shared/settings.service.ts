import { Injectable } from '@angular/core';
import {Settings} from '../models/Settings';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  settings: Settings = {
    allowRegistration: true,
    allowAdministration: true,
    orderRegister: false,
    orderLogin: false,
  }
  constructor() {
    if (localStorage.getItem('settings') != null) {
      this.settings = JSON.parse(localStorage.getItem('settings'));  // string nach object umwandeln JSON.parse!
    }
  }

  getSettings(): Settings {
    return this.settings;
  }

  changeSettings(settings: Settings) {
    localStorage.setItem('settings', JSON.stringify(settings));  // object nach String umwandeln JSON.stringify!
  }
}
