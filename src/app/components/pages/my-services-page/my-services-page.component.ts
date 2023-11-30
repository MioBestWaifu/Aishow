import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { BufferserviceService } from 'src/app/services/bufferservice.service';
import { ServerConnectionService } from 'src/app/services/server-connection.service';
import { CreateServiceDialogComponent } from '../../dialogs/create-service-dialog/create-service-dialog.component';
import { ServiceSchedule } from 'src/serviceSchedule';
import { ServiceInformation } from 'src/serviceInformation';

@Component({
  selector: 'app-my-services-page',
  templateUrl: './my-services-page.component.html',
  styleUrls: ['./my-services-page.component.scss']
})
export class MyServicesPageComponent implements OnInit{

  //True = requests, false = templates
  mode:boolean = true;

  constructor(public buffer:BufferserviceService, private conn:ServerConnectionService,private dialog:MatDialog){}

  async ngOnInit(){
    this.buffer.runResposiveness();
    this.buffer.schedule = await firstValueFrom(this.conn.GetSchedule());
    if (this.buffer.userInfo == null){
      //this.buffer.userInfo = await firstValueFrom(this.conn.ReloadUser());
    }
    this.buffer.services = await firstValueFrom (this.conn.GetServiceList(this.buffer.userInfo.userId));
    //console.log(this.buffer.services);
    //const x = await firstValueFrom (this.conn.SetLastPage("/myservices"));
  }

  create(){
    const x = this.dialog.open(CreateServiceDialogComponent)
    x.updateSize("70vw","80vh")
  }

  goToTemplates(){
     var x = document.getElementById("requests");
     x.style.display = "none";
     x = document.getElementById("services");
     x.style.display = "block";
     this.mode = false;
     /* x = document.getElementById("requestsTab");
     x.style.removeProperty("background-color");
     x.style.removeProperty("color");
     x = document.getElementById("templatesTab");
     x.style.backgroundColor = "var (--rose)";
     x.style.color = "var (--secondary-background-color)"; */
  } 

  goToRequests(){
    var x;
    x = document.getElementById("services");
    x.style.display = "none";
    x = document.getElementById("requests");
    x.style.display = "block";
    this.mode = true;
    /* x = document.getElementById("templatesTab");
    x.style.removeProperty("background-color");
    x.style.removeProperty("color");
    x = document.getElementById("requestsTab");
    x.style.backgroundColor = "var (--rose)";
    x.style.color = "var (--secondary-background-color)"; */
  }
}
