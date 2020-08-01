import { Component, OnChanges, Input, Output ,EventEmitter} from '@angular/core';


@Component({
  selector: 'pm-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css'],
})
export class StarComponent {
    @Input() rating : number;
    starWidth : number;
    @Output() ratingClicked  : EventEmitter<string> = new EventEmitter<string>();


    onClick() {
        this.ratingClicked.emit(`The rating ${this.rating} clicked`);
    }

    ngOnChanges(): void {
        this.starWidth = this.rating * 75 / 5;
    }
}
