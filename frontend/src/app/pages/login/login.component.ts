import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginData = {
    username: '',
    password: '',
  };
  showPassword : boolean = false ;

  constructor(
    private snack: MatSnackBar,
    private login: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  formSubmit() {
    console.log("login form submitted");
    if (
      this.loginData.username.trim() == '' ||
      this.loginData.username.trim() == null
    ) {
      this.snack.open('Please enter a valid user name', '', {
        duration: 3000,
      });
      return;
    }

    if (
      this.loginData.password.trim() == null ||
      this.loginData.password.trim() == ''
    ) {
      this.snack.open('Please enter a valid  password', '', {
        duration: 3000,
      });
      return;
    }

    // request to server to genrate token
    this.login.generateToken(this.loginData).subscribe(
      (data: any) => {
        console.log('succes');
        console.log(data);
        //login
        this.login.loginUser(data.token);
        this.login.getCurrentUser().subscribe((user: any) => {
          this.login.setUser(user);
          console.log(user);

          if (this.login.getUserRole() == 'ADMIN') {
            //admin dhashboard
           // window.location.href = '/admin';
            this.router.navigate(['admin']);
            this.login.loginStatusSubject.next(true)

          } else if (this.login.getUserRole() == 'CONDIDAT' ){
            //normal user dashboard
          //  window.location.href = '/user-dashboard';
          this.router.navigate(['user-dashboard']);
          this.login.loginStatusSubject.next(true)
          }

          else if (this.login.getUserRole() == 'RECRUTER'){
            //normal user dashboard
          //  window.location.href = '/user-dashboard';
          this.router.navigate(['recruter-dashboard']);
          this.login.loginStatusSubject.next(true)
          }

          else {
            this.login.logout();
          }
        });
      },
      (error) => {
        console.log('error');
        console.log(error);
        this.snack.open("Invalid Details !! try again",'',{
          duration:3000
        })
      }
    );
  }
}
