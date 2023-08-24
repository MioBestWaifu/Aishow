import { Component } from '@angular/core';
import { BufferserviceService } from 'src/app/services/bufferservice.service';

@Component({
  selector: 'app-instances-for-provider-list',
  templateUrl: './instances-for-provider-list.component.html',
  styleUrls: ['./instances-for-provider-list.component.css']
})
export class InstancesForProviderListComponent {
  constructor(public buffer:BufferserviceService){}
}
