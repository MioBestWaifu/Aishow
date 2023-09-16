import { Component, EventEmitter, Input, Output } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ServerConnectionService } from 'src/app/services/server-connection.service';
import { ClientServiceInteraction } from 'src/clientServiceInteraction';

@Component({
  selector: 'app-request-for-client',
  templateUrl: './request-for-client.component.html',
  styleUrls: ['./request-for-client.component.css']
})
export class RequestForClientComponent {
  @Input() request:ClientServiceInteraction;
  @Output() cancelEvent = new EventEmitter<string>();
  
  constructor(private conn:ServerConnectionService){}

  async cancel(){
    await firstValueFrom(this.conn.CancelRequest(this.request.id));
    this.cancelEvent.emit();
  }
}
