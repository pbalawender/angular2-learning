import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { LoaderService } from '../../models/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent {
  public show = false;
  constructor(private loaderService: LoaderService, private changeDetector: ChangeDetectorRef) {
    this.loaderService.show.subscribe((newShow) => {
      this.show = newShow;
      this.changeDetector.markForCheck();
    });
  }
}
