import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { style, animate, trigger, transition } from '@angular/animations';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, TemplateRef, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss'],
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
  ],
  encapsulation: ViewEncapsulation.None
})
export class StoryComponent implements OnInit, AfterViewInit {
  data: any;
  id: any;
  story: any;
  pazzle: any;
  y = 0
  saved = false
  not = false
  v = "4%"
  mod = ""
  up() {
    window.scrollTo(0, 0)
  }


  constructor(private modalService: BsModalService, private route: ActivatedRoute, private sanitizer: DomSanitizer, private http: HttpClient) {
    this.getJSON().subscribe(data => {
      this.data = data;
      this.v = "50%"
      this.route.paramMap.subscribe(p => { this.id = p.get("id") })
      this.v = "55%"
      setTimeout(() => {
        if (this.data[+this.id]) {
          this.v = "70%"
          setTimeout(() => {
            for (let i = 0; i < 101; i++) {
              setTimeout(() => {
                this.v = `${i}%`
              }, 10);

            }
            setTimeout(() => {
              this.story = this.data[+this.id]
              this.pazzle = this.data[+this.id].ans || null
              setTimeout(() => {
                document.getElementsByTagName("strong")
                for (let i = 0; i < document.getElementsByTagName("strong").length; i++) {
                  const element = document.getElementsByTagName("strong")[i];
                  console.dir(element)
                }
              }, 200)
            }, 600);
          }, 600);

        } else {
          this.not = true
        }
      }, 400);
      this.y = +localStorage.getItem("page")! || 0

    });

  }
  txt = ""
  public getJSON(): Observable<any> {
    return this.http.get("../../assets/data.json");
  }
  ansring() {
    if (this.txt == "") {
      window.scrollTo(0, 0)
      this.txt = this.story.html
      this.story.html = this.pazzle
    } else {
      this.story.html = this.txt
      this.txt = ""

    }

  }
  safeHtml(htmlTextWithStyle: string) {
    return this.sanitizer.bypassSecurityTrustHtml(htmlTextWithStyle);
  }
  save() {
    localStorage.setItem("page", "" + window.scrollY)
    this.saved = true
    setTimeout(() => {
      this.saved = false
    }, 1000);
  }
  ngOnInit() {
    this.y = +localStorage.getItem("page")! || 0
  }
  ngAfterViewInit() {
    window.scrollTo(0, this.y)
    setTimeout(() => {
      window.scrollTo(0, this.y)
      setTimeout(() => {
        if (window.scrollY !== this.y) {
          window.scrollTo(0, this.y)
          // setInterval(() => {
          //   for (let i = 0; i < document.getElementsByTagName("strong").length; i++) {
          //     const element = document.getElementsByTagName("strong")[i];
          //     element.addEventListener("click", (e) => {
          //       console.dir(e)
          //       if (element.ariaLabel) {
          //         alert(element.ariaLabel)
          //       }
          //     })

          //   }
          // }, 10)
        }
      }, 300);
    }, 2000);

  }
  config = {
    animated: true
  };
  modalRef?: BsModalRef;
  openModal(template: TemplateRef<any>, e: any) {
    let v = e.target.ariaLabel
    if (e.target.nodeName == "STRONG" && e.target.innerText == "(*)") {
      this.mod = v
      this.modalRef = this.modalService.show(template, this.config);
    }
  }
  int(template: TemplateRef<any>, e: any) {
    setInterval(() => {
      this.openModal(template, e)
    }, 1)
  }
}
