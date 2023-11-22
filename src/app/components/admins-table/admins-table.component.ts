import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'admins-table',
  templateUrl: './admins-table.component.html',
  styleUrls: ['./admins-table.component.scss'],
})
export class AdminsTableComponent implements OnInit {
  admins: User[] = [];
  displayedColumns: string[] = ['name', 'email', 'role', 'actions'];

  constructor(
    private usersService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // Fetch the list of admins from your service when the component is initialized
    this.loadAdmins();
  }

  loadAdmins() {
    // Fetch all users
    this.usersService
      .authenticatedRequest('GET', '/user/all', {})
      .then((res) => {
        // console.log(res);
        const { data } = res;
        this.admins = data.filter((user) => user.role !== 'MANAGER');
      })
      .catch((e) => {
        console.log(e);
        this.snackBar.open('Error loading admins', 'Close', {
          duration: 3000,
        });
      });
  }
  demoteAdmin(email: string) {
    this.usersService
      .authenticatedRequest('PUT', `/user/demote?email=${email}`, {})
      .then((_) => {
        this.snackBar.open('User demoted successfully', 'Close', {
          duration: 3000,
        });
        this.loadAdmins();
      })
      .catch((_) => {
        this.snackBar.open('Error demoting user', 'Close', {
          duration: 3000,
        });
      });
  }
  promoteUser(email: string) {
    this.usersService
      .authenticatedRequest('PUT', `/user/promote?email=${email}`, {})
      .then((_) => {
        this.snackBar.open('User promoted successfully', 'Close', {
          duration: 3000,
        });
        this.loadAdmins();
      })
      .catch((_) => {
        this.snackBar.open('Error promoting user', 'Close', {
          duration: 3000,
        });
      });
  }
  //TODO: Implement deleteAdmin
  deleteAdmin(email: string) {
    this.usersService
      .authenticatedRequest('DELETE', `/user/delete-admin?email=${email}`, {})
      .then((_) => {
        this.snackBar.open('User deleted successfully', 'Close', {
          duration: 3000,
        });
        this.loadAdmins();
      })
      .catch((_) => {
        this.snackBar.open('Error deleting user', 'Close', {
          duration: 3000,
        });
      });
  }
}
