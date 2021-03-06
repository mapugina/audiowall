import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { InstrumentComponent } from './instrument/instrument.component';
import { OrchestraComponent } from './orchestra/orchestra.component';
import { MaestrowallComponent } from './maestrowall/maestrowall.component';
import { RouterModule } from '@angular/router';
import { AttributionsComponent } from './attributions/attributions.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    InstrumentComponent,
    OrchestraComponent,
    MaestrowallComponent,
    AttributionsComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'wall',
      },
      {
        path: 'wall',
        component: MaestrowallComponent,
      },
      {
        path: 'attributions',
        component: AttributionsComponent
      },
    ]),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
