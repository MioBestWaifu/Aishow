import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { BufferserviceService } from 'src/app/services/bufferservice.service';
import { ServerConnectionService } from 'src/app/services/server-connection.service';
import { ClientServiceInteraction } from 'src/clientServiceInteraction';

@Component({
  selector: 'app-instances-for-provider-list',
  templateUrl: './instances-for-provider-list.component.html',
  styleUrls: ['./instances-for-provider-list.component.scss']
})
//TODO #6 linkar essa porra com a schedulepage
export class InstancesForProviderListComponent implements OnInit {
  instances:ClientServiceInteraction[];
  @Input() isHistory:boolean = false;
  @Input() isInSchedule:boolean = false;
  constructor(public buffer:BufferserviceService, private conn:ServerConnectionService, private elementRef: ElementRef){}
  
  async ngOnInit(){
    if (this.isHistory){
      this.instances = (await firstValueFrom(this.conn.GetHistory()));
      return;
    }
    this.instances = (await firstValueFrom(this.conn.GetSchedule())).pendingInstances;
    if (this.instances.length == 0){
      this.elementRef.nativeElement.style.display = "none";
      this.buffer.zeroInstances = true;
      return;
    }

    this.buffer.zeroInstances = false;
  }
}
