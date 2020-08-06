import { Directive, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
// import {} from '@types/googlemaps';
declare var google: any;
@Directive({
  selector: '[placeLookup]'
})
export class PlaceLookupDirective implements OnInit {
  @Output() onSelect: EventEmitter<any> = new EventEmitter();

  private element: HTMLInputElement;

  constructor(el: ElementRef) {
    this.element = el.nativeElement;
  }

  ngOnInit() {
    const autocomplete = new google.maps.places.Autocomplete(this.element, {
      
      componentRestrictions: {country: 'in'}
    });
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const place = autocomplete.getPlace();
      this.onSelect.emit(place);
    });
  }
}