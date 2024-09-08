import { Component, OnInit, TemplateRef, ViewEncapsulation } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup, Validators } from '@angular/forms';

// new EmojiPanel(
//   document.getElementById('example-2'), {
//   onClick: (e: any) => {
//     alert(e.index);
//     alert(e.unified);
//   }
// }
// );

interface user {
  name: string,
  image: string
}
import {
  MatSnackBar,
} from '@angular/material/snack-bar';
let users: user[]
let user: user
if (localStorage.getItem("data") !== null) {
  users = JSON.parse(window.localStorage.getItem("data") ?? "false");
}
else {
  window.localStorage.setItem("data", JSON.stringify([]));
  users = JSON.parse(window.localStorage.getItem("data") ?? "false");
}
interface post {
  title: string,
  text: string
}
let posts: post[]
let post: post
if (localStorage.getItem("posts") !== null) {
  posts = JSON.parse(window.localStorage.getItem("posts") ?? "false");
}
else {
  window.localStorage.setItem("posts", JSON.stringify([{ title: "hi", text: "hi" }]));
  posts = JSON.parse(window.localStorage.getItem("posts") ?? "false");
}
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddComponent implements OnInit {
  emojiUrl = "http://timetoknow.github.io/emoji-panel/dist/asset/sheet_emojione_64.png"
  v = "hi"
  val = ""
  infod = false
  loginForm = new FormGroup({
    name: new FormControl("", Validators.minLength(3)),
    password: new FormControl("", Validators.min(741852)),
  })
  oop(t: string) {
    this._snackBar.open(t, 'OK', {
      horizontalPosition: "center",
      verticalPosition: "top",
      duration: 20000
    })
    this.infod = true
  }
  oop2() {
    let name = localStorage.getItem("userName")
    if (!localStorage.getItem("userName")) {

      name = prompt("your name to get")
    }
    if (name && name.trim()) {
      localStorage.setItem("userName", name)
      let m = localStorage.getItem("monys") || 0
      localStorage.setItem("monys", "" + m + 10 + "")
      this._snackBar.open(`ok you get it userName:addgood-oizzo-${name} ,password:741852963`, 'OK', {
        horizontalPosition: "center",
        verticalPosition: "top",
        duration: 20000
      })
      this.infod = false
    } else {
      this.oop2()
    }

  }
  login(i: any) {
    let nam = /addgood-oizzo-[a-z]/.test(this.loginForm.value.name!);
    if (this.loginForm.touched) {
      if (nam && this.loginForm.value.password == "741852963") {
        i.style.display = "none"
      } else {
        if (!nam) {
          this._snackBar.open('Oooops username not good 😕!!', 'OK', {
            horizontalPosition: "center",
            verticalPosition: "top",
            duration: 5000
          })
        } else
          if (this.loginForm.value.password != "741852963") {
            this._snackBar.open('Oooops password not good 😕!!', 'OK', {
              horizontalPosition: "center",
              verticalPosition: "top",
              duration: 5000
            })
          } else {
            this._snackBar.open('Oooops username and password not good 😕!!', 'OK', {
              horizontalPosition: "center",
              verticalPosition: "top",
              duration: 5000
            })
          }
      }
    } else {
      this._snackBar.open('Oooops you didnot touch any input!!', 'OK', {
        horizontalPosition: "center",
        verticalPosition: "top",
        duration: 5000
      })
    }
  }
  myForm = new FormGroup({
    name: new FormControl("", Validators.minLength(3)),
    date: new FormControl("", Validators.required),
    dis: new FormControl("", Validators.min(5)),
    image: new FormControl("", Validators.required),
    value: new FormControl("", Validators.max(100)),
    html: new FormControl("", [Validators.required, Validators.minLength(14)])
  })
  modalRef?: BsModalRef;
  constructor(private _snackBar: MatSnackBar, private modalService: BsModalService) {

  }
  seti(e: HTMLDivElement, el: any, eve: any) {
    eve.stopPropagation()
    let img = eve.target
    let val = this.myForm.value.html
    this.myForm.controls.html.setValue("")

    this.myForm.controls.html.setValue(val + " " + `<object style="${img.attributes[2].nodeValue}border:0px" class="emojibtn" ><object>`)
    e.style.display = "none"
  }
  popup(e: HTMLDivElement, d: string) {
    e.style.display = d
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


  ngOnInit() {

  }
  submit() {
    if (this.myForm.status !== "INVALID") {

      this.val = JSON.stringify(this.myForm.value)
      window.navigator.clipboard.writeText(JSON.stringify(this.myForm.value))
      this._snackBar.open('done and copyed!!', 'OK', {
        horizontalPosition: "center",
        verticalPosition: "top",
        duration: 5000
      })
    } else {
      this._snackBar.open('Oooops some input not good!!', 'OK', {
        horizontalPosition: "center",
        verticalPosition: "top",
        duration: 5000
      })
    }
  }
  saveIn(t: any, ti: any) {
    localStorage.setItem(this.myForm.value.name + "", this.myForm.value.html + "")

  }
  saveTitle(ti: any, t: any) {
    if (localStorage.getItem(ti.value) !== null) {
      this.v = `${localStorage.getItem(ti.value)}`
      this.myForm.controls.html.setValue(localStorage.getItem(ti.value))
    }
  }

}