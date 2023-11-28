import { Component, Input, OnInit } from '@angular/core';
import { BufferserviceService } from 'src/app/services/bufferservice.service';
import { ServiceBundle } from 'src/serviceBundle';
import { ServiceInformation } from 'src/serviceInformation';
import { Utils } from 'src/utils';

@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.scss']
})
export class ServiceCardComponent implements OnInit{
  starWidth = "1.6vw"
  altUrl = Utils.altUrl;
  @Input() service:ServiceInformation

  constructor(public buffer:BufferserviceService){}

  ngOnInit(): void {
    ////console.log("AVG"+this.service.AverageScore)
  }
}
