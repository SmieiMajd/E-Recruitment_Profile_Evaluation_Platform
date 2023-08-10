import { RecruterService } from './../../services/recruter.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { CondidatService } from '../../services/condidat.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  selectedProfile?: string;

  constructor(
    private userService: UserService,
    private condidatService: CondidatService,
    private recruterService: RecruterService,
    private router: Router,
    private snack: MatSnackBar,
    private http: HttpClient
  ) {}

  showPassword: boolean = false;
  file!: File | undefined;

  public user = {
    userName: '',
    email: '',
    password: '',
    fName: '',
    lname: '',
    phone: '',
    profile: '',
    adress: '',
    gender: '',
    age: 0,
    diplome: '',
    coverLetter: '',
    yearsOfExperience: '',
    aboutMe: '',
    githubLink: '',
    linkedInLink: '',
    companyName: '',
    companyWebSite: '',
    sentiment: ' ',
    githubRepos: 0,
  };

  ngOnInit(): void {}

  upoladfile() {
    const fileInput: HTMLInputElement = event?.target as HTMLInputElement;
    const cv: File | undefined = fileInput?.files?.[0];
    console.log(cv);
    this.file = cv;
    console.log(this.file);
  }

  formSubmit(): void {
    console.log(this.user);
    console.log(this.file);
    if (!this.selectedProfile) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Select a profile!',
      });
      return;
    }

    if (this.user.userName === '' || this.user.password === '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'User name and password are required!',
      });
      return;
    }

    // appel de l API
    if (this.selectedProfile === 'NORMAL') {
      const apiUrl = 'http://localhost:5000/analyze-sentiment';
      const requestBody = {
        coverLetter: this.user.coverLetter,
        githubLink: this.user.githubLink,
      };

      this.http.post(apiUrl, requestBody).subscribe(
        (response: any) => {
          const sentiment = response.sentiment;
          const repositoryCount = response.repositoryCount;

          this.user.sentiment = sentiment;
          this.user.githubRepos = parseInt(repositoryCount); // Converttir la valeur du retour value en entier

          this.createCandidate();
        },
        (error) => {
          console.log(error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong with sentiment analysis!',
          });
        }
      );
    } else if (this.selectedProfile === 'RECRUTER') {
      this.createRecruiter();
    }
  }

  createCandidate(): void {
    if (this.file) {
      this.condidatService.createCondidat(this.user, this.file).subscribe(
        (data: any) => {
          console.log(data);
          Swal.fire('Success', '', 'success');
          this.router.navigate(['/login']);
        },
        (error) => {
          console.log(error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          });
        }
      );
    }
  }

  createRecruiter(): void {
    this.recruterService.createRecruter(this.user).subscribe(
      (data: any) => {
        console.log(data);
        Swal.fire('Success', '', 'success');
        this.router.navigate(['/login']);
      },
      (error: any) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      }
    );
  }
}
