import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {KityPaper} from '../../projects/ngx-kity-lib/src/lib/kity-paper';
import {KityText} from '../../projects/ngx-kity-lib/src/lib/kity-text';
import {KityRect} from '../../projects/ngx-kity-lib/src/lib/kity-rect';
declare const kity: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('paper', {static: false}) paperEl: ElementRef;

  ngAfterViewInit(): void {
    debugger
    const paper = new kity.Paper('demo');
    paper
    const rect = paper.put(new kity.Rect());
    const text = paper.put(new kity.Text());

    text.setContent('hello kity!');
    text.fill('black');
    text.setX(100);
    text.setY(200);

    rect.setBox(text.getBoundaryBox().expand(-15, -10, 15, 10));
    rect.setRadius(5);
    rect.fill('blue');
  }


}
