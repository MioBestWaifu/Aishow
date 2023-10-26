import { Component, OnDestroy, OnInit } from '@angular/core';
import { BufferserviceService } from 'src/app/services/bufferservice.service';
import { ServerConnectionService } from 'src/app/services/server-connection.service';
import {firstValueFrom} from 'rxjs';
import { ServiceInformation } from 'src/serviceInformation';
import { UserInformation } from 'src/userInformation';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit{
  resultServices:ServiceInformation[];
  resultUsers:UserInformation[];
  text:string;
  constructor(public buffer:BufferserviceService, private conn:ServerConnectionService){}

  async ngOnInit(){
  }

  async search(){
    console.log(this.text);
    this.resultServices = await firstValueFrom(this.conn.SearchServices(this.text));
  }
}
