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
      this.assignmentDate = new Date(data.assignmentDate)?.toInputDateString();
  }
}