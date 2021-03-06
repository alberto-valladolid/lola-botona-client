import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { GroupService } from '../../../_services/group.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../_dialogs/delete-user-dialog/dialog.component';

import config from '../../../config';


@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  


  groups:any; 
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  dtGroups :any;
  teachers = {}; 

  //For update/detele group view
    @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  constructor(private groupService: GroupService,private chRef : ChangeDetectorRef,private router: Router,private matDialog: MatDialog) { }

  ngOnInit(): void {

    

    this.retrieveGroups();



    this.dtOptions = {
      language: {
        "decimal":        "",
        "emptyTable":     "La tabla está vacía",
        "info":           "Mostrando de _START_ a _END_ de _TOTAL_  registros",    
        "infoEmpty":      "Mostrando 0 de 0 registros",
        // "infoFiltered":   "(Registros totales  _MAX_ )",
        "infoFiltered":   "",
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


  retrieveGroups() {
    this.groupService.getAllGroups()
      .subscribe(
        data => {
          var teacherHolder = {}; 
          data.teachers.forEach(function (teacher) { 
            teacherHolder[teacher.id] = teacher; 
          });
          this.teachers = teacherHolder; 
     
          this.groups = data.groups;    
          this.chRef.detectChanges();
          this.dtTrigger.next();

        },
        error => {
          console.log(error);
          
    });
  }

  reRenderTable(){
    this.dtElement.dtInstance.then((dtInstance : DataTables.Api) =>  {

        // Destroy the table first in the current context
        dtInstance.destroy();

        this.groupService.getAllGroups()
          .subscribe(
            data => {
              var teacherHolder = {}; 
              data.teachers.forEach(function (teacher) { 
                teacherHolder[teacher.id] = teacher; 
              });
              this.teachers = teacherHolder;               
              this.groups = data.groups;
              this.chRef.detectChanges();
              this.dtTrigger.next();
            },
            error => {
              console.log(error);
        });

    });

  }

  editGroup(id : string){
  this.router.navigate(['admin/group/edit/'+id]);
  }

  addGroup(){
  this.router.navigate(['admin/group/add']);
  }

  deleteGroup(id:string, diaSemana: number,turno:string): void {

    var diaSemanaString : string; 


    switch(diaSemana) { 
      case 2: { 
        diaSemanaString="lunes"; 
        break; 
      } 
      case 3: { 
        diaSemanaString="martes"; 
        break; 
      } 
      case 4: { 
        diaSemanaString="miércoles"; 
        break; 
      } 
      case 5: { 
        diaSemanaString="jueves"; 
        break; 
      } 
      case 6: { 
        diaSemanaString="viernes"; 
        break; 
      } 
      case 7: { 
        diaSemanaString="sábado"; 
        break; 
      } 
      case 1: { 
        diaSemanaString="domingo"; 
        break; 
      } 

    } 


    var text  = "¿Desea eliminar el grupo del " + diaSemanaString + " - "+ turno + "?";
    const dialogRef = this.matDialog.open(DialogComponent, {
      height: '',
      width: '',
      data: {text:text , successButtonString:"Eliminar" }
  });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
       
        this.groupService.deleteGroup(id).subscribe(
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
