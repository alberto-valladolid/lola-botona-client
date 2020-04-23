import { Component, OnInit , HostBinding} from '@angular/core';
import {FormControl } from '@angular/forms';
import { FeastDayService } from '../../../../_services/feast-day.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-feast',
  templateUrl: './add-feast.component.html',
  styleUrls: ['./add-feast.component.css']
})
export class AddFeastComponent implements OnInit {
  errorMsg = null; 

  feastDay  = {

    id:null,
    date :null
    
  }; 


  date = new FormControl(new Date());


 
  constructor(private feastDayService: FeastDayService,private router: Router) { }

  ngOnInit(): void {
   
  }

  onSubmit() {

    //alert(this.date.value); 

    this.errorMsg = null; 

    this.feastDay.date = this.date.value; 

    this.feastDayService.addFeastDay(this.feastDay).subscribe(
      res =>{
        this.router.navigate(['/admin/feast-day']);
      },
      err =>{
        this.errorMsg = err.error.message; 
      } 
    )
    
  }

}
