import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'admins-table',
  templateUrl: './admins-table.component.html',
  styleUrls: ['./admins-table.component.scss']
})
export class AdminsTableComponent implements OnInit {
  admins: User[] = []; 
  displayedColumns: string[] = ['name', 'email', 'role', 'actions'];

  constructor(private usersService: AuthService, private router: Router) {}


  ngOnInit(): void {
    // Fetch the list of admins from your service when the component is initialized
    this.loadAdmins();
  }
  
  loadAdmins() {
    // Fetch all users
    this.usersService.getAllUsers().subscribe((data) => {
      // Filter users with 'admin' role
      this.admins = data.filter((user) => user.role === 'admin');
    });
  }
  addNewAdmin() {
    this.router.navigate(['/admins/add']);
  }
  
  editAdmin(id: string) {
    this.router.navigate(['/admins/edit', id]);
  }

  deleteAdmin(id: string) {
    this.usersService.deleteAdmin(id).subscribe(() => {
      // If the deletion is successful, remove the product from the local list.
      this.admins = this.admins.filter((admin) => admin.id !== id);
    }, (error) => {
      // Handle the error, e.g., display an error message.
      console.error('Error deleting product:', error);
    });
  }
}
