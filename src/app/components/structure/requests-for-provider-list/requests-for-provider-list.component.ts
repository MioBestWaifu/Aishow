import { Component } from '@angular/core';
import { BufferserviceService } from 'src/app/services/bufferservice.service';

@Component({
  selector: 'app-requests-for-provider-list',
  templateUrl: './requests-for-provider-list.component.html',
  styleUrls: ['./requests-for-provider-list.component.css']
})
export class RequestsForProviderListComponent {
  constructor(public buffer:BufferserviceService){}
}
