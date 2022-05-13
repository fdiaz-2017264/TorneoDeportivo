export class LeagueModel{
    constructor(
        public id: string,
        public name: string,
        public description: string,
        public teams: string,
        public score: number,
        public user: string,
        public tournament: string,
    ){}
}