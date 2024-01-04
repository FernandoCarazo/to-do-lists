import { Task } from "./task.model"; 

export class CreateUpdateTaskDTO {
    public readonly assignmentName: string;
    public readonly assignmentDescription: string;
    public readonly assignmentDate?: string;
    public readonly statusId?: string;

    constructor(data: Task) {
        //Convertimos la fecha a date string porque Angular fuerza
        //los objetos de fecha a convertirse a tiempo universal (UTC)
        //a la hora de hacer llamados de API, esencialmente cambiando la
        //hora guardada en la base de datos ya que nuestro sistema
        //no maneja conversiones de hora y sólo trabaja con hora local
        this.assignmentName = data.assignmentName;
        this.assignmentDescription = data.assignmentDescription;
        this.statusId = data.status.id;
        this.assignmentDate = data.assignmentDate ? this.toInputDateString(data.assignmentDate) : null;
    }

    toInputDateString(date: Date, withTime: boolean = true): string {
        if (date instanceof Date && !isNaN(date.getTime())) {
          let dateString = `${date.getFullYear()}-${this.pad(date.getMonth() + 1, 2)}-${this.pad(date.getDate(), 2)}`;
      
          if (withTime) {
            dateString += `T${this.pad(date.getHours(), 2)}:${this.pad(date.getMinutes(), 2)}:${this.pad(date.getSeconds(), 2)}.${date.getMilliseconds()}`;
          }
      
          return dateString;
        } else {
          console.error('Invalid date object:', date);
          return ''; // or throw an error, return a default value, etc.
        }
      }
      private pad(num: number, size: number): string {
        let s = num + '';
        while (s.length < size) s = '0' + s;
        return s;
      }

}