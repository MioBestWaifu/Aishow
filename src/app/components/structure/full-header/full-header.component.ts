import { Component } from '@angular/core';
import { BufferserviceService } from 'src/app/services/bufferservice.service';
import { Utils } from 'src/utils';

@Component({
  selector: 'app-full-header',
  templateUrl: './full-header.component.html',
  styleUrls: ['./full-header.component.css']
})
export class FullHeaderComponent {
  imgUrl:string = Utils.imgUrl;

  constructor(public buffer:BufferserviceService){
    
  }

  search(){

  }
}
