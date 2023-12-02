import { Component, OnDestroy, OnInit } from '@angular/core';
import { BufferserviceService } from 'src/app/services/bufferservice.service';
import { ServerConnectionService } from 'src/app/services/server-connection.service';
import {firstValueFrom} from 'rxjs';
import { ServiceInformation } from 'src/serviceInformation';
import { UserInformation } from 'src/userInformation';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit{
  resultServices:ServiceInformation[];
  resultUsers:UserInformation[];
  text:string;
  sub:any;
  constructor(public buffer:BufferserviceService, private conn:ServerConnectionService, private router:ActivatedRoute){}

  async ngOnInit(){
    this.buffer.runResposiveness();
    this.sub = this.router.params.subscribe((params: { [x: string]: string; }) => {
      this.text = params['query']; 
   })

   console.log(this.text);
  }

  async search(){
    console.log(this.text);
    this.resultServices = await firstValueFrom(this.conn.SearchServices(this.text));
  }
}
