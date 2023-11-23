import { Component, Input } from '@angular/core';
import { ClientServiceInteraction } from 'src/clientServiceInteraction';
import { Utils } from 'src/utils';

@Component({
  selector: 'app-instance-for-provider-card',
  templateUrl: './instance-for-provider-card.component.html',
  styleUrls: ['./instance-for-provider-card.component.scss']
})
export class InstanceForProviderCardComponent {
  @Input() request:ClientServiceInteraction;
  altUrl = Utils.altUrl;
}
