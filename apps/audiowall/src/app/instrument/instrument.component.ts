import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'audiowall-instrument',
  templateUrl: './instrument.component.html',
  styleUrls: ['./instrument.component.scss'],
})
export class InstrumentComponent implements OnChanges {

  audio? : HTMLAudioElement =  new Audio();
  @Input() filepath?: string;


  private updateAudio() {
    if (this.audio) {
      this.audio.remove()
    }
  }

  // Lifecycle Hooks
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    throw new Error('Method not implemented.');
  }
}
