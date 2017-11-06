// Standard imports
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http'

// Components
import { AppComponent }  from './components/app.component';
import { CurrentLevelComponent }  from './components/current-level.component';
import { HelpBlockComponent }  from './components/help-block.component';

// Pipes
import { MapValuesPipe } from './pipes/map-values-pipe';

@NgModule({
  imports:  [ 
              BrowserModule,
              FormsModule,
              CommonModule,
              HttpModule
            ],
  declarations: [ 
    AppComponent,
    CurrentLevelComponent,
    HelpBlockComponent,
    MapValuesPipe
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
