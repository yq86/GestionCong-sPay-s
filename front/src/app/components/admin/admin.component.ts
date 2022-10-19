import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/models/user';
import { DemandeService } from 'src/app/services/demande.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'


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

  displayedColumns: string[] = ['firstName', 'lastName', 'startingDate', 'endingDate', 'description refuse', 'type', 'status', 'edit'];
  dataSource!: MatTableDataSource<User>;


  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.users = [];
    this.token = localStorage.getItem("accessToken");

    this.userService.getAllUsers(this.token).subscribe((res) => {
      if (res) {

        res.forEach((demande: any) => {
          let de: any = {};
          de.id = demande.id
          de.firstName = demande.User.firstName;
          de.lastName = demande.User.lastName;
          de.startingDate = demande.startingDate;
          de.endingDate = demande.endingDate;
          de.description = demande.description;
          de.status = demande.Status.name;
          de.type = demande.Type.name;
          this.users.push(de);

        });
        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.paginator = this.paginator;
      }

    })
  }
/*
  deleteDemande(id: number) {
    Swal.fire({
      title: 'Do you want to delete the demande?',
      showCancelButton: true,
      confirmButtonText: 'Save',
      icon: 'warning',

    } as any).then((result) => { */
      /* Read more about isConfirmed, isDenied below */
 /*     if (result.value) {
        this.userService.deleteDemande(this.token, id).subscribe((res) => {
          console.log(res)
        });
        const de = this.demandes.findIndex(el => el.id = id);

        this.demandes.splice(de, 1);
        this.dataSource = new MatTableDataSource(this.demandes);

        Swal.fire('Saved!', '', 'success')

      } else if (result.dismiss) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  };


  modifyDemande(id: number, statusId: number) {
    Swal.fire({
      title: 'Do you want to modify the demande?',
      text:"specify the reason if you want to refuse this demande",
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

        const de = this.demandes.find(el => el.id = id);
        if (de && statusId==2) {
          de.status = "validée";
          de.description = result.value;
          this.demandeService.updateDemande(this.token, body);
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
            this.demandeService.updateDemande(this.token, body);
          Swal.fire('Saved!', '', 'success')
          }
        }
        this.dataSource = new MatTableDataSource(this.demandes);
      }
    })
  }*/
}

