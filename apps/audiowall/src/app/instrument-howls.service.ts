import { Injectable } from '@angular/core';
import { Howl } from 'howler';
import { Instrument } from './Instrument';

type HowlMap = {
  [key in Instrument]: Howl;
};

/**
 * Handle synchronized playback of instruments
 */
@Injectable({
  providedIn: 'root',
})
export class InstrumentHowlsService {
  readonly quiet = 0.05;
  readonly loud = 1;

  readonly instruments: Instrument[] = [
    'bassoon',
    'cello',
    'clarinet',
    'flute',
    'horn',
    'oboe',
    'timpani',
    'trumpet',
    'viola',
    'violin',
  ];

  private tracks: HowlMap = this.instruments.reduce((a, c) => {
    // Make a map of howls
    a[c as Instrument] = new Howl({
      src: `/assets/figaro/${c}.mp3`,
      preload: true,
      volume: this.quiet,
    });
    return a;
  }, {} as HowlMap);

  _playing = false;

  get playing() {
    return this._playing;
  }

  /**
   * Promise that indicates that all mp3 files loaded
   */
  readonly allLoaded$ = Promise.all(
    [...Object.values(this.tracks)].map(
      (howl) =>
        new Promise((res, rej) => {
          howl.once('load', res);
          howl.once('loaderror', rej);
        })
    )
  );

  /**
   * Get the howl for a particular instrument
   * @param instrument
   * @returns
   */
  getHowlFor(instrument: Instrument): Howl | undefined {
    return this.tracks[instrument];
  }

  /**
   * If playing does nothing otherwise starts playback
   * @returns
   */
  playAll() {
    if (this.playing) return;

    for (const [_key, howl] of Object.entries(this.tracks)) {
      howl.play();
    }

    this._playing = true;
  }

  playAllFromStart() {
    // Clear exising play
    if (this.playing) {
      this.stopAll();
    }

    this.playAll();
  }

  stopAll() {
    for (const howl of Object.values(this.tracks)) {
      howl.stop();
    }

    this._playing = false;
  }

  isInstrumentLoud(instrument: Instrument) {
    return this.tracks[instrument].volume() === this.loud;
  }

  /**
   * Toggle loud volume on an instrument
   * @param instrument The instrument to change the volume for
   * @returns The new isLoud status
   */
  toggleLoudFor(instrument: Instrument) {
    const howl = this.tracks[instrument];
    const isLoud = howl?.volume() === this.loud; // Check current volume
    howl?.volume(isLoud ? this.quiet : this.loud); // Toggle the volume
    return howl?.volume() === this.loud; // Return new loud status
  }
}
