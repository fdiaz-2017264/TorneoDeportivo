export class TeamModel {
    constructor(
        public id: string,
        public name: string,
        public goals: number,
        public points: number,
        public league: string
    ) { }
}