import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from 'src/app/app-config';
import { article } from 'src/modeles/article';
import { MemberService } from './member.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  constructor(private MS:MemberService) {}
  count:number=0;
  tabArticle:article[]=GLOBAL._DB.Articles;
  tabMembersByArt:number[]=[];
  getNbArticlesByMembers():Observable<number[]>{
    for(let i =0;i<this.MS.tab.length;i++){
      this.count=0;
      for ( let j=0; j < this.tabArticle.length;j++){
        if(this.MS.tab[i].name==this.tabArticle[j].auteur){
          this.count++;
          this.tabMembersByArt.push(this.count);
        }
      }
    }
    return new Observable(observer=>{observer.next(this.tabMembersByArt)});
  }
}
