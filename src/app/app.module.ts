import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { ScannerModule } from './scanner/scanner.module'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, ScannerModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
