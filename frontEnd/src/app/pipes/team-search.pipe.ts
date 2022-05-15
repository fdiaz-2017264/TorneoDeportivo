import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'teamSearch'
})
export class TeamSearchPipe implements PipeTransform {

  transform(teams:any, search:any){
    if(search == undefined){
      return teams
    }else{
      return teams.filter((team:any)=>{
        return team.league.includes(search)
      })
    }
  }

}
