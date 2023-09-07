import { Component, Input } from '@angular/core';
import { ClientServiceInteraction } from 'src/clientServiceInteraction';

@Component({
  selector: 'app-request-for-client',
  templateUrl: './request-for-client.component.html',
  styleUrls: ['./request-for-client.component.css']
})
export class RequestForClientComponent {
  @Input() request:ClientServiceInteraction;
}
