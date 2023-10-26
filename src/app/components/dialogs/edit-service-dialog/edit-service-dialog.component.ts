import { AfterContentInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { BufferserviceService } from 'src/app/services/bufferservice.service';
import { ServerConnectionService } from 'src/app/services/server-connection.service';
import { GenericInformation } from 'src/genericInformation';
import { ImageCroppedEvent} from 'ngx-image-cropper';

@Component({
  selector: 'app-edit-service-dialog',
  templateUrl: './edit-service-dialog.component.html',
  styleUrls: ['./edit-service-dialog.component.css']
})
export class EditServiceDialogComponent implements OnInit, AfterContentInit{
  Categories:GenericInformation[];
  Modalities:GenericInformation[];
  public croppedImage: any = '';
  imageChanged:boolean;
  imageChangedEvent: any = '';

  constructor(public buffer:BufferserviceService, private dialog:MatDialog, private conn:ServerConnectionService){
    this.croppedImage = buffer.update.templateImageUrl;
    //console.log(this.buffer.update);
  }

  async ngOnInit() {
    this.Categories = await firstValueFrom(this.conn.GetCategories());
    this.Modalities = await firstValueFrom(this.conn.GetModalities());
    //console.log("TESTANDOOOOOO");
    //console.log(this.buffer.update)
  }

  async ngAfterContentInit(){
  }

  cancel(){
    this.dialog.closeAll();
  } 

  async save(){
    for (let i = 0; i<=6; i++){
      if (!this.buffer.update.availableDays[i]){
        this.buffer.update.availableFroms[i] = "00:00";
        this.buffer.update.availableTos[i] = "00:00";
      } else if (this.buffer.update.availableFroms[i].startsWith("1970")){
        this.buffer.update.availableFroms[i] = this.buffer.update.availableFroms[i].substring(11,16);
        this.buffer.update.availableTos[i] = this.buffer.update.availableTos[i].substring(11,16);
      } else {
        this.buffer.update.availableFroms[i] = this.buffer.update.availableFroms[i].substring(0,5);
        this.buffer.update.availableTos[i] = this.buffer.update.availableTos[i].substring(0,5);
      }
    }
    const x = await firstValueFrom(this.conn.TryToUpdateService(this.buffer.update));

    if(x.body !="OK"){
      if (x.body == "Failed basic"){
        alert("Failed service update");
      } else if (x.body == "Failed availability"){
        this.buffer.services = await firstValueFrom(this.conn.GetServiceList(this.buffer.userInfo.userId));
        alert ("Failed availability update");
      }
      return;
    }

    if (this.imageChanged){
      const y = await firstValueFrom(this.conn.TryToUpdateServicePicture(this.croppedImage,this.buffer.update.templateId));

      if (y.status != 200){
        this.buffer.services = await firstValueFrom(this.conn.GetServiceList(this.buffer.userInfo.userId));
        alert ("Image update failed");
      }
    }

    this.buffer.services = await firstValueFrom(this.conn.GetServiceList(this.buffer.userInfo.userId));
    this.dialog.closeAll();
  }

  dayBtnClicked(day:number){
    this.buffer.update.availableDays[day] = !this.buffer.update.availableDays[day];
    if (this.buffer.update.availableDays[day]){
      document.getElementById("hour"+day).style.display = "flex";
    } else {
      document.getElementById("hour"+day).style.display = "none";
    }
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.imageChanged = true;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded() {
      // show cropper
  }
  cropperReady() {
      // cropper ready
  }
  loadImageFailed() {
      // show message
  }
}
