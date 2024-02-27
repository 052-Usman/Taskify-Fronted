import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { GoogleAuth, User } from '@codetrix-studio/capacitor-google-auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Taskify-Fronted';
  login: boolean = false;
  signup: boolean = false;

  constructor(private http: HttpClient) {
    GoogleAuth.initialize();
  }

  googleAuthPresed(str: string) {
    const logIn = async () => {
      const response = await GoogleAuth.signIn();
      console.log(response);
      if (str === 'SignedUp') {
        this.userSignUpWithAuth(response);
      } else if (str === 'SignedIn') {
        this.userLoginWithAuth(response);
      }
    };
    logIn();
  }

  userSignUpWithAuth(response: User) {
    // Make API request to store info at the Node backend
    const apiEndpoint = 'http://localhost:3000/api/user/signup-google';
    const userInfo = {
      name: response.name,
      email: response.email,
      google_id: response.id,
    };

    this.http.post(apiEndpoint, userInfo).subscribe(
      (response: any) => {
        console.log(response);
        // Handle success, if needed
        if (response.responseCode === 201) {
          this.signup = true;
        }
      },
      (error) => {
        console.error(error);
        // Handle error, if needed
      }
    );
  }

  userLoginWithAuth(response: User) {
    // Make API request to login
    const apiEndpoint = 'http://localhost:3000/api/user/login-google';
    const userInfo = {
      email: response.email,
      google_id: response.id,
    };

    this.http.post(apiEndpoint, userInfo).subscribe(
      (response: any) => {
        console.log(response);
        // Handle success, if needed
        if (response.responseCode === 200) {
          this.login = true;
        }
      },
      (error) => {
        console.error(error);
        // Handle error, if needed
      }
    );
  }
}
