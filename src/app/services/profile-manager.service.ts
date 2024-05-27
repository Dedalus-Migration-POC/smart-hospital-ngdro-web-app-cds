import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserProfile } from '../../types/user-profile';

@Injectable({
  providedIn: 'root',
})
export class ProfileManagerService {
  constructor(private httpClient: HttpClient) {}

  getProfile() {
    return this.httpClient.get<UserProfile>('/profile-manager/api/profile');
  }

  updateProfile(data: UserProfile) {
    return this.httpClient.post<UserProfile>(
      '/profile-manager/api/update',
      data
    );
  }

  signUp(data: Partial<UserProfile>) {
    return this.httpClient.post('/profile-manager/api/sign-up', data);
  }

  logFirstAccess(code: string) {
    return this.httpClient.post('/profile-manager/api/log-first-access', {
      mpiId: code,
    });
  }
}
