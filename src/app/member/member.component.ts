import { Component, OnInit } from '@angular/core';
import { GLOBAL } from '../app-config';
import { member } from 'src/modeles/member';
import { MemberService } from 'src/services/member.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {
constructor(private MS:MemberService , private dialog:MatDialog ){}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

dataSource:member[]=this.MS.tab;
displayedColumns: string[] = ['ID', 'CIN', 'Name','Type','CV', 'CreatedDate','action'];


handleButtonClick(id: string): void {
  //1.lancer la boite
  let dialogRef = this.dialog.open(ConfirmDialogComponent, {
    height: '200px',
    width: '350px',
  }); 
  dialogRef.afterClosed().subscribe((X)=>
  {if (X)
    {   this.MS.deleteMemberById(id).subscribe(() => {
      this.fetch();
    });}
  })
  //2.attendre le resultat
  //3.lancer deleteMemberById(id)
  // this.MS.deleteMemberById(id).subscribe(() => {
  //   this.fetch();
  // });
  //-----
  // this.MS.deleteMemberById(id).subscribe(() => {
  //   this.dataSource.data=this.MS.tab;
  // });
}
fetch(): void {
  this.MS.getAllMembers().subscribe((tab) => {
    this.dataSource = tab;
  });
}
}