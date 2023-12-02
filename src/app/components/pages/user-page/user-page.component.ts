import { Component, OnInit } from '@angular/core';
import { BufferserviceService } from 'src/app/services/bufferservice.service';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { UserInformation } from 'src/userInformation';
import { ServerConnectionService } from 'src/app/services/server-connection.service';
import { ReviewInformation } from 'src/reviewInformation';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit{
  id:number;
  sub:any;
  info:UserInformation;
  canReview:boolean = false;
  constructor(public buffer:BufferserviceService, private router:ActivatedRoute, private conn:ServerConnectionService){}

  async ngOnInit(){
    this.buffer.runResposiveness();
    if (this.buffer.userInfo == null){
      //this.buffer.userInfo = await firstValueFrom(this.conn.ReloadUser());
    }
    this.sub = this.router.params.subscribe(params => {
      this.id = +params['id']; 
  
   })
   //const x = await firstValueFrom (this.conn.SetLastPage("/user/"+this.id));
   this.info = await firstValueFrom(this.conn.GetUser(this.id.toString()));
   this.info.reviews = await firstValueFrom(this.conn.GetReviews(this.id.toString(),"users"));
   this.info.services = await firstValueFrom(this.conn.GetServiceList(this.id));
   console.log(this.info);
   this.info.averageScore = this.averageFromReviews(this.info.reviews);

   this.info.services.forEach(element => {
    element.provider = this.info;
   });

   var x = await firstValueFrom(this.conn.FindIfCanReview("users",this.info.userId.toString()));
   if (x.body == "OK"){
     this.canReview = true;
   }
  }

  public averageFromReviews(reviews:ReviewInformation[]): number{
    let sum = 0;
    reviews.forEach(element => {
      sum += element.score;
    });
    sum = sum/reviews.length;
    sum = Math.round(sum * 10) / 10;
    return sum;
}

}
