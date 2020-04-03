import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { UserService } from '../../../_services/user.service';
import { Observable, Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogComponent } from '../../_dialogs/delete-user-dialog/dialog.component';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})

export class AdminPanelComponent implements OnInit {

  //For datatables
  users:any; 
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  dtUsers :any;

  //For update/detele users view
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  //For check if user is admin
  // isLoggedIn: boolean; 
  // private roles: string[];

  constructor(private usersService: UserService,  private chRef : ChangeDetectorRef,private tokenStorageService: TokenStorageService, private router: Router,private matDialog: MatDialog) { }

  ngOnInit(): void {


    this.retrieveUsers();

    this.dtOptions = {
      language: {
        "decimal":        "",
        "emptyTable":     "La tabla está vacía",
        "info":           "Mostrando de _START_ a _END_ de _TOTAL_  registros",
        "infoEmpty":      "Mostrando 0 de 0 registros",
        "infoFiltered":   "(Registros totales  _MAX_ )",
        "infoPostFix":    "",
        "thousands":      ",",
        "lengthMenu":     "Registros por página _MENU_ ",
        "loadingRecords": "Cargando...",
        "processing":     "Procesando...",
        "search":         "Filtrar:",
        "zeroRecords":    "No se han encontrado registros",
        "paginate": {
            "first":      "Primero",
            "last":       "Último",
            "next":       "Sig",
            "previous":   "Ant"
        },
        "aria": {
            "sortAscending":  ": Ordenar ascendentemente",
            "sortDescending": ": Ordenar descendentemente"
        }
      },

    };

  }

  retrieveUsers() {
    this.usersService.getAllUsers()
      .subscribe(
        data => {
          this.users = data;
          this.chRef.detectChanges();
          this.dtTrigger.next();
        },
        error => {
          console.log(error);
          
    });
  }

  reRenderTable(){
        this.dtElement.dtInstance.then((dtInstance : DataTables.Api) =>  {

          console.log("actaulziando tabla"); 
            // Destroy the table first in the current context
            dtInstance.destroy();

            this.usersService.getAllUsers()
              .subscribe(
                data => {
                  this.users = data;              
                  this.chRef.detectChanges();
                  this.dtTrigger.next();
                },
                error => {
                  console.log(error);
            });

        });

  }

  editUser(id : string){
    this.router.navigate(['admin/user/edit/'+id]);
  }

  addUser(){
    this.router.navigate(['admin/user/add']);
  }

  deleteUser(id:string, user: string,tlf:string): void {

    var text  = "¿Desea eliminar el usuario con el nombre " + user + " y el teléfono "+ tlf + "?";

    const dialogRef = this.matDialog.open(DialogComponent, {
      height: '',
      width: '',
      data: {text:text}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        console.log("borrando el usuario con el id: " + id + "y el nombre "+ user); // Pizza!
 
        this.usersService.deleteUser(id).subscribe(
          res =>{
            console.log(res); 

            this.reRenderTable();
          },
          err => console.log(err)
        )

      }
    });
    
  }


}
