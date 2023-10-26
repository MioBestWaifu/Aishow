import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { buffer } from 'rxjs';
import { BufferserviceService } from 'src/app/services/bufferservice.service';
import { ServiceInformation } from 'src/serviceInformation';
import { EditServiceDialogComponent } from '../../dialogs/edit-service-dialog/edit-service-dialog.component';
import { Utils } from 'src/utils';

@Component({
  selector: 'app-full-service-card',
  templateUrl: './full-service-card.component.html',
  styleUrls: ['./full-service-card.component.css']
})
export class FullServiceCardComponent implements OnInit{
@Input() info:ServiceInformation;
@Input() canEdit:boolean;
dayInfos:string[];
altUrl = Utils.altUrl;

constructor(private buffer:BufferserviceService,private dialog:MatDialog){}

  ngOnInit(): void {
    //console.log(this.info);
    this.dayInfos = Array<string>(7);
    if (!this.canEdit){
      document.getElementById("editService").style.display = "none";
    }

    var x = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    for (let i = 0; i <= 6; i++) {
      try{
      if (this.info.availableDays[i]){
        this.dayInfos[i] = x[i] +": " +this.info.availableFroms[i].substring(0,5)+"-"+this.info.availableTos[i].substring(0,5);
      } else {
        this.dayInfos[i] = x[i] +": N/A";
      }
      } catch(error){
        //console.log("ERRRRR")
        //console.log(error);
      }
    }

  }

  edit(){
    this.buffer.update = this.info;
    this.dialog.open(EditServiceDialogComponent);
  }
}
