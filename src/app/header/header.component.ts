import { DomSanitizer } from '@angular/platform-browser';
import { Component, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor( private sanitizer: DomSanitizer){

  }
  safeHtml(htmlTextWithStyle: string) {
    return this.sanitizer.bypassSecurityTrustHtml(htmlTextWithStyle);
  }
  @Output() color2 = new EventEmitter()
  color = "black"
  font = "1"
 ardate: any =""
date: any=new Date().toLocaleDateString()
  Time: any=new Date().toLocaleTimeString()
  colors: string[] = ['blue', 'red', 'black', 'green', 'crimson', 'aqua', 'greenyellow', 'grey', 'white'];
  
  ngOnInit() {
    setInterval(()=>{
      this.Time=new Date().toLocaleTimeString()

    },100)
    let date = new Date();
let options:any = {year:'numeric', month:'long',day:'numeric'};

let format = new Intl.DateTimeFormat('ar-SA-u-nu-latn', options);
let datear=format.format(date)
let arr= datear.split(" ")
this.ardate=arr[3]+" "+arr[2]+" "+arr[1]+" / "+arr[0]+" "
    let theme;
    window.document.body.classList.remove(localStorage.getItem("theme") || "black")

    window.document.body.classList.remove("f-1")
    window.document.body.classList.remove("f-2")
    window.document.body.classList.remove("f-3")
    if (localStorage.getItem("theme")) {
      window.document.body.classList.add(localStorage.getItem("theme") || "")
    } else {
      window.document.body.classList.add("black")
      setTimeout(() => {

      }, 2000);
    }
    if (localStorage.getItem("font")) {
      window.document.body.classList.add(localStorage.getItem("font") || "")
    } else {
      window.document.body.classList.add("f-1")

    }
  }
  l() {
    window.document.body.classList.remove("blue")
    window.document.body.classList.remove("black")
    window.document.body.classList.remove("green")
    window.document.body.classList.remove("red")
    window.document.body.classList.remove("crimson")
    window.document.body.classList.remove("aqua")
    window.document.body.classList.remove("grey")
    window.document.body.classList.remove("white")
    window.document.body.classList.remove("greenyellow")
    setTimeout(() => {
      window.document.body.classList.add(this.color)
      localStorage.setItem("theme", this.color)
    }, 100);
  }
  f() {
    window.document.body.classList.remove("f-1")
    window.document.body.classList.remove("f-2")
    window.document.body.classList.remove("f-3")

    setTimeout(() => {
      window.document.body.classList.add("f-" + this.font)
      localStorage.setItem("font", "f-" + this.font)
    }, 100);
  }
  img(e: HTMLImageElement) {
    setInterval(() => {
      let t = new Date().getHours()
      if (t >= 1 && t < 8) {
        e.src = "https://img.icons8.com/external-flaticons-flat-flat-icons/200/external-morning-morning-flaticons-flat-flat-icons-4.png"
      }
      if (t >= 8 && t < 16) {
        e.src = "https://img.icons8.com/external-flaticons-flat-flat-icons/200/external-noon-morning-flaticons-flat-flat-icons-2.png"
      }
      if (t >= 16 && t < 20) {
        e.src = "https://img.icons8.com/fluency/4x/evening.png"
      }
      if (t >= 20 && t <= 24) {
        e.src = " https://img.icons8.com/plasticine/200/cloudy-nigh.png"
      }
    }, 1000)
  }
}

