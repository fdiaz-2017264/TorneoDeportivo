import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(leagues:any, search:any){
    if(search == undefined){
      return leagues
    }else{
      return leagues.filter((league:any)=>{
        return league.tournament.includes(search)
      })
    }
  }

  

}
