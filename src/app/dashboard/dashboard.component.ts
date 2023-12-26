import { Component } from '@angular/core';
import { MemberService } from 'src/services/member.service';
import { EventService } from 'src/services/event.service';
import { ArticleService } from 'src/services/article.service';
import { ChartDataset,ChartOptions } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  nb_Members:number=0;
  nb_Events:number=0;
  nb_Articles:number=0;
  nb_Tools:number=0;
  constructor(private MS:MemberService,private ES:EventService,private AS:ArticleService){
    this.nb_Members=this.MS.tab.length;
    this.nb_Events=this.ES.tabEvent.length;
    for (let i=0;i < this.nb_Members ;i++){
      this.chartLabels.push(this.MS.tab[i].name);
    }
  }
  tab:number[]=[];
  getNumber(){
    this.AS.getNbArticlesByMembers().subscribe((x)=>{this.tab=x});
    return this.tab;
  }
  chartData: ChartDataset[] = [
    {
      // ⤵️ Add these
      label: '$ in millions',
      data: this.getNumber(),
    }
  ];
  chartLabels: string[] = [];
  chartOptions: ChartOptions = {};
}
