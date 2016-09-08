import {Injectable} from 'angular2/core';
import {Http, Response, URLSearchParams, Jsonp, ConnectionBackend} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {Router} from 'angular2/router';
import { ContentHeaders, ContentHeaderOnlyToken, ContentHeadersWithoutToken} from './headers';
import {IPaper, ICountry, IUser, Paper, User, IReview, Chair, ITask, Review,IChart} from "./app.interface";
import {FileService} from './file.service';
import {ConferenceModel} from './app.interface';
@Injectable()
export class AppService {

  private _rootUrl = "http://myremoteserverwg117.ddns.net:3000/";
  private _apiUrl = this._rootUrl + "api/v1/";
  private _taskUrl = this._apiUrl + "chair/tasks/";
  // private _inviteUrl = this._apiUrl + "/addAuthor/";
  //private _paperUrl=this._apiUrl+'submissions/';

  private _paperUrl = this._apiUrl + 'submissions/';
  
  private _profileUrl = this._apiUrl + 'profile/';
  private _uploadUrl = this._apiUrl + 'submissions/';
  private _conferenceUrl = this._apiUrl + "conference/";
  private _chairConferenceUrl = this._apiUrl + "chair/conference/";
  private _userLogInUrl = this._rootUrl + "login";
  private _getFileUrl = this._rootUrl + "api/v1/download/";
  private _signupUrl = this._rootUrl + "register";
  private _isRegisterUrl = this._rootUrl + "isRegister";
  private _responseCode: any;
  private static _base64_data: string = "";
  private _reportUrl = this._apiUrl + 'report/';
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
    return this._http.get(this._paperUrl + id, { headers: ContentHeaders })
      .map((response: Response) => <any>response.json())
      .do(data => console.log("All:" + JSON.stringify(data)))
      .catch(this.handleError);
  }
  

  getAllReview(conferenceId: string,submissionId:string): Observable<Review[]> {
    
    return this._http.get(this._apiUrl + conferenceId + "/chair/review/"+submissionId, { headers: ContentHeaders })
      .map((response: Response) => <Review[]>response.json())
      .do(data => console.log("All:" + JSON.stringify(data)))
      .catch(this.handleError);
  }
  

  getUserConference(): Observable<ITask[]> {
    return this._http.get(this._profileUrl, { headers: ContentHeaders })
      .map((response: Response) => <ITask[]>response.json())
      .do(data => console.log("All:" + JSON.stringify(data)))
      .catch(this.handleError);
  }
  getAllConference(): Observable<ConferenceModel[]> {
    return this._http.get(this._conferenceUrl, { headers: ContentHeaders })
      .map((response: Response) => <ConferenceModel[]>response.json())
      .do(data => console.log("All:" + JSON.stringify(data)))
      .catch(this.handleError);
  }
  getConferenceSubmission(conferenceId: string): Observable<IPaper[]> {
    return this._http.get(this._apiUrl + conferenceId + "/chair/submissions", { headers: ContentHeaders })
      .map((response: Response) => <IPaper[]>response.json())
      .do(data => console.log("All:" + JSON.stringify(data)))
      .catch(this.handleError);
  }
  getFiles(generatedFileName: string, fileName: string) {
    let req = new XMLHttpRequest();
    req.open('get', this._getFileUrl + generatedFileName);
    req.setRequestHeader('x-access-token', localStorage.getItem("token"));
    req.responseType = "arraybuffer";
    req.onreadystatechange = function () {
      if (req.readyState == 4 && req.status == 200) {
        // observer.next(req.response);
        //  observer.complete();
        var blob = new Blob([this.response], { type: "application/octet-stream" });
        saveAs(blob, fileName);
      }
    };
    req.send();

  }
    getReview(conferenceId: string,submissionId:string): Observable<Review> {
    return this._http.get(this._apiUrl + conferenceId + "/review/"+submissionId, { headers: ContentHeaders })
      .map((response: Response) => <Review>response.json())
      .do(data => console.log("All:" + JSON.stringify(data)))
      .catch(this.handleError);
  }

  submitReview(review: Review,flag:number) {
    let expertise: number = review.expertise;
    let overallEvaluation: number = review.overallEvaluation;
    let summary: string = review.summary;
    let strongPoints: string = review.strongPoints;
    let weakPoints: string = review.weakPoints;
    let detailedComments: string = review.detailedComments;
    let conferenceId: string = review.conferenceId;
    let submissionId: string = review.submissionId;
       let body;
    console.log(body);
   // /api/v1/:conferenceId/review/edit
     let action="create";
     if(flag==1)
     {
      action="edit";
      let _id=review._id;
     body = JSON.stringify({ expertise, overallEvaluation, summary, strongPoints, weakPoints, detailedComments, conferenceId, submissionId ,_id});

     }
     else
          body = JSON.stringify({ expertise, overallEvaluation, summary, strongPoints, weakPoints, detailedComments, conferenceId, submissionId });


    return this._http.post(this._apiUrl+review.conferenceId+"/review/"+action, body, { headers: ContentHeaders })
      .map((response: Response) => <IPaper>response.json())
      .do(data => console.log("All:" + JSON.stringify(data)))
      .catch(this.handleError);

  }
  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || error);
  }

  assignReviewers(username: string, submissionId: string, conferenceId: string): Observable<IPaper> {
    let body = JSON.stringify({ username, submissionId });
    console.log(body);
    return this._http.post(this._apiUrl + conferenceId + "/chair/addReviewer", body, { headers: ContentHeaders })
      .map((response: Response) => <IPaper>response.json())
      .do(data => console.log("All:" + JSON.stringify(data)))
      .catch(this.handleError);
  }
  removeReviewers(username: string, submissionId: string, conferenceId: string): Observable<IPaper> {
    let body = JSON.stringify({ username, submissionId });
    console.log(body);
    return this._http.post(this._apiUrl + conferenceId + "/chair/removeReviewer", body, { headers: ContentHeaders })
      .map((response: Response) => <IPaper>response.json())
      .do(data => console.log("All:" + JSON.stringify(data)))
      .catch(this.handleError);
  }
  inviteAuthor(username, conferencId): Observable<any> {
    let body = JSON.stringify({ username });
    console.log(body);
    return this._http.post(this._apiUrl + conferencId + "/chair/addAuthor", body, { headers: ContentHeaders })
      .map((response: Response) => <ConferenceModel>response.json())
      .do(data => console.log("All:" + JSON.stringify(data)))
      .catch(this.handleError);
  }
  removeAuthor(username, conferencId): Observable<any> {
    let body = JSON.stringify({ username });
    console.log(body);
    return this._http.post(this._apiUrl + conferencId + "/chair/removeAuthor", body, { headers: ContentHeaders })
      .map((response: Response) => <ConferenceModel>response.json())
      .do(data => console.log("All:" + JSON.stringify(data)))
      .catch(this.handleError);
  }
  getConferenceDetails(conferencId): Observable<ConferenceModel> {

    return this.getAllConference()
            .map((conf: ConferenceModel[]) => conf.find(p => p._id == conferencId));
   
  }
  paperSubmission(_paper: Paper, attFile) {
    let result = 0;
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
      let conferenceId = _paper.conferenceId;
      let body = JSON.stringify({ title, abstract, authorList, keywords, based64_data, size, fileName, conferenceId });
      // console.log(body);
      xx._http.post(xx._apiUrl + conferenceId + '/submissions/create', body, { headers: ContentHeaders })
        .do(data => console.log("All:" + JSON.stringify(data)))
        .subscribe(
        response => {
          result = 1;
        },

        error => {
          console.log(error.json().status);
          result = 0;

        }
        );

    });
    return result;
  }

  //Edit Paper submission
  paperSubmissionEdit(_paper: Paper): Observable<any> {

    let title = _paper.title;
    let authorList = _paper.authorList;
    let abstract = _paper.abstract;
    let keywords = _paper.keywords;
    let conferenceId = _paper.conferenceId;
    let _id = _paper.id;

    let body = JSON.stringify({ title, abstract, authorList, keywords, _id });
    // console.log(body);
    return this._http.post(this._apiUrl + conferenceId + '/submissions/edit', body, { headers: ContentHeaders })
      .map((response: Response) => <any>response.json())
      .do(data => console.log("All:" + JSON.stringify(data)))
      .catch(this.handleError);
  }
  //

  submissionUpdateStatus(status: string, _id: string, conferenceId: string): Observable<any> {
    let body = JSON.stringify({ status, _id });
    // console.log(body);
    return this._http.post(this._apiUrl + conferenceId + '/submissions/editStatus', body, { headers: ContentHeaders })
      .map((response: Response) => <any>response.json())
      .do(data => console.log("All:" + JSON.stringify(data)))
      .catch(this.handleError);
  }

    editDeadline(deadline: Date, _id: string, conferenceId: string): Observable<any> {
    let body = JSON.stringify({ deadline, _id });
    // console.log(body);
    return this._http.post(this._apiUrl + conferenceId + '/submissions/editStatus', body, { headers: ContentHeaders })
      .map((response: Response) => <any>response.json())
      .do(data => console.log("All:" + JSON.stringify(data)))
      .catch(this.handleError);
  }
 

 
  createConference(_conf: ConferenceModel): Observable<ConferenceModel> {
    let result;

    let title = _conf.title;
    let chair = localStorage.getItem("_id");
    let conferenceLocation = _conf.conferenceLocation;
    let startdate = _conf.startdate;
    let enddate = _conf.enddate;

    var body: string = JSON.stringify({ title, chair, conferenceLocation, enddate, startdate });
    console.log(body);
    return this._http.post(this._conferenceUrl, body, { headers: ContentHeaders })
      .map((response: Response) => <ConferenceModel>response.json())
      .do(data => console.log("All:" + data))
      .catch(this.handleError);
  }


  changePassword(newPassword, oldPassword): Observable<any> {

    let body = JSON.stringify({ oldPassword, newPassword });
    console.log(body);
    return this._http.post(this._profileUrl + "changePassword", body, { headers: ContentHeaders })
      .map((response: Response) => <any>response.json())
      .catch(this.handleError)
      .do(data => console.log("All:" + JSON.stringify(data)));

  }
  getUserProfile(): Observable<IUser> {
    let _token = this.getToken();
    let token = JSON.stringify({ _token });
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
  signup(_user: User): Observable<any> {
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
    return this._http.post(this._signupUrl, body, { headers: ContentHeadersWithoutToken })
      .map((response: Response) => <any>response.json())
      .do(data => console.log("All:" + JSON.stringify(data)))
      .catch(this.handleError);


  }
  isRegister(username: string) {
    let body = JSON.stringify({ username });
    return this._http.post(this._isRegisterUrl, body, { headers: ContentHeadersWithoutToken })
      .map((response: Response) => <any>response.json())
      .do(data => console.log("All:" + JSON.stringify(data)))
      .catch(this.handleError);
  }
  login(email, password): Observable<any[]> {
    let _logInCode = '';
    let username = email;
    let body = JSON.stringify({ username, password });
    return this._http.post(this._userLogInUrl, body, { headers: ContentHeadersWithoutToken })
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
      this._router.navigate(['Welcome']);
    }
  }

   checkCredentialsForSignUp() {
    
    if (localStorage.getItem("token") != null) {
      this._router.navigate(['Welcome']);
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
    localStorage.removeItem("_id");
    this._router.navigate(['Welcome']);
  }

  removeProfile():Observable<any>
  {
     return this._http.delete(this._profileUrl, { headers: ContentHeaders })
      .map((response: Response) => <any>response.json()).catch(this.handleError);
  }


  //chart starts
 	getStatusChart():Observable<any[]>{

     let  conferenceId="57d08000d34a22617c2a3a47";
       return this._http.get(this._apiUrl + conferenceId + "/chair/submissions", { headers: ContentHeaders })
       .map((response :Response)=> <any[]>response.json()
       .reduce(function(res, obj) {   
            if (!(obj.status in res)){                    
                res.__array.push(res[obj.status] = obj);
                res[obj.status].counter = 1;
              }
            else {
                res[obj.status].counter += 1;
            }
            return res;
        }, {array:[]})._array.sort(function(a,b) { return b.counter - a.counter; }))      
       .catch(this.handleError);          
    }

  getTopicChart():Observable<any[]>{
        return  this._http.get(this._paperUrl, { headers: ContentHeaders })
        .map((response :Response)=><any[]>response.json()
        .reduce(function(res, obj) {   
            if (!(obj.keywords in res)){                    
                res.__array.push(res[obj.keywords] = obj);
                res[obj.keywords].counter = 1;
              }
            else {
                res[obj.keywords].counter += 1;
            }
            return res;
        }, {array:[]})._array
                        .sort(function(a,b) { return b.counter - a.counter; }))
        .catch(this.handleError);          
    }

    getReportChart():Observable<any[]>{
      return  this._http.get(this._reportUrl, { headers: ContentHeaders })
      .map((response: Response) => <any[]>response.json())
      .catch(this.handleError);          
    }
  //chart ends
}