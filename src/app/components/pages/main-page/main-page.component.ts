import { Component, OnDestroy, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { BufferserviceService } from 'src/app/services/bufferservice.service';
import { ServerConnectionService } from 'src/app/services/server-connection.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit{
 test:string = "TESTE";

 constructor(public buffer:BufferserviceService, private conn:ServerConnectionService){}

 async ngOnInit(){
  if (this.buffer.userInfo == null){
    ////this.buffer.userInfo = await firstValueFrom(this.conn.ReloadUser());
  }
  
  await this.buffer.getMoreBundles(3);
  }

  async evaluateScroll(){
    //console.log("Called evaluate scroll");
    const listContainer = document.getElementById('overList');
    const myList = document.getElementById('list');
      // Calculate the scroll position
    const scrollTop = listContainer.scrollTop;
    const containerHeight = listContainer.clientHeight;
    const listHeight = myList.clientHeight;

      // Check if we've reached the end of the list
    if (scrollTop + containerHeight >= listHeight) {
      //console.log(scrollTop);
      //console.log(containerHeight);
      //console.log(listHeight);
      //console.log('Scrolled to the end of the list');
      await this.buffer.getMoreBundles(2);
    }
  }

  async getMoreBundles(){
    //await this.buffer.getMoreBundles(2);
  }

}
