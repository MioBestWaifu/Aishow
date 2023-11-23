import { Component } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { BufferserviceService } from 'src/app/services/bufferservice.service';
import { ServerConnectionService } from 'src/app/services/server-connection.service';

@Component({
  selector: 'app-portrait-instances-list',
  templateUrl: './portrait-instances-list.component.html',
  styleUrls: ['./portrait-instances-list.component.scss']
})
export class PortraitInstancesListComponent {
  constructor(public buffer:BufferserviceService, private conn:ServerConnectionService){}
  
  async ngOnInit(){
    this.buffer.schedule = await firstValueFrom(this.conn.GetSchedule());
    //console.log(this.buffer.schedule);
  }
}
