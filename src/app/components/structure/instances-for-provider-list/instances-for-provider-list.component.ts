import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { BufferserviceService } from 'src/app/services/bufferservice.service';
import { ServerConnectionService } from 'src/app/services/server-connection.service';

@Component({
  selector: 'app-instances-for-provider-list',
  templateUrl: './instances-for-provider-list.component.html',
  styleUrls: ['./instances-for-provider-list.component.css']
})
export class InstancesForProviderListComponent implements OnInit {
  constructor(public buffer:BufferserviceService, private conn:ServerConnectionService){}
  
  async ngOnInit(){
    this.buffer.schedule = await firstValueFrom(this.conn.GetSchedule());
    //console.log(this.buffer.schedule);
  }
}
