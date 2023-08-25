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

@Injectable({
  providedIn: 'root'
})
export class ServerConnectionService {
  requestsUrl:string;
  loginHeader = new HttpHeaders();
  loginParams = new HttpParams();
  test:UserInformation;
  constructor(private http:HttpClient) {
    // const x = window.location.href;
    // const y = x.split("/");
    // console.log(y);
    // this.requestsUrl = y[0] + "//" +y[2] + ":80/"
    // console.log(this.requestsUrl);
    // this.loginParams = this.loginParams.append("type", "01");
  }

  EstablishConnection(){
    // return this.http.get(this.requestsUrl+"pages?type=establish",{responseType:'text'});
  }

  Buff():Observable<string>{
    return this.http.get<string>("api/Test");
  }
  
  TryToLogin(forms:LoginTemplate):Observable<HttpResponse<UserInformation>>{
    return null;
      try{
      return this.http.post<UserInformation>(this.requestsUrl+"login",JSON.stringify(forms),{observe:'response'});
      } catch(error){
        return null;
      }
  }

  TryToRegister(forms:RegisterTemplate):Observable<HttpResponse<string>>{
    return null;
    return this.http.post(this.requestsUrl+"registering",JSON.stringify(forms),{observe:'response',responseType: 'text'});
  }

  TryToCreateService(dia:CreateServiceDialogComponent):Observable<HttpResponse<string>>{
    return null;
    const x = new ServiceInformation();
    x.serviceName = dia.name;
    x.description = dia.description;
    x.costPerHour = dia.cost.toString();
    x.category = dia.cat;
    x.modality = dia.mod;
    x.availableDays = dia.availableDays;
    x.availableFroms = dia.availableFroms;
    x.availableTos = dia.availableTos;
    return this.http.post(this.requestsUrl+"services?type=create",JSON.stringify(x),{observe:'response',responseType: 'text'});
  }
  
  TryToUpdateService(info:ServiceInformation):Observable<HttpResponse<string>>{
    return null;
    return this.http.post(this.requestsUrl+"services?type=update",JSON.stringify(info),{observe:'response',responseType: 'text'});
  }

  TryToUpdateServicePicture(image:string,id:number):Observable<HttpResponse<string>>{
    return null;
    return this.http.post(this.requestsUrl+"services?type=imageUpdate&id="+id,base64ToFile(image),{observe:'response',responseType: 'text'});
  }

  TryToUpdateUserPicture(dia:EditUserDialogComponent):Observable<HttpResponse<string>>{
    return null;
    return this.http.post(this.requestsUrl+"personal?type=imageUpdate",base64ToFile(dia.croppedImage),{observe:'response',responseType: 'text'});
  }

  TryToUpdateUserName(dia:EditUserDialogComponent):Observable<HttpResponse<string>>{
    return null;
    return this.http.post(this.requestsUrl+"personal?type=nameUpdate",dia.newName,{observe:'response',responseType: 'text'});
  }

  TryToScheduleService(dia:ScheduleServiceDialogComponent):Observable<HttpResponse<string>>{
    return null;
    const x = new ClientServiceInteraction();
    x.templateId = dia.buffer.lastService.templateId;
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

    return this.http.post(this.requestsUrl+"services?type=schedule",JSON.stringify(x),{observe:'response',responseType: 'text'});
  }

  ReloadUser():Observable<UserInformation>{
    return null;
    return this.http.get<UserInformation>(this.requestsUrl+"personal?type=reload");
  }

  GetAreas():Observable<GenericInformation[]>{
    return null;
    return this.http.get<GenericInformation[]>(this.requestsUrl+"info?type=request&category=areas");
  }
  GetModalities():Observable<GenericInformation[]>{
    return null;
    return this.http.get<GenericInformation[]>(this.requestsUrl+"info?type=request&category=mod");
  }
  GetCategories():Observable<GenericInformation[]>{
    return null;
    return this.http.get<GenericInformation[]>(this.requestsUrl+"info?type=request&category=cat");
  }

  GetUser(id:string):Observable<UserInformation>{
    return null;
    try{
    return this.http.get<UserInformation>(this.requestsUrl+"users?type=request&id="+id);
    } catch (error){
      console.log(error);
      return null;
    }
  }

  GetService(id:string):Observable<ServiceInformation>{
    return null;
    try{
    return this.http.get<ServiceInformation>(this.requestsUrl+"services?type=request&id="+id);
    } catch (error){
      console.log(error)
      return null;
    }
  }

  GetServiceList(id:number):Observable<ServiceInformation[]>{
    return null;
    return this.http.get<ServiceInformation[]>(this.requestsUrl+"services?type=requestAll&id="+id);
  }

  GetTargetPage():Observable<string>{
    return null;
    return this.http.get(this.requestsUrl+"pages?type=target",{responseType: 'text'});
  }

  GetSchedule():Observable<ServiceSchedule>{
    return null;
    return this.http.get<ServiceSchedule>(this.requestsUrl+"services?type=requestSchedule");
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
    return null;
    return this.http.get(this.requestsUrl+"personal?type=accept&id="+req.id,{observe:'response',responseType: 'text'});
  }

  DenyRequest(req:ClientServiceInteraction):Observable<HttpResponse<string>>{
    return null;
    return this.http.get(this.requestsUrl+"personal?type=deny&id="+req.id,{observe:'response',responseType: 'text'});
  }
  
}
