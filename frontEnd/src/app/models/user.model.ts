export class UserModel{
    constructor(
        public id:string, 
        public name:string,
        public username:string,
        public email:string,
        public password:string,
        public role:string
    ){}
}