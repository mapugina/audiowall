import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { InstrumentComponent } from './instrument/instrument.component';
import { OrchestraComponent } from './orchestra/orchestra.component';

@NgModule({
  declarations: [
    AppComponent,
    InstrumentComponent,
    OrchestraComponent,
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
