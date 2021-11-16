import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appDragdrop]'
})
export class DragdropDirective {

  @Output()fileDropped = new EventEmitter<any>();

  constructor() { }

  @HostListener('dragover', ['$event']) onDragOver(event:any) {
    event.preventDefault();
    event.stopPropagation();
  }

  @HostListener('dragleave', ['$event']) onDragLeave(event:any) {
    event.preventDefault();
    event.stopPropagation();
  }

  /**
   * @ngdoc method
   * @name onDrop 
   * @description logs out the current user
   * @param {any} event the event to look at for dropped files into the dropbox
   * @returns {void}
   */
  @HostListener('drop', ['$event']) public onDrop(event: any) {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer.files;
    if(files.length > 0) {
      this.fileDropped.emit(files);
    }
  }

}
