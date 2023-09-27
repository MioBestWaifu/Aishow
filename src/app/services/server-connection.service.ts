import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { LoginFormsComponent } from '../components/forms/login-forms/login-forms.component';
import { LoginTemplate } from 'src/loginTemplate';
import { UserInformation } from 'src/userInformation';
import { RegisterFormsComponent } from '../components/forms/register-forms/register-forms.component';
import { RegisterTemplate } from 'src/registerTemplate';
import { EditUserDialogComponent } from '../components/dialogs/edit-user-dialog/edit-user-dialog.component';
import {base64ToFile } from 'ngx-image-cropper';
import { GenericInformation } from 'src/genericInformation';
import { ServiceInformation } from 'src/serviceInformation';
import { CreateServiceDialogComponent } from '../components/dialogs/create-service-dialog/create-service-dialog.component';
import { ScheduleServiceDialogComponent } from '../components/dialogs/schedule-service-dialog/schedule-service-dialog.component';
import { ClientServiceInteraction } from 'src/clientServiceInteraction';
import {Utils} from 'src/utils';
import { ServiceSchedule } from 'src/serviceSchedule';
import { BufferserviceService } from './bufferservice.service';
import { Router } from '@angular/router';
import { ServiceBundle } from 'src/serviceBundle';

@Injectable({
  providedIn: 'root'
})
export class ServerConnectionService {
  requestsUrl:string;
  jsonHeader = new HttpHeaders().set('content-type', 'application/json');
  loginParams = new HttpParams();
  test:UserInformation;
  constructor(private http:HttpClient, private buffer:BufferserviceService) {
    this.requestsUrl = "/api/"
    buffer.conn = this;
  }

  EstablishConnection(){
    // return this.http.get(this.requestsUrl+"pages?type=establish",{responseType:'text'});
  }
  
  TryToLogin(forms:LoginTemplate):Observable<HttpResponse<UserInformation>>{
    try{
    return this.http.post<UserInformation>(this.requestsUrl+"login",JSON.stringify(forms),{observe:'response', headers:this.jsonHeader});
    } catch(error){
      return null;
    }
  }

  TryToRegister(forms:RegisterTemplate):Observable<HttpResponse<string>>{
    return this.http.post(this.requestsUrl+"register",JSON.stringify(forms),{observe:'response',responseType: 'text',headers:this.jsonHeader});
  }

  TryToCreateService(dia:CreateServiceDialogComponent):Observable<HttpResponse<string>>{
    const x = new ServiceInformation();
    x.serviceName = dia.name;
    x.description = dia.description;
    x.costPerHour = dia.cost;
    x.category = dia.cat;
    x.modality = dia.mod;
    x.availableDays = dia.availableDays;
    x.availableFroms = dia.availableFroms;
    x.availableTos = dia.availableTos;
    for(let a=0;a<=6;a++){
      if(x.availableDays[a]){
        x.availableFroms[a] += ":00";
        x.availableTos[a] += ":00";
      }
    }
    return this.http.post(this.requestsUrl+"createService?id="+this.buffer.userInfo.userId,JSON.stringify(x),{observe:'response',responseType: 'text',headers:this.jsonHeader});
  }
  
  TryToUpdateService(info:ServiceInformation):Observable<HttpResponse<string>>{
    info.providerId = this.buffer.userInfo.userId;
    return this.http.post(this.requestsUrl+"updateService",JSON.stringify(info),{observe:'response',responseType: 'text',headers:this.jsonHeader});
  }

  TryToUpdateServicePicture(image:string,id:number):Observable<HttpResponse<string>>{
    return this.http.post(this.requestsUrl+"imageUpdate?type=service&id="+id+"&idProvider="+this.buffer.userInfo.userId,base64ToFile(image),{observe:'response',responseType: 'text'});
  }

  TryToUpdateUserPicture(dia:EditUserDialogComponent, id:number):Observable<HttpResponse<string>>{
    return this.http.post(this.requestsUrl+"imageUpdate?type=user&id="+id,base64ToFile(dia.croppedImage),{observe:'response',responseType: 'text'});
  }

  TryToUpdateUserName(dia:EditUserDialogComponent):Observable<HttpResponse<string>>{
    return this.http.post(this.requestsUrl+"updateName?id="+this.buffer.userInfo.userId,dia.newName,{observe:'response',responseType: 'text'});
  }

