import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BufferserviceService } from 'src/app/services/bufferservice.service';
import { ImageCroppedEvent, LoadedImage, base64ToFile } from 'ngx-image-cropper';
import { ServerConnectionService } from 'src/app/services/server-connection.service';
import { firstValueFrom } from 'rxjs';
import { FailedUpdateDialogComponent } from '../failed-update-dialog/failed-update-dialog.component';
import { GenericInformation } from 'src/genericInformation';
import { GeoLimitation } from 'src/geoLimitation';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.scss']
})
export class EditUserDialogComponent implements OnInit{
  imageChangedEvent: any = '';
  public newName:string;
  public croppedImage: any = '';
  possibleAreas:GenericInformation[] = [];
  selectedAreas:GenericInformation[] = [];
  lastClicked:number;
  noneInfo:GenericInformation = new GenericInformation();

  constructor(public buffer:BufferserviceService, private dialog:MatDialog, private conn:ServerConnectionService){
      this.croppedImage = buffer.userInfo.imageUrl;
  }

  async ngOnInit(){
    this.possibleAreas = await firstValueFrom(this.conn.GetAreas());
    var limitations = await firstValueFrom(this.conn.GetUserGeoLimitations());

    if (limitations[0].idArea == 99){
      var x = new GenericInformation();
      x.Id = 99;
      x.Name = "Anywhere";
      this.selectedAreas.push(x);
      return;
    }

    limitations.forEach(element => {
      this.selectedAreas.push(this.possibleAreas.find(x => x.Id == element.idArea));
      this.possibleAreas = this.possibleAreas.filter(x => x.Id != element.idArea);
    });

    this.noneInfo.Id = 0;
    this.noneInfo.Name = "Areas";
    this.possibleAreas.unshift(this.noneInfo);
  }

  fileChangeEvent(event: any): void {
      this.imageChangedEvent = event;
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

  selectArea(){
    console.log(this.possibleAreas.find(x => x.Id == this.lastClicked).Name);
    //remove from possibleAreas the GenericInformation with Id = lastClicked and add it to selectedAreas
    //remove from selectedAreas the GenericInformation with Id = 99 if it is there and add it at the beggining of possibleAreas
    if (this.lastClicked != 99 && this.selectedAreas.find(x => x.Id == 99) != undefined){
      //this.possibleAreas.unshift(this.selectedAreas.find(x => x.Id == 99));
      this.possibleAreas.splice(1, 0, this.selectedAreas.find(x => x.Id == 99));
      this.selectedAreas = this.selectedAreas.filter(x => x.Id != 99);
    }

    if(this.lastClicked == 99){
      //remove all from selectedAreas and add them to possibleAreas, add the GenericInformation with Id = 99 in possibleAreas to selectedAreas
      this.selectedAreas.forEach(element => {
        this.possibleAreas.push(element);
      });
      this.selectedAreas = [];
      this.selectedAreas.push(this.possibleAreas.find(x => x.Id == 99));
      this.possibleAreas = this.possibleAreas.filter(x => x.Id != this.lastClicked);
      return;
    }
    this.selectedAreas.push(this.possibleAreas.find(x => x.Id == this.lastClicked));
    this.possibleAreas = this.possibleAreas.filter(x => x.Id != this.lastClicked);
  }

  removeArea(id:number){
    if(id == 99){
      return;
    }
    console.log(this.selectedAreas.find(x => x.Id == id).Name);
    //remove from selectedAreas the GenericInformation with Id = id and add it to possibleAreas
    //this.possibleAreas.unshift(this.selectedAreas.find(x => x.Id == id));
    this.possibleAreas.splice(1, 0, this.selectedAreas.find(x => x.Id == id));
    this.selectedAreas = this.selectedAreas.filter(x => x.Id != id);
  }

  cancel(){
    this.dialog.closeAll();
  }
  async save(){
    if (this.croppedImage != this.buffer.userInfo.imageUrl){
      var response = await firstValueFrom(this.conn.TryToUpdateUserPicture(this,this.buffer.userInfo.userId));
      if(response.body != "OK"){
        this.dialog.open(FailedUpdateDialogComponent)
        return
      }
    }

    if(this.newName != undefined){
      response = await firstValueFrom(this.conn.TryToUpdateUserName(this));
      if(response.body != "OK"){
        this.dialog.open(FailedUpdateDialogComponent)
        return
      }
    }
    var limitations:GeoLimitation[] = [];
    //create a GeoLimitation for each GenericInformation in selectedAreas, setting idUser to this.buffer.userInfo.userId and idArea to the Id of the GenericInformation, and push it into limitations
    this.selectedAreas.forEach(element => {
      var x = new GeoLimitation();
      x.idArea = element.Id;
      x.idUser = this.buffer.userInfo.userId;
      limitations.push(x);
    });
    response = await firstValueFrom(this.conn.UpdateUserGeoLimitations(limitations));
    if(response.body != "OK"){
      this.dialog.open(FailedUpdateDialogComponent)
      return
    }
    this.buffer.userInfo = await firstValueFrom(this.conn.ReloadUser());
    this.dialog.closeAll();
  }
}
