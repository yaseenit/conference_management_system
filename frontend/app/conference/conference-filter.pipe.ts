import {PipeTransform,Pipe} from 'angular2/core';
import {ConferenceModel} from '../service/app.interface';
@Pipe(
    {
name:'conferenceFilter'
    }
)
export class ConferenceFilterPipe implements PipeTransform
{
transform(value :ConferenceModel[],args:string[]) :ConferenceModel[]{

    let filter :string =args[0] ?args[0] : null;

return filter ? value.filter((con : ConferenceModel) =>
con.authors.indexOf(filter) !=-1) : value;
}
}