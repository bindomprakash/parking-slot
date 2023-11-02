import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  mltclass: any;
  show_menu: boolean = false;
  showdropdown: boolean = false;
  admin: any;
  classToggled: boolean = true;
  @ViewChild('toggleButton') toggleButton!: ElementRef;
  @ViewChild('menu') menu!: ElementRef;

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private elem: ElementRef,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.renderer.listen('window', 'click',(e:Event)=>{
      /**
       * Only run when toggleButton is not clicked
       * If we don't check this, all clicks (even on the toggle button) gets into this
       * section which in the result we might never see the menu open!
       * And the menu itself is checked here, and it's where we check just outside of
       * the menu and button the condition abbove must close the menu
       */
     if(e.target !== this.toggleButton.nativeElement && e.target!==this.menu.nativeElement){
         this.show_menu=false;
     }
 });
  }

  getData: any;

  ngOnInit(): void {
    this.document.body.classList.add('superAdmin');
    this.admin = this.getData = localStorage.getItem('name');
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  isActive() {
    if ((this.classToggled = !this.classToggled)) {
      this.document.body.classList.add('superAdmin');
    } else {
      this.document.body.classList.remove('superAdmin');
    } 
  }
}
