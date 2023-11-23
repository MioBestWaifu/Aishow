import { Component } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { BufferserviceService } from 'src/app/services/bufferservice.service';
import { ServerConnectionService } from 'src/app/services/server-connection.service';

@Component({
  selector: 'app-portrait-instance-warning-card',
  templateUrl: './portrait-instance-warning-card.component.html',
  styleUrls: ['./portrait-instance-warning-card.component.scss']
})
export class PortraitInstanceWarningCardComponent {
  instancesCount:number;
  constructor(public buffer:BufferserviceService, private conn:ServerConnectionService){}
  
  async ngOnInit(){
    this.buffer.schedule = await firstValueFrom(this.conn.GetSchedule());
    this.instancesCount = this.buffer.schedule.pendingInstances.length;
    //console.log(this.buffer.schedule);
  }
}
