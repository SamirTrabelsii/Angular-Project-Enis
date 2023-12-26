import { Component, OnInit } from '@angular/core';
import { event } from 'src/modeles/event';
import { EventService } from 'src/services/event.service';
import { GLOBAL } from '../app-config';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  constructor(private ES:EventService , private dialog:MatDialog ){}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

dataSource:event[]=this.ES.tabEvent;

handleButtonClick(id: string): void {
  //1.lancer la boite
  let dialogRef = this.dialog.open(ConfirmDialogComponent, {
    height: '200px',
    width: '350px',
  }); 
  dialogRef.afterClosed().subscribe((X)=>
  {if (X)
    {   this.ES.deleteEventById(id).subscribe(() => {
      this.fetch();
    });}
  })
}
fetch(): void {
  this.ES.getAllEvents().subscribe((tabEvent) => {
    this.dataSource = tabEvent;
  });
}
displayedColumns: string[] = ['ID', 'title', 'dateDebut','dateFin','Lieu','action'];

}
