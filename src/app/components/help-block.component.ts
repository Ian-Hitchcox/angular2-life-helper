import { 
    Component,
    Input,
    OnInit
} from '@angular/core';

import { HelpBlock } from '../classes/Help-Block';


@Component({
  selector: 'help-block',
  template: `
            <div class="help-block">
                
                <h3 class="padding-standard padding-bottom-none capitalise">
                    {{helpBlock.name}}
                </h3>

                <ul class="help-list">
                    <li *ngFor="let detail of helpBlock.details">
                        {{detail}}
                    </li>
                </ul>

            </div>
            `,
  styles: [`
    
    `]
})
export class HelpBlockComponent implements OnInit  {   
  @Input() helpBlock: HelpBlock;

  ngOnInit() {

      // Not yet implemented
    
  }

  
}
