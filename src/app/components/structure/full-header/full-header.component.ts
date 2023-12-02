import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BufferserviceService } from 'src/app/services/bufferservice.service';
import { Utils } from 'src/utils';

@Component({
  selector: 'app-full-header',
  templateUrl: './full-header.component.html',
  styleUrls: ['./full-header.component.scss']
})
export class FullHeaderComponent {
  imgUrl:string = Utils.imgUrl;
  query:string = "";
  constructor(public buffer:BufferserviceService,private router:Router){
    
  }

  search(){
    this.router.navigateByUrl("/search/"+this.query);
  }
}
