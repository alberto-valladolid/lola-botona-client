import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from 'src/app/_services/group.service';

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.css']
})
export class EditGroupComponent implements OnInit {


  @HostBinding ('class') classes = 'row'; 

  errorMsg = null; 
  

  //for radio buttons
  optionSelected: string;
  options: string[] = ["Si", "No"];  
  timeofdayOptions: string[] = ["Mañana", "Tarde"];

  //for tittle
  dias = ["Lunes","Martes","Miércoles","Jueves","Viernes","Sabado","Domingo"];
  tittle: string; 


  group  = {
    id:null,
    capacity: null,
    description : "",
    active:false,
    dayofweek : null,    
    timeofday  : ""    
  }; 


  constructor( private activatedRoute: ActivatedRoute,private router: Router, private groupService: GroupService ) { }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params; 

    this.group.id = params.id;      

    this.groupService.getGroupById(params.id).subscribe(
      res =>{

        this.group.capacity = res.capacity; 
        this.group.description = res.description; 
        this.group.active = res.active; 
        this.group.dayofweek = res.dayofweek; 
        this.group.timeofday = res.timeofday; 

        if(res.active){
          this.optionSelected = "Si"; 
        }else{
          this.optionSelected = "No"; 
        }

        this.tittle = this.dias[this.group.dayofweek] + " - "+ this.group.timeofday ;

      },
      err => console.log(err)
    )

  }

  onSubmit() {

    if (this.optionSelected == "Si"){
      this.group.active = true;
    }else{
      this.group.active = false;
    }

    this.errorMsg = null;   

    this.groupService.editGroup(this.group).subscribe(
      res =>{
        this.router.navigate(['/admin/group']);
      },
      err =>{
        this.errorMsg = err.error.message; 
      } 
    )
 }

}