  TryToScheduleService(dia:ScheduleServiceDialogComponent):Observable<HttpResponse<string>>{
    const x = new ClientServiceInteraction();
    x.templateId = dia.buffer.lastService.templateId;
    x.service = this.buffer.lastService;
    x.clientId = this.buffer.userInfo.userId;
    x.cost = dia.cost;
    x.hasFinished = false;
    x.isAccepted = false;
    x.startDate = Utils.DateToSqlString(dia.selected);
    x.endDate = x.startDate;
    console.log(x.startDate);
    x.startTime = dia.startHour.substring(0,2)+":"+dia.startHour.substring(3,5)+":00";
    console.log(x.startTime);
    x.endTime = dia.endHour.substring(0,2)+":"+dia.endHour.substring(3,5)+":00";
    console.log(x.endTime);

    return this.http.post(this.requestsUrl+"scheduleService",JSON.stringify(x),{observe:'response',responseType: 'text',headers:this.jsonHeader});
  }

  ReloadUser():Observable<UserInformation>{
    return null;
    return this.http.get<UserInformation>(this.requestsUrl+"personal?type=reload");
  }

  GetAreas():Observable<GenericInformation[]>{
    return this.http.get<GenericInformation[]>(this.requestsUrl+"info?type=request&category=areas");
  }
  GetModalities():Observable<GenericInformation[]>{
    return this.http.get<GenericInformation[]>(this.requestsUrl+"info?type=request&category=mod");
  }
  GetCategories():Observable<GenericInformation[]>{
    return this.http.get<GenericInformation[]>(this.requestsUrl+"info?type=request&category=cat");
  }

  GetUser(id:string):Observable<UserInformation>{
    try{
    return this.http.get<UserInformation>(this.requestsUrl+"getUser?id="+id);
    } catch (error){
      console.log(error);
      return null;
    }
  }

  GetService(id:string):Observable<ServiceInformation>{
    try{
    return this.http.get<ServiceInformation>(this.requestsUrl+"getService?id="+id);
    } catch (error){
      console.log(error)
      return null;
    }
  }

  GetServiceList(id:number):Observable<ServiceInformation[]>{
    return this.http.get<ServiceInformation[]>(this.requestsUrl+"getAllServices?id="+id);
  }

  GetTargetPage():Observable<string>{
    return null;
    return this.http.get(this.requestsUrl+"pages?type=target",{responseType: 'text'});
  }

  GetSchedule():Observable<ServiceSchedule>{
    return this.http.get<ServiceSchedule>(this.requestsUrl+"getAgenda?id="+this.buffer.userInfo.userId);
  }

  GetUserServiceRequests():Observable<ClientServiceInteraction[]>{
    return this.http.get<ClientServiceInteraction[]>(this.requestsUrl+"getUserRequests?id="+this.buffer.userInfo.userId);
  }

  SetLastPage(currentPage:string):Observable<HttpResponse<string>>{
    return null;
    console.log("CHAMADO DE: " +currentPage)
    return this.http.post(this.requestsUrl+"pages?type=target",currentPage,{observe:'response',responseType: 'text'});
  }

  PrepareRefresh():Observable<HttpResponse<string>>{
    return null;
    return this.http.get(this.requestsUrl+"pages?type=refresh",{observe:'response',responseType: 'text'});
  }

  AcceptRequest(req:ClientServiceInteraction):Observable<HttpResponse<string>>{
    return this.http.get(this.requestsUrl+"answerRequest?type=accept&id="+req.id+"&idProvider="+this.buffer.userInfo.userId,{observe:'response',responseType: 'text'});
  }

  DenyRequest(req:ClientServiceInteraction):Observable<HttpResponse<string>>{
    return this.http.get(this.requestsUrl+"answerRequest?type=deny&id="+req.id+"&idProvider="+this.buffer.userInfo.userId,{observe:'response',responseType: 'text'});
  }

  CancelRequest(id:number):Observable<HttpResponse<string>>{
    const x = this.http.get(this.requestsUrl+"cancelRequest?id="+id,{observe:'response',responseType: 'text'});
    return x;
  }

  GetAnotherBundle(alreadyHas:number[]):Observable<ServiceBundle>{
    return this.http.post<ServiceBundle>(this.requestsUrl+"getAnotherBundle",JSON.stringify(alreadyHas),{headers:this.jsonHeader})
  }
  
}
