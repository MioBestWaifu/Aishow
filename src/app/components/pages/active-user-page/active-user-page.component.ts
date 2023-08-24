import { Component, OnDestroy, OnInit } from '@angular/core';
import { BufferserviceService } from 'src/app/services/bufferservice.service';
import { EditUserDialogComponent } from '../../dialogs/edit-user-dialog/edit-user-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { ServerConnectionService } from 'src/app/services/server-connection.service';

@Component({
  selector: 'app-active-user-page',
  templateUrl: './active-user-page.component.html',
  styleUrls: ['./active-user-page.component.css']
})
export class ActiveUserPageComponent implements OnInit{

  constructor(public buffer:BufferserviceService, private conn:ServerConnectionService,private dialog:MatDialog){
    
  }
  
  async ngOnInit(){
    if (this.buffer.userInfo == null){
      this.buffer.userInfo = await firstValueFrom(this.conn.ReloadUser());
    }

    console.log(this.buffer.userInfo);
    const x = await firstValueFrom (this.conn.SetLastPage("/viewprofile"));
  }

  edit(){
    const x = this.dialog.open(EditUserDialogComponent)
  }

}
