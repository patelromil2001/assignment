import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-api-data',
  templateUrl: './api-data.html',
  styleUrls: ['./api-data.css']
})
export class ApiDataComponent implements OnInit {
  albums: any[] = [];
  loading = true;
  error: string | null = null;

  constructor(private api: ApiService) {}

  ngOnInit() {
    const token = this.getAccessTokenFromUrl() || localStorage.getItem('spotify_token');

    if (!token) {
      // No token → redirect to Spotify login
      window.location.href = this.api.getAuthUrl();
      return;
    }

    // Save token for later use
    localStorage.setItem('spotify_token', token);

    this.api.getNewReleases(token).subscribe({
      next: (data) => {
        this.albums =
          data?.albums?.items?.map((album: any) => ({
            ...album,
            artistNames: album.artists.map((a: any) => a.name).join(', ')
          })) || [];
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load albums';
        this.loading = false;
      }
    });
  }

  private getAccessTokenFromUrl(): string | null {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    return params.get('access_token');
  }
}
