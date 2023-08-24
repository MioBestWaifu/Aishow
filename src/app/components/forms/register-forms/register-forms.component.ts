import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { ServerConnectionService } from 'src/app/services/server-connection.service';
import { RegisterTemplate } from 'src/registerTemplate';
import { MissingInfoDialogComponent } from 'src/app/components/dialogs/missing-info-dialog/missing-info-dialog.component';
import { GenericInformation } from 'src/genericInformation';

@Component({
  selector: 'app-register-forms',
  templateUrl: './register-forms.component.html',
  styleUrls: ['./register-forms.component.css']
})
export class RegisterFormsComponent{
  AreaInfos:GenericInformation[];
  email:string;
  password:string;
  username:string;
  birthday:Date;
  gender:string;
  area:number;

  constructor(private conn:ServerConnectionService, private router:Router,private dialog:MatDialog){
    this.Init();
  }
  /* async ngOnInit(): Promise<void> {
    this.AreaInfos = await firstValueFrom(this.conn.GetAreas())
    //console.log(this.AreaInfos);
  } */

  async Init(){
    this.AreaInfos = await firstValueFrom(this.conn.GetAreas())
    //console.log(this.AreaInfos[2]);
  }


  async Submit(){
    //console.log(this)
    if (!this.email  || !this.password || !this.username || !this.birthday || !this.gender || !this.area){
      this.dialog.open(MissingInfoDialogComponent);
      return;
    }
    let registerTemplate = new RegisterTemplate(this.email,this.password,this.username,this.birthday,this.gender,this.area);
    const response = await firstValueFrom(this.conn.TryToRegister(registerTemplate));
    if (response.status == 200){
      this.email = "";
      this.password = "";
      this.username = "";
      this.birthday = new Date();
      this.router.navigateByUrl("/pages/login");
    } else {
      //Adicionar dialogo de registro falho
    }
  }
}
