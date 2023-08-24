import { ReviewInformation } from "./reviewInformation";

export class ServiceInformation{
    serviceName:string; description:string; providerName:string; providerUrl:string; providerImageUrl:string;
    shortServiceName:string;
    costPerHour:string;
    providerId:number;
    costInNumber:number;
    providerArea:string;
    averageScore:number;
    templateId:number;
    modality:number;category:number;
    modText:string; catText:string;
    availableDays:boolean[]; availableFroms:string[]; availableTos:string[];
    templateImageUrl:string;
    reviews:ReviewInformation[];
}