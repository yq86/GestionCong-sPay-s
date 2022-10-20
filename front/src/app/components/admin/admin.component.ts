import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'
import { AddEditUserComponent } from '../add-edit-user/add-edit-user.component';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {


  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  users: Array<User> = [];
  token!: string | null;

  displayedColumns: string[] = ['userName', 'firstName', 'lastName', 'email', 'role', 'firstWorkingDay', 'edit'];
  dataSource!: MatTableDataSource<User>;


  constructor(
    private userService: UserService,
    private modalService: NgbModal,
    private dialogService: MatDialog,
  ) { }

  ngOnInit(): void {
    this.users = [];
    this.token = localStorage.getItem("accessToken");

    this.userService.getAllUsers(this.token).subscribe((res) => {
      if (res) {
        res.forEach((user: any) => {
          if (user.role == 1) {
            user.role = "admin";
          } else if (user.role == 2) {
            user.role = "manager";
          } else if (user.role == 3) {
            user.role = "salarie";
          }
        });
        this.users = res;
        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.paginator = this.paginator;
      }

    })
  }

  deleteUser(id: number) {
    Swal.fire({
      title: 'Do you want to delete the user?',
      showCancelButton: true,
      confirmButtonText: 'Save',
      icon: 'warning',

    } as any).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.value) {
        this.userService.deleteUser(id, this.token, ).subscribe((res) => {

        });
        const u = this.users.findIndex(el => el.id = id);

        this.users.splice(u, 1);
        this.dataSource = new MatTableDataSource(this.users);

        Swal.fire('Saved!', '', 'success')

      } else if (result.dismiss) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  };

/*
  modifyuser(id: number, statusId: number) {
    Swal.fire({
      title: 'Do you want to modify the user?',
      text:"specify the reason if you want to refuse this user",
      input: 'text',
      showCancelButton: true,
      confirmButtonText: 'Save',
      type: 'warning',
    } as any).then((result) => {
*/
      /* Read more about isConfirmed, isDenied below */
 /*     if (result.dismiss) {
        Swal.fire('Changes are not saved', '', 'info')
      } else {
        console.log(result)
        let body: any = {};
        body.id = id;
        body.StatusId = statusId;
        body.description = result.value;

        const de = this.users.find(el => el.id = id);
        if (de && statusId==2) {
          de.status = "validée";
          de.description = result.value;
          this.userService.updateuser(this.token, body);
          Swal.fire('Saved!', '', 'success')
        } else if (de && statusId == 3) {
          de.status = "refusée";
          de.description = result.value;
          if (result.value == "") {
            Swal.fire({
              title: 'Error! Please specify the reason of refuse!',
              type: 'error'
            } as any)
          } else {
            this.userService.updateuser(this.token, body);
          Swal.fire('Saved!', '', 'success')
          }
        }
        this.dataSource = new MatTableDataSource(this.users);
      }
    })
  }*/

  addUser() {
    const modalRef = this.dialogService.open(AddEditUserComponent, {
      width: '800px',
      height: '500px',
      data: {userName: '', firstName: "", lastName: "", password: "", firstWorkingDay: "",role:"", email: ""}
    });
    modalRef.afterClosed().subscribe(result => {
      if (result) {

        this.userService.addUser(this.token, result).subscribe((res) => {
        });
      }
      this.users.push(result)

    })
  }

  modifyUser(id: number) {
    const user = this.users.find(u => u.id == id);
    const modalRef = this.dialogService.open(AddEditUserComponent, {
      width: '800px',
      height: '500px',
      data: user
    });
    modalRef.afterClosed().subscribe(result => {
      if (result) {

        this.userService.modifyUser(this.token, result).subscribe((res) => {
        });
      }
      this.users.push(result)

    })
  }
}

