import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { member } from 'src/modeles/member';
import { MemberService } from 'src/services/member.service';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css']
})
export class MemberFormComponent implements OnInit {

  form!: FormGroup;
  MembreGlobal!: any;


  constructor(private MS:MemberService,private router:Router,private activatedRoute: ActivatedRoute){};
  
  initform():void{
    this.form=new FormGroup({
    cin:new FormControl(null,[Validators.required]),
    name:new FormControl(null,[Validators.required]),
    cv:new FormControl(null,[]),
    type:new FormControl(null,[Validators.required])
    })
  }
  
  //initialiser le form pour route /id/edit
  initForm2(member: member): void {
    this.form = new FormGroup({
      cin: new FormControl(member.cin, [Validators.required]),
      name: new FormControl(member.name, [Validators.required]),
      cv: new FormControl(member.cv, [Validators.required]),
      type: new FormControl(member.type, [Validators.required]),
    });
  }
  

  ngOnInit(): void {
    //if path contient id : je suis dans edit
    const idCourant = this.activatedRoute.snapshot.params['id'];
    if (!!idCourant) {
      //recuperer member by id
      this.MS.getMemberById(idCourant).subscribe((member) => {
        this.MembreGlobal = member;
        this.initForm2(member);
      }); ////
    }else{
      this.initform();
    }
}
  OnSub(): void{
    
    console.log(this.form.value);
    const member = { ...this.MembreGlobal, ...this.form.value };
    const member2 = {...member,id:member.id ?? Math.ceil(Math.random()*1000),createdDate:member.createdDate ?? new Date().toISOString().toString()};

    this.MS.OnSave(member).subscribe(()=>{this.router.navigate(['/members'])})
  }
}
