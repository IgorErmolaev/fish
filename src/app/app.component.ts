import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(private http: HttpClient) {}
  title = 'fish';

  ngOnInit(): void {
    this.getUserIp();
  }

  getUserIp() {
    this.http.get<{ip: string}>('https://api.ipify.org?format=json').subscribe(data => {
      console.log('IP Address:', data.ip);
      const userAgent = navigator.userAgent;
    const platform = navigator.platform;
    const language = navigator.language;

    console.log('User Agent: ', userAgent);
    console.log('Platform: ', platform);
    console.log('Language: ', language);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        console.log('Latitude: ', position.coords.latitude);
        console.log('Longitude: ', position.coords.longitude);
      });
    } else {
      console.log('Geolocation is not supported by this browser.');
    }

    });
  }

  goToPromo() {
    window.location.href = '#promo';
  }

}
