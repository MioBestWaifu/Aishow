import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RequestForClientComponent } from '../../cards/request-for-client/request-for-client.component';
import { ClientServiceInteraction } from 'src/clientServiceInteraction';
import { ServerConnectionService } from 'src/app/services/server-connection.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-requests-for-user-list',
  templateUrl: './requests-for-user-list.component.html',
  styleUrls: ['./requests-for-user-list.component.css']
})
export class RequestsForUserListComponent implements OnInit{
  @Output() cancelEvent = new EventEmitter<string>()
  userRequests:ClientServiceInteraction[];
  public constructor (private conn:ServerConnectionService){}
  

  async ngOnInit() {
   this.userRequests = await firstValueFrom(this.conn.GetUserServiceRequests());
  }

  async handleCancelEvent() {
    this.userRequests = await firstValueFrom(this.conn.GetUserServiceRequests());
  }
}
