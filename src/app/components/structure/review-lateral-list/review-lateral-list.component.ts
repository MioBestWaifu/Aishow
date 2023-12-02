import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BufferserviceService } from 'src/app/services/bufferservice.service';
import { ReviewInformation } from 'src/reviewInformation';
import { ReviewDialogComponent } from '../../dialogs/review-dialog/review-dialog.component';
import { ReviewOptions } from 'src/reviewOptions';

@Component({
  selector: 'app-review-lateral-list',
  templateUrl: './review-lateral-list.component.html',
  styleUrls: ['./review-lateral-list.component.scss']
})
export class ReviewLateralListComponent {
  starWidth = "1.4vw";
  @Input() reviews:ReviewInformation[];
  @Input() canReview:boolean = false;
  @Input() target:number = -1;
  @Input() type:number = -1;

  constructor(public buffer:BufferserviceService, private matDialog:MatDialog) {
  }

  addReview(){
    const y = new ReviewOptions();
    y.id = this.target;
    y.type = this.type;
    const x = this.matDialog.open(ReviewDialogComponent,{data:{options:y}});
  }
}
