import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { forkJoin } from 'rxjs';
import {ProgressSpinnerModule} from 'primeng/progressspinner';

@Component({
  selector: 'app-managment',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css'],
  providers: [MessageService]
})
export class ManagementComponent implements OnInit {

  users = [];
  pages = [];
  selectedUser: any;
  selectedPages: any = [];


  constructor(private userService: UserService,
              private messageService: MessageService) {

    forkJoin([
      this.userService.getUsers(),
      this.userService.getPages()
    ]).subscribe(data => {
      this.users = data[0];
      this.pages = data[1];
    });
  }

  showSuccess(msg): void {
    this.messageService.add({severity: 'success', summary: 'Success', detail: msg});
  }

  getPermissionOfSelectedUser(user): void {
    this.userService.getPermissionByUser(user.name).subscribe(res => {
      this.selectedPages = res[0].enablePages;
    });
  }

  ngOnInit(): void {
  }

  updatePermissionByUser(): void {
    this.userService.updateUserPermission({user: this.selectedUser.name, pages: this.selectedPages}).subscribe(res => {
      this.showSuccess('Permission updated!');
    });
  }
}
