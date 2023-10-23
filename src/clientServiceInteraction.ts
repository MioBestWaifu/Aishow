import { ServiceInformation } from "./serviceInformation";
import { UserInformation } from "./userInformation";
export class ClientServiceInteraction{
    isAccepted:boolean; hasFinished:boolean; provider:boolean;
    id:number;
    startDate:string; endDate:string;
    startTime:string; endTime:string;
    cost:number;
    client:UserInformation; service:ServiceInformation;
} 