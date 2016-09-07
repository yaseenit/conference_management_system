import { Headers } from 'angular2/http';

export const ContentHeaders = new Headers();
ContentHeaders.append('Accept', 'application/json');
ContentHeaders.append('Content-Type', 'application/json');
ContentHeaders.append('x-access-token',localStorage.getItem("token"));


export const ContentHeaderOnlyToken=new Headers();
ContentHeaderOnlyToken.append('x-access-token',localStorage.getItem("token"));


export const ContentHeadersWithoutToken = new Headers();
ContentHeadersWithoutToken.append('Accept', 'application/json');
ContentHeadersWithoutToken.append('Content-Type', 'application/json');