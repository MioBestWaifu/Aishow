import { ReviewInformation } from "./reviewInformation";
import { UserInformation } from "./userInformation";

export class ServiceInformation{
    serviceName:string; description:string;
    shortServiceName:string;
    costPerHour:number;
    averageScore:number;
    templateId:number;
    modality:number;category:number;
    modText:string; catText:string;
    availableDays:boolean[]; availableFroms:string[]; availableTos:string[];
    templateImageUrl:string;
    reviews:ReviewInformation[];
    provider:UserInformation;
}