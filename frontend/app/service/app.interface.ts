export interface IPaper{
    title:string;
    id:string;
    status:string;
    fileId:string;
    authorList:PaperAuthor[];
    keywords:string[];
    submissionDate:Date;
    userId:string;
    abstract:string;
    deadline:Date;
    createdOn:string;
    generatedFileName:string;
    conferenceId:string;
    reviewers:string[];
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
    _id:string;
    constructor()
    {
        
    }
}

export interface ITask{
    taskType:string;
    taskDesc:string;
    assignedTo:string;
     submissionId:string;
    conferenceId:string;
}
export class Task implements ITask{
    taskType:string="";
    taskDesc:string="";
    assignedTo:string="";
    submissionId:string="";
    conferenceId:string="";
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
    id:string="";
    status:string="";
    author:string="";
    fileId:string="";
    authorList:PaperAuthor[]=[];
    keywords:string[]=[];
    submissionDate:Date=new Date();
    userId:string="";
    abstract:string="";
    deadline:Date=new Date();
    createdOn:string="";
    generatedFileName:string="";
    conferenceId:string="";
     reviewers:string[]=[];
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
    _id:string;
    expertise:number;
    overallEvaluation:number;
    summary:string;
    strongPoints:string;
    weakPoints:string;
    detailedComments:string;
    createdBy:string;
    conferenceId:string;
    submissionId:string;

}

export class Review implements IReview
{  
    _id:string="";
    expertise:number=0;
    overallEvaluation:number=0;
    summary:string="";
    strongPoints:string="";
    weakPoints:string="";
    detailedComments:string="";
    createdBy:string="";
    conferenceId:string="";
    submissionId:string="";
    constructor()
    {
        
  
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
   tasks:Task[];
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
      tasks:Task[]=[];

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