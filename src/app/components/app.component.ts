import { 
    Component,
    OnInit
} from '@angular/core';

// Classes
import { Level } from '../classes/Level';
import { HelpBlock } from '../classes/Help-Block';

// Paths
const IMAGE_FOLDER = './app/media/images/';

// Services
import { CookieService } from '../services/cookie-service';
import { ConfigService } from '../services/config-service';

// Media
import { LevelData } from '../media/data/level-data';
const LEVELS = LevelData;

let blocks: HelpBlock[] = [];

LEVELS.map((level, i) => {
  let block: HelpBlock = {
    name: level.name,
    details: level.details
  };

  blocks.push(block);
});

// Reference to all HelpBlock's
const HELP_BLOCKS: HelpBlock[] = blocks;

@Component({
  selector: 'my-app',
  template: `<div>
              
              <h1 class="title">Life Helper</h1>
              
              <section class="margin-standard">
                
                <p class="introduction-text">A tool to help you keep track of the essentials.</p>

              </section>

              <section class="margin-standard">
                
                <h2 class="subtitle padding-standard">Current levels</h2>
                
                <ul class="current-levels">
                  <li>
                    <current-level *ngFor="let level of levels" [level]="level"></current-level>                    
                  </li>
                </ul>
              </section>

              <section class="margin-standard">
                
                <h2 class="subtitle padding-standard padding-bottom-none">Level guide</h2>

                <ul>
                    <help-block *ngFor="let helpBlock of helpBlocks" [helpBlock]="helpBlock"></help-block>                  
                </ul>

              </section>
              
            </div>`,
    styles: [`

      .title {
        text-align: center;
        color: white;
      }

      .subtitle {
        margin: 0;
      }

      section {
        border: 1px solid white;
        border-radius: .75%;
      }

      .introduction-text {
        padding: 2.5%;
        font-size: 1.25em;
      }

      .current-levels {
        margin: 0 0 1.5% 0;
        padding: 0;
        list-style: none;
      }      

      help-block {
        display: inline-block;
        width: 33%;
      }

      .help-list {
        padding-bottom: 0;
      }
   
    `],
    providers: [CookieService, ConfigService]
})
export class AppComponent implements OnInit { 
  
    levels = LEVELS;    
    helpBlocks = HELP_BLOCKS;    
    config = {
        lastVisit: '',
        levels: new Map()
    }; 

    ngOnInit() {        

        // Attempt to get any previously saved config in the cookie
        let curConfig = ConfigService.GetConfig() || this.config;

        // Ensure we have valid json for our config
        curConfig = typeof curConfig === 'object' ? curConfig : JSON.parse(curConfig.toString());

        // If we already have a config in the cookie, use details from that.
        if (curConfig['levels'].length) {            
            
            // Turn the returned object from json into an ES6 map           
            curConfig['levels'] = new Map(curConfig['levels']);

            // Create a new map to hold the updated values            
            let newMap = new Map();

            // Apply the correct rate of degradation from our last visit.
            curConfig['levels'].forEach((value: number, name: string) => {                
                
                // Find same level in LEVELS array
                let levelIndex = this.levels.findIndex((level: Level, i: number): boolean => {
                    return level.name === name;
                });
                
                let updatedPercent = this.ApplyDegradationSinceLastVisit(this.levels[levelIndex].degradeRate, value, curConfig['lastVisit']);
                
                // Store new value in our temporary map
                newMap.set(name, updatedPercent);

                // Update its current percent
                this.levels[levelIndex].currentPercent = updatedPercent;
            });

            // Ensure our config has the new calculated values from the loop above
            curConfig['levels'] = newMap;

        // Otherwise grab defaults defined in the class
        } else {           

            this.levels.map((level) => {

                curConfig = this.ExecuteSetup(level.name, level.currentPercent, level.degradeRate, curConfig);
            })
        }        
                
        let today = new Date();
        let todayString = today.toUTCString();

        // Update last visited reference
        curConfig['lastVisit'] = todayString;           
        
        // Save our updated config in the cookie
        ConfigService.SetConfig(curConfig);
    }   
    
    // Default setup used when no cookie has been set
    ExecuteSetup(name: string, currentPercent: number, degradeRate: number, config: any) {
        
        currentPercent = this.ApplyDegradationSinceLastVisit(currentPercent, degradeRate, config.lastVisit);        
                
        config['levels'].set(name, currentPercent);

        return config;
    }

    // Ensures degradation of levels is applied since last visit.
    ApplyDegradationSinceLastVisit(degradeRate: number, currentPercent: number, lastVisit: string) {        
        
        let now = Date.now();
        let lastVisitDate = new Date(lastVisit).getTime();

        let secondsSinceLastVisit = (now - lastVisitDate) / 1000;
        let hoursSinceLastVisit = secondsSinceLastVisit / 3600;
        
        // If we have visited before, apply the calculation, otherwise set to 1.
        currentPercent = lastVisit ? currentPercent - (degradeRate * hoursSinceLastVisit) : 1;                

        // Dont let the percentage drop below 0
        if (currentPercent < 0) {
            currentPercent = 0;
        }

        return currentPercent;
    }    
    
}
