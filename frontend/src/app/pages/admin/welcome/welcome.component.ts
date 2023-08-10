import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  users: any[] = []; // Initialize the 'users' property with an empty array

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getAllUsers().subscribe(
      (data: any) => {
        console.log(data);
        this.users = data; // Assign the retrieved user data to the 'users' property
      },
      (error) => {
        console.error('Failed to retrieve users:', error);
      }
    );
  }

  deleteUser(userId: number) {
    this.userService.deleteUser(userId).subscribe(
      () => {
        console.log('User deleted successfully');
        // Optionally, you can remove the deleted user from the 'users' array
        this.users = this.users.filter((user) => user.id !== userId);
      },
      (error) => {
        console.error('Failed to delete user:', error);
      }
    );
  }
}
