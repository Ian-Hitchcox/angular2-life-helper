import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'mapValues'})
export class MapValuesPipe implements PipeTransform {
    transform(value: any, args?: any[]): Object[] {
        
        let returnArray: Array<object> = [];        

        value.forEach((entryVal: string, entryKey: string) => {
            returnArray.push({
                key: entryKey,
                val: entryVal
            });
        });

        return returnArray;
    }
}