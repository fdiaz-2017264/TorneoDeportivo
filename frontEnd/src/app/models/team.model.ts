export class TeamModel {
    constructor(
        public id: string,
        public name: string,
        public goals: number,
        public value: number,
        public league: string
    ) { }
}