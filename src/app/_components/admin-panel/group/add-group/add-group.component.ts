import { Component, OnInit , HostBinding} from '@angular/core';
import { GroupService } from '../../../../_services/group.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent implements OnInit {

  @HostBinding ('class') classes = 'row'; 

  errorMsg = null; 

  optionSelected: string;
  options: string[] = ["Si", "No"];
  
  dayofweek : string; 

  timeofdayOptions: string[] = ["Mañana", "Tarde"];

  group  = {

    id:null,
    capacity: null,
    description : "",
    active:false,
    dayofweek : null,    
    timeofday  : ""
    
  }; 

  constructor(private groupService: GroupService,private router: Router) { }
  
  ngOnInit(): void {
  }

  onSubmit() {

    if (this.optionSelected == "Si"){
      this.group.active = true;
    }else{
      this.group.active = false;
    }
    this.group.dayofweek = Number(this.dayofweek); 

    this.errorMsg = null;  


    this.groupService.addGroup(this.group).subscribe(
      res =>{
        this.router.navigate(['/admin/group']);
      },
      err =>{
        this.errorMsg = err.error.message; 
      } 
    )
  }
}
