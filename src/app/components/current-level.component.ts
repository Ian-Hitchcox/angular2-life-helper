import { 
    Component,
    Input,
    OnInit
} from '@angular/core';

// Classes
import { Level } from '../classes/level';

// Components
import { AppComponent } from './app.component';

// Services
import { ConfigService } from '../services/config-service';


const PERCENT_LIMITS = {
  RED: .25,
  YELLOW: .75,
  GREEN: 1
};


@Component({
  selector: 'current-level',
  template: `<tr className="current-level" *ngIf="level">
              
                <td>
                    <img width="50%" height="10%" class="level-image"src="{{level.imageUrl}}" />
                </td>

                <td>
                    <span class="padding-standard level-name capitalise">
                        {{level.name | titlecase}}
                    </span>
                </td>

                <td>
                    <span class="padding-standard">
                        
                        <span class="degrade-rate">
                        -{{level.degradeRate | percent}}
                        </span>                 
                        Per Hour
                    </span>
                </td>

                <td>
                    <span class="padding-standard current-percent">
                        {{level.currentPercent | percent:'2.2-2'}}
                    </span>                
                </td>

                <td>
                    <button mat-raised-button>Basic</button>
                    <input [(ngModel)]="addAmount" />
                    <button (click)="AddToLevel(level, addAmount)">+</button>
                </td>
            </tr>               
            
            `,
  styles: [`

    .current-level {
      margin-bottom: .5%;
    }

    td {
      width: 20%;
    }     

    .level-image {
      padding: 0 1.5%;
      margin: 0;
    }
    
    .level-name {
      text-align: center;
      font-size: 2em;
      font-weight: bold;
      margin-bottom: 5%;
      width: 20%;
    }

    .current-percent {        
      font-size: 2em;
      font-weight: bolder;
      width: 20%;
    }

    .degrade-rate {
      font-size: 1.75em;
      color: red;
      width: 20%;
    }

    button {      
      width: 20%;
    }
    
    `]
})
export class CurrentLevelComponent extends AppComponent implements OnInit  {   
  @Input() level: Level;

  addAmount: number = 15;

  constructor() {
      super();
  }

  ngOnInit() {
    this.CheckCurrentPercent(this.level);
  }

  CheckCurrentPercent(level: Level) {

    if (level.currentPercent <= PERCENT_LIMITS.RED) {
      
      this.UpdateImageUrl(level, 'red');

    } else if (level.currentPercent <= PERCENT_LIMITS.YELLOW) {
      
      this.UpdateImageUrl(level, 'yellow');

    } else {

      this.UpdateImageUrl(level, 'green');
      
    }
  }

  AddToLevel(level: Level, amount: number) {
    
    if (level && amount) {
        level.currentPercent = level.currentPercent === 1 ? level.currentPercent : level.currentPercent + (amount / 100) ;

        // Do not allow to go over 100%
        if (level.currentPercent > 1) {
            level.currentPercent = level.currentPercent - (level.currentPercent - 1);
        }
        
        this.CheckCurrentPercent(level);
        
        // Update our config
        let currentConfig = JSON.parse(ConfigService.GetConfig().toString());
        
        if (currentConfig) {
            
            let levelMap = new Map(currentConfig.levels);
                        
            levelMap.set(level.name, level.currentPercent);        

            currentConfig.levels = levelMap;

            ConfigService.SetConfig(currentConfig);
        }
    }
  }

  UpdateImageUrl(level: Level, newColour: string) {
    
    if (level && newColour) {
      
      // Colours in our file name are preceded by the last dash
      // Find last dash and give us what is after it.
      // Find the last . in the value returned above and grab the colour from just before it.
      let currentColour = this.level.imageUrl.split('-').pop().split('.').shift();      

      if (currentColour === newColour) {
        return;
      }

      this.level.imageUrl = this.level.imageUrl.replace(currentColour, newColour);
    
    } 
  }
}
