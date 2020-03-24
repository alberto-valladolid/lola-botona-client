import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { Observable, Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';



@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  users:any; 
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  dtUsers :any;
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  constructor(private usersService: UserService,  private chRef : ChangeDetectorRef,) { }

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


         this.dtElement.dtInstance.then((dtInstance : DataTables.Api) => 
        {

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

}
