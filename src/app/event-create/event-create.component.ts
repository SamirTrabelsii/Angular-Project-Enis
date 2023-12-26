import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { event } from 'src/modeles/event';
import { EventService } from 'src/services/event.service';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css']
})
export class EventCreateComponent {
  
  range!: FormGroup;
  EventGlobal! :any;

  initForm():void
  {
    this.range = new FormGroup({
      title:new FormControl(null,[Validators.required]),
      dateDebut: new FormControl<Date | null>(null),
      dateFin: new FormControl<Date | null>(null),
      lieu:new FormControl(null,[Validators.required]),

    });

  }

constructor(private ES:EventService,private router:Router,private activatedRoute: ActivatedRoute){};

//initialiser le form pour route /id/edit
initForm2(event:event):void{
  this.range = new FormGroup({
    dateDebut: new FormControl<Date | any>(new Date(event.dateDebut)),
    dateFin: new FormControl<Date | any>(new Date(event.dateFin)),
    title:new FormControl(event.title,[Validators.required]),
    lieu:new FormControl(event.lieu,[Validators.required])
  });
}

ngOnInit(): void {
  //if path contient id : je suis dans edit
  const idCourant = this.activatedRoute.snapshot.params['id'];
  if (!!idCourant) {
    //recuperer member by id
    this.ES.getEventById(idCourant).subscribe((event) => {
      this.EventGlobal = event;
      this.initForm2(event);
    }); ////
  }else{
    this.initForm();
  }
}
OnSub(): void{
  
  console.log(this.range.value);
  const event = { ...this.EventGlobal, ...this.range.value };
  const event2 = {...event,id:event.id ?? Math.ceil(Math.random()*1000)};

  this.ES.OnSave(event).subscribe(()=>{this.router.navigate(['/events'])})
}
}
