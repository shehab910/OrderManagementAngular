import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // Fetch the list of admins from your service when the component is initialized
    this.loadAdmins();
  }

  loadAdmins() {
    this.usersService
      .authenticatedRequest('GET', '/user/admins', {})
      .then((res) => {
        const { data } = res;
        this.admins = data;
      })
      .catch((e) => {
        console.log(e);
        this.snackBar.open('Error loading admins', 'Close', {
          duration: 3000,
        });
      });
  }

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
