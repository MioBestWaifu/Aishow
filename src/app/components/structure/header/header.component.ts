import { Component } from '@angular/core';
import { Utils } from 'src/utils';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  imgUrl:string = Utils.imgUrl;
}
