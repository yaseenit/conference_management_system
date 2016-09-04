export interface IPaper{
    title:string;
    id:number;
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
}
export class ConferenceModel {
    title: string="";
    chair: Chair=new Chair();
    startdate: Date=new Date();
    enddate:Date=new Date();
    conferenceLocation:string="";
    status: boolean=true;
    authors: any[]=[];
    tasks:any[]=[];
    constructor()
    {
        
    }
}
export class Chair{
    username:string="";
    _id:string="";
    constructor()
    {

    }
}

export class Paper implements IPaper
{
    title:string="";
    id:number=0;
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

    //for review
    review:Review[]=[];
    //
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

//for review
export interface IReview
{
    
    expertise:string;
    evaluation:string;
    summary:string;
    strongPoints:string;
    weakPoints:string;
    comments:string;

}

export class Review implements IReview
{
    
    expertise:string="";
    evaluation:string="";
    summary:string="";
    strongPoints:string="";
    weakPoints:string="";
    comments:string="";
    constructor(_expertise:string,_evaluation:string,_summary:string,_strongPoints:string,_weakPoints:string,_comments:string)
    {
        
        this.expertise=_expertise;
        this.evaluation=_evaluation;
        this.strongPoints=_strongPoints;
        this.weakPoints=_weakPoints;
        this.comments=_comments;
    }
}
//
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