import {Injectable} from 'angular2/core';
import {Http, Response, URLSearchParams, Jsonp, ConnectionBackend} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {Router} from 'angular2/router';
import { ContentHeaders, ContentHeaderOnlyToken } from './headers';
import {IPaper, ICountry, IUser, Paper, User, IReview,Chair} from "./app.interface";
import {FileService} from './file.service';
import {ConferenceModel} from './app.interface';
@Injectable()
export class AppService {

  private _apiUrl = "http://myremoteserverwg117.ddns.net:3000/api/v1/";
  private _taskUrl = this._apiUrl + "chair/tasks/";
 // private _inviteUrl = this._apiUrl + "conference/addAuthor/";
  //private _paperUrl=this._apiUrl+'submissions/';
  //for reviewer
private _paperUrl=this._apiUrl+'submissions/';
  private _reviewUrl = 'api/papers/paperwithreview.json';
  //
  private _profileUrl = this._apiUrl + 'profile/';
  private _uploadUrl = this._apiUrl + 'submissions/';
  private _conferenceUrl=this._apiUrl+"conference/";
  private _chairConferenceUrl=this._apiUrl+"chair/conference/";
  private _userLogInUrl = "http://myremoteserverwg117.ddns.net:3000/login";
  private _getFileUrl = "http://myremoteserverwg117.ddns.net:3000/api/v1/download/";
  private _signupUrl = "http://myremoteserverwg117.ddns.net:3000/register";
  private _responseCode: any;
  private static _base64_data: string = "";
  constructor(private _http: Http, private _router: Router, private jsonp: Jsonp) {

  }
  getPapers(): Observable<any[]> {
    return this._http.get(this._paperUrl, { headers: ContentHeaders })
      .map((response: Response) => <any[]>response.json())
      .do(data => console.log("All:" + JSON.stringify(data)))
      .catch(this.handleError);

  }
 getPaper(id: string): Observable<IPaper> {
        console.log(id);
    return  this._http.get(this._paperUrl+id, { headers: ContentHeaders })
       .map((response :Response)=> <any>response.json())
       .do(data => console.log("All:" +JSON.stringify(data)))       
       .catch(this.handleError);   
    }
  getUserConference(): Observable<IUser>
  {
       return this._http.get(this._profileUrl, { headers: ContentHeaders })
      .map((response: Response) => <IUser>response.json())
      .do(data => console.log("All:" + JSON.stringify(data)))
      .catch(this.handleError);
  }
  getFiles(generatedFileName:string,fileName:string){ 
         //  console.log('mmmm');

      //   console.log('mmmm');

  let req = new XMLHttpRequest();
  req.open('get',this._getFileUrl+generatedFileName);
req.setRequestHeader('x-access-token',localStorage.getItem("token"));
  req.responseType = "arraybuffer";
  req.onreadystatechange = function() {
    if (req.readyState == 4 && req.status == 200) {
     // observer.next(req.response);
    //  observer.complete();
       var blob = new Blob([this.response], {type: "application/octet-stream"});
        saveAs(blob, fileName);
    }
  };
  req.send();

}
 

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || error);
  }
  //  getPaper(id: number): Observable<IPaper> {
  //  return this.getPapers()
  //    .map((products: IPaper[]) => products.find(p => p.id === id));
  //  }

  assignReviewers(reviewer, submissionId): Observable<any[]> {
    let body = JSON.stringify({ reviewer, submissionId });

    return this._http.post(this._taskUrl, body, { headers: ContentHeaders })
      .do(data => console.log("All:" + JSON.stringify(data)))
      .catch(this.handleError);
  }

  inviteAuthor(username, conferencId): Observable<any[]> {
    let body = JSON.stringify({ username });
    console.log(body);
    return this._http.post(this._chairConferenceUrl+conferencId+"/addAuthor", body, { headers: ContentHeaders })
      .do(data => console.log("All:" + JSON.stringify(data)))
      .catch(this.handleError);
  }
  paperSubmission(_paper: Paper, attFile) {
    let result =0;
    let uploadedFile = attFile;
    console.log(uploadedFile[0]);
    let size = uploadedFile[0].size;
    let fileName = uploadedFile[0].name;
    let jsonBody;
    var reader = new FileReader();
    var ready = false;
    var xx = this;
    FileService.getFileByte(uploadedFile[0], function (based64_data) {
      let title = _paper.title;
      let authorList = _paper.authorList;
      let abstract = _paper.abstract;
      let keywords = _paper.keywords;
      let body = JSON.stringify({ title, abstract, authorList, keywords, based64_data, size, fileName });
      console.log(body);
       xx._http.post(xx._uploadUrl, body, { headers: ContentHeaders })
        .do(data => console.log("All:" + JSON.stringify(data)))
        .subscribe(
        response => {
          result =1;
        },

        error => {
          console.log(error.json().status);
                    result =0;

        }
        );

    });
    return result;
  }

