import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TelefonoMaskDirective } from './directives/telefono-mask.directive';
import { ApiKeyInterceptor } from './interceptors/api-key.interceptor';
import { ExplanationOfReasonsComponent } from './components/explanation-of-reasons/explanation-of-reasons.component';
import { AcceptanceUseDataComponent } from './components/acceptance-use-data/acceptance-use-data.component';

@NgModule({
  declarations: [
    AppComponent,
    TelefonoMaskDirective,
    ExplanationOfReasonsComponent,
    AcceptanceUseDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: ApiKeyInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
