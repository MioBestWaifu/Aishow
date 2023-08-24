import { Injectable } from '@angular/core';
import { GenericInformation } from 'src/genericInformation';
import { UserInformation } from 'src/userInformation';
import { ServerConnectionService } from './server-connection.service';
import { ServiceInformation } from 'src/serviceInformation';
import { ServiceSchedule } from 'src/serviceSchedule';

@Injectable({
  providedIn: 'root'
})
export class BufferserviceService {
  userInfo:UserInformation;
  lastService:ServiceInformation;
  schedule:ServiceSchedule;
  services:ServiceInformation[];
  update:ServiceInformation;
  constructor() {
  }
}
