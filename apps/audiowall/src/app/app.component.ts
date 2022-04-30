import { Component } from '@angular/core';
import { Howl } from 'howler';

type Instrument = 'violin' | 'bassoon' | 'celli' | 'decca' | 'flute' | 'horn' | 'timpani' | 'viola' | 'clarinet' | 'decca' | 'oboe' | 'timpani' | 'viola' | 'contra';
type HowlMap = {
  [key in Instrument]: Howl;
};

// const files = {
//   '1st violin B_02.wav',
//   '2nd violin F_02.wav',
//   'celli F_01.wav',
//   'decca_02 C.wav',
//   'flute_02 L.wav',
//   'horn_02 R.wav',
//   'timpani_02 L.wav',
//   'viola B_02.wav',
//   '1st violin F_02.wav',
//   'bassoon_01.wav',
//   'clarinet_02.wav',
//   'decca_02 L.wav',
//   'flute_02 R.wav',
//   'oboe_02 L.wav',
//   'timpani_02 R.wav',
//   'viola F_02.wav',
//   '2nd violin B_02.wav',
//   'celli B_01.wav',
//   'contra basson_01.wav',
//   'decca_02 R.wav',
//   'horn_02 L.wav',
//   'oboe_02 R.wav',
//   'trumpet_02.wav',
// };

const files: {
  [key in Instrument]: string;
} = {
  violin: '1st violin F_02.wav',
  celli: 'celli F_01.wav',
  decca: 'decca_02 C.wav',
  flute: 'flute_02 L.wav',
  horn: 'horn_02 R.wav',
  timpani: 'timpani_02 L.wav',
  viola: 'viola F_02.wav',
  contra: 'contra basson_01.wav',
  oboe: 'oboe_02 R.wav',
  clarinet: 'clarinet_02.wav',
  bassoon: 'bassoon_01.wav'
}

@Component({
  selector: 'audiowall-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'audiowall';
  sounds = new Map<string, any>();
  tracks: HowlMap = Object.entries(files).reduce((a, [key, value]) => {
    const inst = key as Instrument;
    a[inst] = new Howl({
      src: `/assets/${value}`,
      preload: true,
      volume: 0
    })
    return a;
  }, {} as HowlMap);
  instruments: Instrument[] = Object.getOwnPropertyNames(
    this.tracks
  ) as Instrument[];
  playing = false;

  toggleVolume(instrument: Instrument) {
    if (!this.playing) {
      this.playAll();
      this.playing = true;
    }

    const inst = this.tracks[instrument];
    console.log('inst', inst, inst.volume());
    if (inst.volume() > 0) {
      inst.volume(0);
    } else {
      inst.volume(1);
    }
    console.log('inst after', inst, inst.volume());
  }

  playAll() {
    if (this.playing) {
      this.stopAll();
    }

    this.hearAll();
    // Clear exising play
    for (const [_key, howl] of Object.entries(this.tracks)) {
      howl.play();
    }
    this.playing = true;
  }

  hearAll() {
    for (const [_key, howl] of Object.entries(this.tracks)) {
      howl.volume(1);
    }
  }

  muteAll() {
    for (const [_key, howl] of Object.entries(this.tracks)) {
      howl.volume(0);
    }
  }

  stopAll() {
    for (const [_key, howl] of Object.entries(this.tracks)) {
      howl.volume(0);
    }
    this.playing = false;
  }
}
