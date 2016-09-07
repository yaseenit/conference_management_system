import { Headers } from 'angular2/http';

export const ContentHeaders = new Headers();
ContentHeaders.append('Accept', '*/*');
ContentHeaders.append('Content-Type', 'application/json');
ContentHeaders.append('x-access-token',localStorage.getItem("token"));


export const ContentHeaderOnlyToken=new Headers();
ContentHeaderOnlyToken.append('x-access-token',localStorage.getItem("token"));


export const ContentHeadersFile=new Headers();
ContentHeadersFile.append('x-access-token',localStorage.getItem("token"));
ContentHeaders.append('Accept', 'application/pdf;charset=UTF-8');
ContentHeaders.append('Content-Type', 'application/json');
ContentHeaders.append('Accept', 'application/json');



export const ContentHeadersWithoutToken = new Headers();
ContentHeadersWithoutToken.append('Accept', 'application/json');
ContentHeadersWithoutToken.append('Content-Type', 'application/json');
