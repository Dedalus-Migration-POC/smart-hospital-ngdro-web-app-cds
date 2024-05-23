import { Injectable } from '@angular/core';

import { ReportDocument } from '../models/report';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  saveData<T>(key: string, value: T): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  getData<T>(key: string): T | null {
    const data = sessionStorage.getItem(key);
    return data ? JSON.parse(data) as T : null;
  }

  removeData(key: string): void {
    sessionStorage.removeItem(key);
  }

  clearAll(): void {
    sessionStorage.clear();
  }
}
