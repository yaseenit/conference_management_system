export interface IPaper{
    title:string;
    _id:string;
    status:string;
    fileId:string;
    authorList:PaperAuthor[];
    keywords:string[];
    submissionDate:Date;
    userId:string;
    abstract:string;
    deadline:string;
    createdOn:string;
    generatedFileName:string;
    fileName:string;
}
export class ConferenceModel {
    title: string="";
    chair: string=""
    startdate: Date=new Date();
    enddate:Date=new Date();
    conferenceLocation:string="";
    status: boolean=true;
    authors: any[]=[];
    tasks:any[]=[];
    constructor()
    {
        
    }
};

export class Paper implements IPaper
{
    title:string="";
    _id:string="";
    status:string="";
    author:string="";
    fileId:string="";
    authorList:PaperAuthor[]=[];
    keywords:string[]=[];
    submissionDate:Date=new Date();
    userId:string="";
    abstract:string="";
    deadline:string="";
    createdOn:string="";
    generatedFileName:string="";
    fileName:string="";
    constructor()
    {
        
    }
}
export interface IPaperAuthor
{
    givenName:string;
    familyName:string;
    email:string;
}
export class PaperAuthor implements IPaperAuthor
{
    givenName:string="";
    familyName:string="";
    email:string="";
    constructor(_givenName:string,_familyName:string,_email:string)
    {
        this.givenName=_givenName;
        this.familyName=_familyName;
        this.email=_email;
    }
  
}
export interface IUser
{
    username:string;
    password:string;
    id:number;
    givenName:string;
    familyName:string;
    address:string;
    city:string;
    state:string;
    zipCode:string;
    country:string;
   institute:string; 
}
export class User implements IUser
{ 
     username:string="";
    password:string="";
    id:number=0;
    givenName:string="";
    familyName:string="";
    address:string="";
    city:string="";
    state:string="";
    zipCode:string="";
    country:string="";
   institute:string=""; 
     constructor()
    {
        
    }
}


export interface ICountry
{
 woeid:string;
 name:string;
placeTypeName:string;

}

export interface IPlace
{
     woeid:string;
    name:string;
    placeTypeName:string;
}