import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { GroupService } from '../../../_services/group.service';
import { Subject } from 'rxjs';

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

  constructor(private groupService: GroupService,private chRef : ChangeDetectorRef) { }

  ngOnInit(): void {

    

    this.retrieveGroups();

    // this.dtOptions = {
    //   language: {
    //     "decimal":        "",
    //     "emptyTable":     "La tabla está vacía",
    //     "info":           "Mostrando de _START_ a _END_ de _TOTAL_  registros",
    //     "infoEmpty":      "Mostrando 0 de 0 registros",
    //     "infoFiltered":   "(Registros totales  _MAX_ )",
    //     "infoPostFix":    "",
    //     "thousands":      ",",
    //     "lengthMenu":     "Registros por página _MENU_ ",
    //     "loadingRecords": "Cargando...",
    //     "processing":     "Procesando...",
    //     "search":         "Filtrar:",
    //     "zeroRecords":    "No se han encontrado registros",
    //     "paginate": {
    //         "first":      "Primero",
    //         "last":       "Último",
    //         "next":       "Sig",
    //         "previous":   "Ant"
    //     },
    //     "aria": {
    //         "sortAscending":  ": Ordenar ascendentemente",
    //         "sortDescending": ": Ordenar descendentemente"
    //     }
    //   },

    // };
  }


  retrieveGroups() {
    this.groupService.getAllGroups()
      .subscribe(
        data => {
          this.groups = data;
          this.chRef.detectChanges();
          this.dtTrigger.next();
          console.log(this.groups);
        },
        error => {
          console.log(error);
          
    });
  }

}
