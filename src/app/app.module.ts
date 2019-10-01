import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { ServiceWorkerModule } from '@angular/service-worker'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { ScannerModule } from './scanner/scanner.module'
import { environment } from '../environments/environment'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ScannerModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
