import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { RecruterService } from 'src/app/services/recruter.service';
import { CondidatService } from '../../../services/condidat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recruter-dashboard',
  templateUrl: './recruter-dashboard.component.html',
  styleUrls: ['./recruter-dashboard.component.css'],
})
export class RecruterDashboardComponent implements OnInit {
  user: any = null;
  searchText : any = null;
  candidates: any = null;
  originalCandidates: any = null; // Store the original candidates array

  public recruter = {
    userName: '',
    email: '',
    password: '',
    fName: '',
    lname: '',
    companyName:'' ,
    sentiment:'',
    githubRepos:'',
  };

  constructor(
    public login: LoginService,
    private recruterService: RecruterService,
    private condidatService : CondidatService ,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('Initializing RecruterDashboardComponent...');
    this.user = this.login.getUser();
    this.recruterService
      .getRecruterByUsername(this.user.username)
      .subscribe((data: any) => {
        this.recruter = data;
        console.log(this.recruter);
      });

    this.condidatService .getAllCandidates().subscribe((data: any) => {
      console.log("candidates data:", data);

      this.candidates = data;
      console.log(this.candidates);
    });
  }
  viewProfile(username: string) {
    this.router.navigate(['/selected-profile', username]);
  }
  applyFilter() {
    const filteredCandidates = this.candidates.filter((candidate: any) => {
      // Apply your filtering condition here
      return (

        (candidate.yearsOfExperience >= this.searchText // Filter by years of experience

      ))
    });

    // Update the 'candidates' array with the filtered results
    this.candidates = filteredCandidates;
  }
  clearFilter() {
    this.candidates = this.originalCandidates; // Reset the 'candidates' array to the original state
    this.searchText = null; // Reset the search text
    location.reload(); // Refresh the page
  }
}
