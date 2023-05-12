export interface data{
  States:Array<stat>;
  Cities:Array<city>;
  users:Array<user>;
}
export interface stat{
  StateID:number;
  StateName:string;
}
export interface city{
  CityID:number;
  Name:string;
  StateID:number;
}
export interface user{
  userName:string;
  password:string;
  role:string;
}
