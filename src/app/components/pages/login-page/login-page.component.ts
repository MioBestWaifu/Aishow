import { Component, OnDestroy, OnInit } from '@angular/core';
import { ServerConnectionService } from 'src/app/services/server-connection.service';
import { firstValueFrom } from 'rxjs';
import { Utils } from 'src/utils';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit{
  imgUrl:string = Utils.imgUrl;
  constructor (private conn:ServerConnectionService){}
  
  async ngOnInit(){
    const x = await firstValueFrom(this.conn.SetLastPage("/pages/login"));
  }
}
