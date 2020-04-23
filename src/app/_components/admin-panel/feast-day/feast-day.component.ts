import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { FeastDayService } from '../../../_services/feast-day.service';
import { DataTableDirective } from 'angular-datatables';
import { DialogComponent } from '../../_dialogs/delete-user-dialog/dialog.component';

@Component({
  selector: 'app-feast-day',
  templateUrl: './feast-day.component.html',
  styleUrls: ['./feast-day.component.css']
})



export class FeastDayComponent implements OnInit {

  feastDays:any; 
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  dtGroups :any;

  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  constructor( private feastDayService: FeastDayService,private chRef : ChangeDetectorRef,private router: Router,private matDialog: MatDialog ) { }
  



  ngOnInit(): void {
 

    this.retrieveDays();



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
  addFeast(){
    this.router.navigate(['admin/feast-day/add']);
  }

  deleteFeast(id:string, date:string): void {


    var text  = "¿Desea eliminar el día festivo "+ date + "?";
    const dialogRef = this.matDialog.open(DialogComponent, {
      height: '',
      width: '',
      data: {text:text , successButtonString:"Eliminar" }
    });

    dialogRef.afterClosed().subscribe(result => {

      if(result){
       
        this.feastDayService.deleteFeastDay(id).subscribe(
          res =>{
            console.log(res); 

            this.reRenderTable();
          },
          err => console.log(err)
        )

      }
    });

  }

  reRenderTable(){
    this.dtElement.dtInstance.then((dtInstance : DataTables.Api) =>  {

        // Destroy the table first in the current context
        dtInstance.destroy();

        this.feastDayService.getAllFeastDays()
          .subscribe(
            data => {
              this.feastDays = data;              
              this.chRef.detectChanges();
              this.dtTrigger.next();
              var dateSplit;
              this.feastDays.forEach(function (feastday) {

                // dateSplit = feastday.date.split(/[-]/);
                // feastday.date = dateSplit[2] + "/" + dateSplit[1] + "/" + dateSplit[0]  ; 
       
              });

            },
            error => {
              console.log(error);
        });

    });

  }

  retrieveDays() {
    
    this.feastDayService.getAllFeastDays()
      .subscribe(
        data => {
          this.feastDays = data;
          this.chRef.detectChanges();
          this.dtTrigger.next();
          var dateSplit;

          this.feastDays.forEach(function (feastday) {

            // dateSplit = feastday.date.split(/[-]/);
            // feastday.date = dateSplit[2] + "/" + dateSplit[1] + "/" + dateSplit[0]  ; 
   
          });

        },
        error => {
          console.log(error);
          
    });
  }



}
