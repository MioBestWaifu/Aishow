import { HttpResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { BufferserviceService } from 'src/app/services/bufferservice.service';
import { ServerConnectionService } from 'src/app/services/server-connection.service';
import { ClientServiceInteraction } from 'src/clientServiceInteraction';
import {Utils} from 'src/utils';
@Component({
  selector: 'app-request-for-provider-card',
  templateUrl: './request-for-provider-card.component.html',
  styleUrls: ['./request-for-provider-card.component.css']
})
export class RequestForProviderCardComponent {
  @Input() request:ClientServiceInteraction;
  altUrl = Utils.altUrl;

  constructor(private conn:ServerConnectionService, private buffer:BufferserviceService){}

  async accept(){
    this.interpretResult(await firstValueFrom(this.conn.AcceptRequest(this.request)));
  }

  async deny(){
    this.interpretResult(await firstValueFrom(this.conn.DenyRequest(this.request)));
  }

  async interpretResult(res:HttpResponse<String>){
    if (res.status != 200){
      alert("Interaction failed");
    } else {
      this.buffer.schedule = await firstValueFrom(this.conn.GetSchedule());
    }
  }
}
