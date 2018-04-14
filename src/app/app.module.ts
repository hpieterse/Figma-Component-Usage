import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { FigmaPlatformService } from './figma-platform.service';
import { HttpClient } from 'selenium-webdriver/http';
import { FigmaFileDetailsComponent } from './figma-file-details/figma-file-details.component';
import { NodeNamePipe } from './node-name.pipe';
import { FigmaAuthenticationService } from './figma-authentication.service';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { ComponentAnalysisComponent } from './component-analysis/component-analysis.component';
import { FigmaNodeLocationComponent } from './figma-node-location/figma-node-location.component';

@NgModule({
  declarations: [
    AppComponent,
    FigmaFileDetailsComponent,
    NodeNamePipe,
    AuthenticateComponent,
    ComponentAnalysisComponent,
    FigmaNodeLocationComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    FigmaPlatformService,
    FigmaAuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
