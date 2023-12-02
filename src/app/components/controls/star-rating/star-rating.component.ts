import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BufferserviceService } from 'src/app/services/bufferservice.service';
import { ServerConnectionService } from 'src/app/services/server-connection.service';
import { Utils } from 'src/utils';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent implements OnInit{
  @Input() rating:number;
  @Input() isEnabled:boolean;
  @Input() imgWidth:string;
  @Input() forReview:boolean = false;
  @Output() rated = new EventEmitter<number>();

  fullstar:string;
  halfstar:string;
  emptystar:string;
  sources:string[];

  constructor(private conn:ServerConnectionService, public buffer:BufferserviceService){
    this.fullstar = Utils.imgUrl+"app/fullstar.png"
    this.halfstar = Utils.imgUrl+"app/halfstar.png"
    this.emptystar = Utils.imgUrl+"app/emptystar.png"
  }
  ngOnInit(): void {
    this.setSources();
    this.buffer.rate = 0;
  }

  ngOnChanges() { 
    this.setSources();
  }

  rate (score:number){
    if (!this.forReview){
      return;
    }
    this.rating = score;
    this.buffer.rate = score;
    this.setSources();
  }

  setSources(){
    var x = this.rating;
    ////console.log("PRIM" + x)
    x *= 10; 
    x = Math.round(x / 5) * 5;
    x /= 10;
    //console.log(x)
    this.sources = new Array<string>(5).fill(this.emptystar)
    ////console.log(this.sources)
    var i = 0.5;
    for (i; i<x;i++){
      this.sources[i-0.5] = this.fullstar
    }
    //console.log(x.toString().charAt(2))
    if (x.toString().charAt(2) == '5'){
      this.sources[i-0.5] = this.halfstar
    }

    const y = document.getElementsByClassName("starImg")  as HTMLCollectionOf<HTMLElement>;
    
    //console.log("IMAGE WIDTH");
    //console.log(y.length);
    /* for (let a = 0; a < y.length; a++) {
      y[a].style.width = this.imgWidth
    } */
  }
}
