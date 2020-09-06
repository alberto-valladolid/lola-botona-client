import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AppConfigService } from 'src/app/_services/app-config.service';

@Component({
  selector: 'app-app-config',
  templateUrl: './app-config.component.html',
  styleUrls: ['./app-config.component.css']
})
export class AppConfigComponent implements OnInit {
  
  errorMsg = null; 
  succesMsg = null; 

  appConfig  = {
    
    eventMinutesToAllow:null,
    eventMinutes:null,
    absenceDays :null
    
  }; 




 
  constructor( private appConfigService: AppConfigService) { }

  ngOnInit(): void {
    this.getAppInfo();
  }

  onSubmit() {

    //alert(this.date.value); 

    this.errorMsg = null; 
    this.succesMsg = null;

    this.appConfigService.editAppConfig(this.appConfig).subscribe(
      res =>{
        this.succesMsg = "Configuración guardada"; 
      },
      err =>{
        this.errorMsg = err.error.message; 
      } 
    )


    
  }

  getAppInfo(){
    this.appConfigService.getAppConfig()
    .subscribe(
      data => {
        this.appConfig = data;
        console.log(this.appConfig); 
      },
      error => {
        console.log(error);
        
  });
  }
  

}
