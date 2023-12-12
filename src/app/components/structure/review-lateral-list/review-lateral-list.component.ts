import { Component, Input } from '@angular/core';
import { BufferserviceService } from 'src/app/services/bufferservice.service';
import { ReviewInformation } from 'src/reviewInformation';

@Component({
  selector: 'app-review-lateral-list',
  templateUrl: './review-lateral-list.component.html',
  styleUrls: ['./review-lateral-list.component.scss']
})
export class ReviewLateralListComponent {
  starWidth = "1.4vw";
  @Input() reviews:ReviewInformation[];

  constructor(public buffer:BufferserviceService){
  }
}
