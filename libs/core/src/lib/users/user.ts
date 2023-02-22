export class User {
  constructor(
    public name:string,
    public title:string,
    public age:number,
    public subordinates:User[]
  ) {

  }
}