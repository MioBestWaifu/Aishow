import { Component, Input} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BufferserviceService } from 'src/app/services/bufferservice.service';
import { EditUserDialogComponent } from '../../dialogs/edit-user-dialog/edit-user-dialog.component';
import { UserInformation } from 'src/userInformation';
import { Utils } from 'src/utils';

@Component({
  selector: 'app-user-basic-info',
  templateUrl: './user-basic-info.component.html',
  styleUrls: ['./user-basic-info.component.scss']
})
export class UserBasicInfoComponent{
  w = "3.5vw";
  altUrl = Utils.altUrl;
  @Input() user:UserInformation;
  constructor(public buffer:BufferserviceService, private dialog:MatDialog){
  }


}
