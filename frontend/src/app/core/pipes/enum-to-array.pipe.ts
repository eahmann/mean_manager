import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumToArray'
})
export class EnumToArrayPipe implements PipeTransform {

  transform(value: any): object {
    return Object.keys(value).filter(e => isNaN(+e)).map(o => ({index: o, name: value[o]}));
  }

}

@Pipe({
  name: 'enumToArray1'
})
export class EnumToArrayPipe1 implements PipeTransform {

  transform(value: any): object {
    return Object.keys(value).filter(e => isNaN(+e)).map(o => ({index: o, name: value[o]}));
  }

}
