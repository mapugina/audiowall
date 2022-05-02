import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Howl } from 'howler';
import { InstrumentHowlsService } from '../instrument-howls.service';
import { Instrument } from "../Instrument";

@Component({
  selector: 'audiowall-instrument',
  templateUrl: './instrument.component.html',
  styleUrls: ['./instrument.component.scss'],
})
export class InstrumentComponent {
  _instrument?: Instrument;
  isLoud = false;
  @Input() set instrument(val: Instrument | undefined) {
    this._instrument = val;
    if (val) {
      this.isLoud = this.instrumentHowlsService.isInstrumentLoud(val);
    }
  }

  @Input() height?: number;
  @Input() width?: number;

  constructor(public instrumentHowlsService: InstrumentHowlsService) {}

  toggle(instrument: Instrument | undefined) {
    if (!instrument) return; // Do nothing if there is no instrument

    // Toggle volume
    this.isLoud = this.instrumentHowlsService.toggleLoudFor(instrument);
    this.instrumentHowlsService.playAll(); // Start playback if it isn't going
  }
}
