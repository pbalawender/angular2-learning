import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myDuration'
})
export class DurationPipe implements PipeTransform {
  public transform(value: number): string {
    const hours = Math.floor(value / 60);
    const minutes = value % 60;
    let result = '';
    if (hours) {
      result += `${hours}h`;
    }
    if (minutes) {
      result += ` ${minutes}min`;
    }

    return result.trim();
  }
}
