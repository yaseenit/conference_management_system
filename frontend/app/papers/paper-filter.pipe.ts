import {PipeTransform,Pipe} from 'angular2/core';
import {IPaper} from '../service/app.interface';
@Pipe(
    {
name:'paperFilter'
    }
)
export class PaperFilterPipe implements PipeTransform
{
transform(value :IPaper[],args:string[]) :IPaper[]{

    let filter :string =args[0] ?args[0].toLowerCase() : null;

return filter ? value.filter((paper : IPaper) =>
paper.title.toLocaleLowerCase().indexOf(filter) !=-1) : value;
}
}