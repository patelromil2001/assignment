import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private clientId = environment.spotifyClientId;
  private redirectUri = environment.spotifyRedirectUri;
  private apiBase = environment.spotifyApiBase;

  constructor(private http: HttpClient) {}

  // --- Form Logic (JSONPlaceholder) ---
  private baseUrl = 'https://jsonplaceholder.typicode.com';
  submitFeedback(payload: any) {
    return this.http.post(`${this.baseUrl}/posts`, payload);
  }

  /**
   * Builds the Spotify auth URL for Implicit Grant Flow.
   */
  getAuthUrl(): string {
    const scopes = encodeURIComponent('user-read-private user-read-email');
    return `https://accounts.spotify.com/authorize?response_type=token&client_id=${this.clientId}&scope=${scopes}&redirect_uri=${encodeURIComponent(this.redirectUri)}`;
  }

  /**
   * Gets new album releases from Spotify.
   * @param token Spotify access token
   */
  getNewReleases(token: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get(`${this.apiBase}/browse/new-releases`, { headers }).pipe(
      catchError(err => {
        console.error('Spotify API error', err);
        // Return an empty albums structure to avoid breaking the UI
        return of({ albums: { items: [] } });
      })
    );
  }
}
