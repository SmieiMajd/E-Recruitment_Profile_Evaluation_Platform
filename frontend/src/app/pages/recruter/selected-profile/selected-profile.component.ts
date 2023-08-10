import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CondidatService } from 'src/app/services/condidat.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-selected-profile',
  templateUrl: './selected-profile.component.html',
  styleUrls: ['./selected-profile.component.css'],
})
export class SelectedProfileComponent implements OnInit {
  selectedCandidate = {
    userName: '',
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
    githubLink: '',
    sentiment: '',
  };
  cvSafeUrl: SafeResourceUrl | undefined;

  constructor(
    private route: ActivatedRoute,
    private condidatService: CondidatService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const username = this.route.snapshot.paramMap.get('username');
    console.log('Username:', username);

    if (username !== null) {
      this.condidatService
        .getCondidatByUsername(username)
        .subscribe((data: any) => {
          this.selectedCandidate = data;
          console.log('Condidat', this.selectedCandidate);
        });
    } else {
      console.log('Username is null');
      // Handle the case when username is null
    }
  }

  displayCV(): void {
    const username = this.selectedCandidate.userName;

    if (username !== null) {
      this.condidatService.getCondidatByCv(username).subscribe((data: any) => {
        const file = new Blob([data], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      });
    } else {
      console.log('Username is null');
      // Handle the case when username is null
    }
  }
}
