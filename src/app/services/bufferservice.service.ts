import { Injectable } from '@angular/core';
import { GenericInformation } from 'src/genericInformation';
import { UserInformation } from 'src/userInformation';
import { ServerConnectionService } from './server-connection.service';
import { ServiceInformation } from 'src/serviceInformation';
import { ServiceSchedule } from 'src/serviceSchedule';
import { ServiceBundle } from 'src/serviceBundle';
import { firstValueFrom } from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root'
})

//TODO organizar essa putaria de serviços diferentes
export class BufferserviceService {
  userInfo:UserInformation;
  lastService:ServiceInformation;
  schedule:ServiceSchedule;
  services:ServiceInformation[];
  update:ServiceInformation;
  bundles:ServiceInformation[];
  servCodes:number[];
  conn:ServerConnectionService;
  isPortrait:boolean;
  rate:number;
  zeroInstances:boolean = false;

  constructor(private responsive: BreakpointObserver){
    this.bundles = [];
    this.servCodes = [-1];
  }

  async getMoreBundles(amount:number){
    if (this.servCodes == undefined){
      this.servCodes = [-1];
    }
    //console.log("Entrou no get more");
    for (let a = 1; a<= amount; a++){
      let x = await firstValueFrom(this.conn.GetAnotherBundle(this.servCodes));
      //console.log(x);
      if (this.servCodes[0] == -1){
        this.servCodes = [];
        this.bundles = [];
      }
      for (let b = 0; b < x.serviceInfos.length; b++){
        this.servCodes.push(x.serviceInfos[b].templateId)
        this.bundles.push(x.serviceInfos[b]);
      }
    }
  }

  runResposiveness(){
    this.responsive.observe([
      Breakpoints.HandsetPortrait,      
      Breakpoints.TabletPortrait,
      Breakpoints.WebPortrait
      ])
      .subscribe(result => {

        this.isPortrait = false; 

        if (result.matches) {
          this.isPortrait = true;
          console.log("É RETRATO CARAI");
        }

  });
  }
}
