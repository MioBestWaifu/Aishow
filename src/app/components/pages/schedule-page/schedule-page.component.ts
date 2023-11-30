import { Component } from '@angular/core';
import { BufferserviceService } from 'src/app/services/bufferservice.service';
import { ServerConnectionService } from 'src/app/services/server-connection.service';

@Component({
  selector: 'app-schedule-page',
  templateUrl: './schedule-page.component.html',
  styleUrls: ['./schedule-page.component.scss']
})
export class SchedulePageComponent {
  instances:boolean = true; history:boolean = false; requests:boolean = false;
  constructor(public buffer:BufferserviceService, private conn:ServerConnectionService){}

  async ngOnInit(){
    this.buffer.runResposiveness();
  }

  goToInstances(){
    this.instances = true;
    this.history = false;
    this.requests = false;
    var x = document.getElementById("requests");
    x.style.display = "none";
    x = document.getElementById("history");
    x.style.display = "none";
    x = document.getElementById("instances");
    x.style.display = "block";
  }

  //do the same as above for history and requests
  goToHistory(){
    this.instances = false;
    this.history = true;
    this.requests = false;
    var x = document.getElementById("requests");
    x.style.display = "none";
    x = document.getElementById("instances");
    x.style.display = "none";
    x = document.getElementById("history");
    x.style.display = "block";
  }

  goToRequests(){
    this.instances = false;
    this.history = false;
    this.requests = true;
    var x = document.getElementById("instances");
    x.style.display = "none";
    x = document.getElementById("history");
    x.style.display = "none";
    x = document.getElementById("requests");
    x.style.display = "block";
  }
}
