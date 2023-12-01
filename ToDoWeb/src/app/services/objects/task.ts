import { status } from "./status";
import { user } from "./user";
export class task{

    id!:string;
    assignmentName!:string;
    assignmentDescription!:string;
    assignmentDate!:string;
    status!:status;
    person: user;


}