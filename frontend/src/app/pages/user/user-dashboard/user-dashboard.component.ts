import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CondidatService } from 'src/app/services/condidat.service';
import { LoginService } from 'src/app/services/login.service';
import { ResultService } from 'src/app/services/result.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  user =
  {
    id:'',
    username: '',
  email: '',
  password: '',
  fName: '',
  lname: '',
  phone: '',
  profile: '',
  adress: '',
  gender: '',
  age: '',
  diplome: '',
  coverLetter: '',
  yearsOfExperience: '',
  aboutMe: '',
  linkedInLink: '',
  githubLink: ''};
  condidat :any = null;
  isProfileValid: boolean = true;
  constructor(public login:LoginService , private condidatService : CondidatService, private _result: ResultService,){}
  ngOnInit(): void {
   this.user= this.login.getUser();
   this.condidatService.getCondidatByUsername(this.user.username).subscribe((data: any) => {
    this.condidat = data;
    console.log(this.condidat)
  });
  this.validateUser();
  }


  validateUser(): void {
    this.condidat= this.login.getUser();
    console.log(this.user)
    this._result.getResultByUserId(this.condidat.id).subscribe((result: any) => {
      console.log(result[result.length - 1].marksScored)
      console.log(result.length)
      if (result[result.length - 1].marksScored == null || result[result.length - 1].marksScored < 50){
        this.isProfileValid = true;
      } else {
        this.isProfileValid = false;
      }
    });

  }
}
