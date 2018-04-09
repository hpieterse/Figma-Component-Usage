import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { FigmaPlatformService } from './figma-platform.service';
import { HttpClient } from 'selenium-webdriver/http';
import { FigmaProjectComponent } from './figma-project/figma-project.component';
import { FigmaFileComponent } from './figma-file/figma-file.component';
import { FigmaFileDetailsComponent } from './figma-file-details/figma-file-details.component';
import { NodeNamePipe } from './node-name.pipe';

@NgModule({
  declarations: [
    AppComponent,
    FigmaProjectComponent,
    FigmaFileComponent,
    FigmaFileDetailsComponent,
    NodeNamePipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [FigmaPlatformService],
  bootstrap: [AppComponent]
})
export class AppModule { }
