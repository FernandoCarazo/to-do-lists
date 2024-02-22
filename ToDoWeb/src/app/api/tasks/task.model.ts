import { Status } from "../status/status.model"; 
import { User } from "../users/user.model"; 

export class Task {
    public id!: string;
    public assignmentName!: string;
    public assignmentDescription!: string;
    public assignmentDate!: Date;
    public status!: Status;
    public user!: User;


    constructor(data: any = null) {
        //Técnica de deep copy para eliminar referencias de memoria
        data = data ? JSON.parse(JSON.stringify(data)) : {};

        this.id = data.id ? data.id : null;
        this.assignmentName = data.assignmentName ? data.assignmentName : null;
        this.assignmentDescription = data.assignmentDescription ? data.assignmentDescription : null;
        console.log('assignmentDate',this.assignmentDate);
        this.assignmentDate = data.assignmentDate ? new Date(data.assignmentDate) : null;
        this.status = new Status(data.status);
        this.user = new User(data.user);
    }
}

