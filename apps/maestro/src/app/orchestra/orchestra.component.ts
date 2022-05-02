import { Component } from '@angular/core';
import { InstrumentHowlsService } from '../instrument-howls.service';

@Component({
  selector: 'audiowall-orchestra',
  templateUrl: './orchestra.component.html',
  styleUrls: ['./orchestra.component.scss'],
})
export class OrchestraComponent {
  constructor(public instrumentHowlsService: InstrumentHowlsService) {}
}