//for reviewergetReview(id: number): Observable<IReview> {

 getReview(id: number): Observable<IReview> {

    return this.getPapers()
      .map((reviews: IReview[]) => reviews.find(p => p.id === id))//.do(data => console.log("All:" + JSON.stringify(data)));
  }

  getReviews(): Observable<IReview[]> {
    return this._http.get(this._reviewUrl)
      .map((response: Response) => <IReview[]>response.json())
      .do(data => console.log("All:" + JSON.stringify(data)))
      .catch(this.handleError);
  }

  addReview(id, expertise, evaluation, summary, strongPoints, weakPoints, comments) {
    // addReview(_review: any) {
    let body = JSON.stringify({ id, expertise, evaluation, summary, strongPoints, weakPoints, comments });
    console.log(body);
    this._http.post(this._reviewUrl, body, { headers: ContentHeaders })
      .subscribe(
      res => res.json()
        .catch(this.handleError));
  }
createConference(_conf:ConferenceModel):Observable<ConferenceModel>
   {
     let result;
    
     let title=_conf.title;
    // var chair:any=new Chair();
     //chair.username=this.getCurrentUserEmail();
     //chair._id=localStorage.getItem("_id");
     let chair=localStorage.getItem("_id");
     let conferenceLocation=_conf.conferenceLocation;
     let startdate=_conf.startdate;
     let enddate=_conf.enddate;

    var body:string = JSON.stringify({ title, chair ,conferenceLocation,enddate,startdate}); 
    console.log(body);
     return this._http.post(this._conferenceUrl,body, { headers: ContentHeaders })
      .map((response :Response)=> <ConferenceModel>response.json())
      .do(data => console.log("All:" +data ))
     .catch(this.handleError);
    
      
       }

  getReviewList() {
    let username = this.getCurrentUserEmail();
    let token = this.getToken();
    let body = JSON.stringify({ token, username });
    return this._http.post(this._reviewUrl, body, { headers: ContentHeaders })
      .map((response: Response) => <IPaper[]>response.json())
      .do(data => console.log("All:" + JSON.stringify(data)))
      .catch(this.handleError);
  }
  //


  changePassword(password, oldPassword) {

    let body = JSON.stringify({ oldPassword, password });
    this._http.post("", body, { headers: ContentHeaders })
      .do(data => console.log("All:" + JSON.stringify(data)))
      .subscribe(
      response => {
        //   this._router.navigate(['Welcome']);
      },
      error => {
        // alert(error.text());
        console.log(error.json().status);

      }
      );
  }

  getUserProfile(): Observable<IUser> {
    let _token = this.getToken();
    let token = JSON.stringify({_token});
    return this._http.get(this._profileUrl, { headers: ContentHeaders })
      .map((response: Response) => <IUser>response.json())
      .catch(this.handleError).do(data => console.log("All:" + JSON.stringify(data)));
  }
  updateProfile(_user: User): Observable<any[]> {
    let familyName = _user.familyName;
    let givenName = _user.givenName;
    let country = _user.country;
    let institute = _user.institute;
    let city = _user.city;
    let zipCode = _user.zipCode;
    let state = _user.state;
    let address = _user.address;
    let body = JSON.stringify({ familyName, givenName, institute, country, state, city, zipCode, address });

    return this._http.post(this._profileUrl, body, { headers: ContentHeaders })
      .map((response: Response) => <any[]>response.json())
      // .do(data => console.log("All:" +JSON.stringify(data)))
      .catch(this.handleError);

  }
  signup(_user: User): Observable<any[]> {
    let result;

    let username = _user.username;
    let password = _user.password;
    let familyName = _user.familyName;
    let givenName = _user.givenName;
    let country = _user.country;
    let institute = _user.institute;
    let city = _user.city;
    let zipCode = _user.zipCode;
    let state = _user.state;
    let address = _user.address;
    let body = JSON.stringify({ username, password, familyName, givenName, institute, country, state, city, zipCode, address });
    return this._http.post(this._signupUrl, body, { headers: ContentHeaders })
      .map((response: Response) => <any[]>response.json())
      // .do(data => console.log("All:" +JSON.stringify(data)))
      .catch(this.handleError);


  }

  login(email, password): Observable<any[]> {
    let _logInCode = '';
    let username = email;
    let body = JSON.stringify({ username, password });
    return this._http.post(this._userLogInUrl, body, { headers: ContentHeaders })
      .map((response: Response) => <any[]>response.json()).catch(this.handleError);

  }
  searchWiki(term: string) {
    var search = new URLSearchParams()
    search.set('action', 'opensearch');
    search.set('search', term);
    search.set('format', 'json');
    return this.jsonp.get('https://en.wikipedia.org/w/api.php?search=' + term + '&action=opensearch&format=json&callback=JSONP_CALLBACK')
      .map((request) => request.json()[1]);


  }
  checkCredentials() {
    if (localStorage.getItem("token") == null) {
      this._router.navigate(['LogIn']);
    }

  }

  isLog(): boolean {
    if (localStorage.getItem("token") == null)
      return false;
    else
      return true;
  }
  getCurrentUserEmail() {
    if (localStorage.getItem("token") != null)
      return localStorage.getItem("username");
    else
      return null;
  }
  getToken() {
    if (localStorage.getItem("token") != null)
      return localStorage.getItem("token");
    else
      return null;
  }
  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    this._router.navigate(['Welcome']);
  }
}