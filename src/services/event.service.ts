import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from 'src/app/app-config';
import { event } from 'src/modeles/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  tabEvent :event[]=GLOBAL._DB.Events;  


  constructor() { }
  eventToSave!: event;

  OnSave(event:any):Observable<void>{
    
    /*return this.httpClient.post<Member>(
      'http://localhost:9000/MEMBRE-SERVICE',
      member
    );*/

    this.eventToSave = {...event,id: event.id ?? Math.ceil(Math.random() * 10000),createdDate: event.createdDate ?? new Date().toISOString(),};
    this.tabEvent = [this.eventToSave,...this.tabEvent.filter((item) => item.id != this.eventToSave.id),];
    return new Observable((observer) => {observer.next();});
  }
  getEventById(idCourant: String): Observable<event> {
    /*return this.httpClient.get<Member>(
      'http://localhost:9000/MEMBRE-SERVICE/fullmember/'+idCourant,
    );*/

    return new Observable((observer) => {
      observer.next(this.tabEvent.find((item) => item.id == idCourant));
    });
  }

  deleteEventById(id: string): Observable<void> {
    //return this.httpClient.delete<void>('http://localhost:9000/MEMBRE-SERVICE/delete..'+id);

    this.tabEvent = this.tabEvent.filter((item) => item.id != id);
    return new Observable((observer) => {
      observer.next();
    });
  }

  getAllEvents(): Observable<event[]> {
    //return this.httpClient.get<Member[]>('http://localhost:9000/MEMBRE-SERVICE/members');

    return new Observable((observer) => {
      observer.next(this.tabEvent);
    });
  }
}