import { Component } from '@angular/core';
import { BufferserviceService } from 'src/app/services/bufferservice.service';
import { ServerConnectionService } from 'src/app/services/server-connection.service';

@Component({
  selector: 'app-schedule-page',
  templateUrl: './schedule-page.component.html',
  styleUrls: ['./schedule-page.component.scss']
})
export class SchedulePageComponent {
  constructor(public buffer:BufferserviceService, private conn:ServerConnectionService){}

  async ngOnInit(){
    this.buffer.runResposiveness();
  }
}
