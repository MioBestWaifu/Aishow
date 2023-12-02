import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { BufferserviceService } from 'src/app/services/bufferservice.service';
import { ServerConnectionService } from 'src/app/services/server-connection.service';
import { ReviewInformation } from 'src/reviewInformation';
import { ReviewOptions } from 'src/reviewOptions';

@Component({
  selector: 'app-review-dialog',
  templateUrl: './review-dialog.component.html',
  styleUrls: ['./review-dialog.component.scss']
})
export class ReviewDialogComponent {
  comment:string;
  rate:number = 0;
  constructor(public buffer:BufferserviceService, private dialog:MatDialog, private conn:ServerConnectionService, @Inject(MAT_DIALOG_DATA) public data:any) {
    console.log(data);
  }

  rated(rate:number){
    this.rate = rate;
  }

  async send(){
    const toSend = new ReviewInformation();
    toSend.comment = this.comment;
    toSend.score = this.buffer.rate;
    toSend.target = this.data.options.id;
    toSend.type = this.data.options.type;
    toSend.reviewer = this.buffer.userInfo;
    var x = await firstValueFrom(this.conn.Review(toSend));
    this.dialog.closeAll();
  }

}
