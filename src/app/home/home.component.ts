import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Component, Input, OnInit, SecurityContext, AfterViewInit, TemplateRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { animate, style, transition, trigger } from '@angular/animations';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger("fadeIn", [
      transition("void => *", [
        style({
          'opacity': 0,
          'width': 0,
          'transform': "translateX(200%)"
        }),
        animate(1000, style({
          'opacity': 1,
          'width': "100%",
          'transform': "translateX(0%)"
        }))

      ])
    ])
  ]

})
export class HomeComponent implements OnInit, AfterViewInit {
  mon = 0
  myForm = new FormGroup({
    name: new FormControl("")
  })
  config = {
    animated: true
  };
  rateing(i: number) {

    let html = "";
    let n = i * 100;
    for (let ind = 0; ind < Math.round(i) + 1; ind++) {
      if (n - 100 >= 0) {
        html += `<span style="cursor: default;" ><i  class="bi-heart-fill" style="
        position: relative;
    display: inline-block;
    font-size: 2.5rem;
    padding-right: 0.1rem;
    color: #d3d3d3;
    "><i  class="bi-heart-fill filled" style="width: 100%;color: red;overflow: hidden;position: absolute;top: 0;right: 2px;"></i></i></span>`
        n -= 100;
      } else {
        if (n != 0) {
          html += `<span style="cursor: default;"><i class="bi-heart-fill" style="
          position: relative;
      display: inline-block;
      font-size: 2.5rem;
      padding-right: 0.1rem;
      color: #d3d3d3;
      "><i class="bi-heart-fill filled" style="width: ${n}%;color: red;overflow: hidden;position: absolute;top: 0;right: 2px;"></i></i></span>`

          n = 0
        }
      }
    }

    return html
  }

  modalRef?: BsModalRef;
  openModal(template: TemplateRef<any>, b: any) {
    if (!localStorage.getItem("userName")) {
      this.modalRef = this.modalService.show(template, this.config);
    } else {
      this._snackBar.open('Hi 👋 <' + localStorage.getItem("userName") + '> Are you good 👍 !!', 'OK', {
        horizontalPosition: "center",
        verticalPosition: "bottom",
        duration: 7000
      })
    }
    if (+localStorage.getItem("monys")! >= 30&&localStorage.getItem("userName")!="ziz0 man") {
      b.style.disblay = "block"

    }
  }
  submit(template: TemplateRef<any>) {
    if (this.myForm.value.name) {
      localStorage.setItem("userName", this.myForm.value.name)
      this.modalService.hide();
      this._snackBar.open('Hi 👋 <' + localStorage.getItem("userName") + '> Are you good 👍 you are new !!', 'OK', {
        horizontalPosition: "center",
        verticalPosition: "bottom",
        duration: 7000
      })
    }

  }
  ngAfterViewInit() {
    setTimeout(() => {
      if (localStorage.getItem("storysi") == null) {
        localStorage.setItem("storysi", this.data.length + "")
        for (let i = 0; i < this.data.length; i++) {
          let e2 = document.getElementById(`${i}`)
          if (e2) {
            e2.innerHTML = e2.innerHTML + `<span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            NEW
            <span class="visually-hidden">unread messages</span>
          </span>`
          }
        }
      } else {
        if (localStorage.getItem("storysi") == this.data.length + "") {

        } else {
          let e = parseInt(localStorage.getItem("storysi") || "")
          for (let i = e; i < this.data.length; i++) {
            let e2 = document.getElementById(`${i}`)
            if (e2) {
              e2.innerHTML = e2.innerHTML + `<span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              NEW
              <span class="visually-hidden">unread storys</span>
            </span>`
            }

          }
          localStorage.setItem("storysi", this.data.length + "")
        }
      }
    }, 1000);
  }
  data = [{ name: "", image: "", dis: "", html: "", date: "", value: "", r: 5 }]
  constructor(private router: Router, private route: ActivatedRoute, private _snackBar: MatSnackBar, private modalService: BsModalService,
    private sanitizer: DomSanitizer, private http: HttpClient) {
    this.route.queryParamMap.subscribe(e => {
      if (e.get("id")) {
        this.router.navigate(["/story", e.get("id")])
      }
    })
    this.getJSON().subscribe(data => {
      this.data = data;
      this.data.map((e) => {
        e.r = (parseInt(e.value) / 10) / 2
        e.date = new Date(e.date).toLocaleDateString()
      })

    });
  }
  public getJSON(): Observable<any> {
    return this.http.get("../../assets/data.json");
  }
  safeHtml(htmlTextWithStyle: string) {
    return this.sanitizer.bypassSecurityTrustHtml(htmlTextWithStyle);
  }
  ngOnInit() {
    if (localStorage.getItem("hover")) {
      if(localStorage.getItem("hover")=="true"){

        window.document.body.classList.add("hover")
      }
    } else {
   
      
    }
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
       /*  this._snackBar.open('you didnot select your theme select it from settings icon up there!!', 'OK', {
          horizontalPosition: "right",
          verticalPosition: "bottom",
          duration: 7000
        }) */
      }, 2000);
    }
    if (localStorage.getItem("font")) {
      window.document.body.classList.add(localStorage.getItem("font") || "")
    } else {
      window.document.body.classList.add("f-1")
      
    }
  }
  openSnackBar() {
    this._snackBar.open('sorry you cannot rating!!', 'OK', {
      horizontalPosition: "right",
      verticalPosition: "bottom",
      duration: 5000
    })
  }
}

