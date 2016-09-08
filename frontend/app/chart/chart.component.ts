import {Component} from 'angular2/core';
import {ConferenceModel, IChart} from '../service/app.interface';
import  {AppService} from '../service/app.service'
import {GoogleChart} from '../directives/google-chart.directive';

@Component({
    selector : 'chart-app',
    directives: [GoogleChart],
    templateUrl: 'app/chart/chart.component.html'
})


export class ChartComponent {

    errorMessage : string;
    pageTitle:string;
    conferences:ConferenceModel[]=[];
    conferenceChartData : IChart[];
    statusChartData : IChart[];
    topicChartData : IChart[];
    userChartData : IChart[];
    
    constructor(private _service :AppService)
    {
    }

    ngOnInit():void{
        this.pageTitle="Charts";

        this._service.getUserConference().subscribe(
            response =>{ 
                this.conferences=<ConferenceModel[]>response["conferences"];                 
            },
            error => this.errorMessage=<any>error
        );

        this._service.getStatusChart().subscribe(
            statusChartData => this.statusChartData=statusChartData,
            error => this.errorMessage=<any>error
        );

        this._service.getTopicChart().subscribe(
            topicChartData => this.topicChartData=topicChartData,
            error => this.errorMessage=<any>error
        );
		
		this._service.getReportChart().subscribe(
            userChartData => this.userChartData=userChartData,
            error => this.errorMessage=<any>error
        );

    }

    //timeline starts
    setTimelineChart(conferences : ConferenceModel[]):any[][]{
        var timelineChartData : (string | Date)[][];
        timelineChartData = [['Conference', 'Start', 'End']];
        for(var i = 0; i < conferences.length; i++)
        {
        timelineChartData[i+1] = [conferences[i].title, this.stringToDate(conferences[i].startdate.toString()), this.stringToDate(conferences[i].enddate.toString())] ;
        }
        return timelineChartData;
    }

    stringToDate(v: string): Date {
        let actualParsedDate = v ? new Date(v) : new Date();
        let normalizedParsedDate = new Date(actualParsedDate.getTime() + (actualParsedDate.getTimezoneOffset() * 60000));
        return normalizedParsedDate;
    }

    public timeline_ChartOptions  = {
        title: 'Conference Timeline',
        height: 180
    };
    //timeline ends

    //piechart starts
    setStatusChart(statusChartData : IChart[]):any[][]{    
        return [
              ['Status', 'Total'],
              ['Incompleted', this.getStatusCount(statusChartData,'incompleted')],
              ['Completed', this.getStatusCount(statusChartData,'completed')],
              ['Closed', this.getStatusCount(statusChartData,'closed')],
              ['Accepted', this.getStatusCount(statusChartData,'accepted')],
              ['Rejected', this.getStatusCount(statusChartData,'rejected')] ];
    }

    getStatusCount(statusChartData : IChart[],status : string):number{
        for(var i = 0; i < statusChartData.length; i++)
        {
            if (statusChartData[i].status === status){
                return statusChartData[i].counter;
            }else{return 0;}
        }
    }

    public pie_ChartOptions  = {
        title: 'My Submissions',
        width: 900,
        height: 500
    };
    //piechart ends

    //column chart starts
    setCountryChart(userChartData : IChart[]):any[][]{
        var columnChartData : (string | number)[][];
        columnChartData = [
            ['Country', 'Users']];

        for(var i = 0; i < userChartData.length; i++)
        {
            columnChartData[i+1] = [userChartData[i]._id.country, userChartData[i].count] ;
        }
        return columnChartData;
    }

    public column_ChartOptions = {
        title: 'Number of Users based on Countries',
        chartArea: {width: '50%'},
        hAxis: {
            title: 'Countries',           
            textStyle: {
                bold: true,
                fontSize: 14,
                color: '#848484'
            },
            titleTextStyle: {
                bold: true,
                fontSize: 14,
                color: '#848484'
            }
        },
        vAxis: {
            title: 'Users',
            minValue: 0,
            textStyle: {
                fontSize: 12,
                bold: true,
                color: '#4d4d4d'
            },
            titleTextStyle: {
                fontSize: 18,
                bold: true,
                color: '#4d4d4d'
            }
        }
    }
  //column chart ends

  //bar chart starts 
  setTopicChart(topicChartData : IChart[]):any[][]{
        var barChartData : (string | number)[][];
        barChartData = [['Topic', 'Papers']];
        for(var i = 0; i < topicChartData.length; i++)
        {
        barChartData[i+1] = [topicChartData[i].keywords.toString(), topicChartData[i].counter] ;
        }
        return barChartData;
    }
  
    public bar_ChartOptions = {
        title: 'Number of Papers based on Topics',
        chartArea: {width: '50%'},
        hAxis: {
            title: 'Papers',
            minValue: 0,
            textStyle: {
                bold: true,
                fontSize: 12,
                color: '#4d4d4d'
            },
            titleTextStyle: {
                bold: true,
                fontSize: 18,
                color: '#4d4d4d'
            }
        },
        vAxis: {
            title: 'Topics',
            textStyle: {
                fontSize: 14,
                bold: true,
                color: '#848484'
            },
            titleTextStyle: {
                fontSize: 14,
                bold: true,
                color: '#848484'
            }
        }
    };
    //bar chart ends
}