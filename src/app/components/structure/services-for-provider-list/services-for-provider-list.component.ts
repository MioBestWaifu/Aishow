import { Component, Input } from '@angular/core';
import { ServiceInformation } from 'src/serviceInformation';

@Component({
  selector: 'app-services-for-provider-list',
  templateUrl: './services-for-provider-list.component.html',
  styleUrls: ['./services-for-provider-list.component.scss']
})
export class ServicesForProviderListComponent {
  @Input() services:ServiceInformation[];
}
