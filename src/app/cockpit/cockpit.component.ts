import { Component, OnInit, ViewChild, ElementRef, TemplateRef, ContentChild } from '@angular/core';
import { DecisionService } from '../decision.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {

  @ViewChild('input') input : ElementRef; 
  @ViewChild('decisionExistsTemplate') template : TemplateRef<any>;
  decision : string;
  decisionModalRef : BsModalRef;
  decisionExistsModalRef : BsModalRef;

  constructor(private decisionService : DecisionService, private modalService: BsModalService) { }

  ngOnInit() {
    this.decisionService.decisionExists.subscribe(
      () => {
        console.log("Data already exists");
        this.decisionExistsModalRef = this.modalService.show(this.template)
      }
    )
  }

  onAddClick() {
    if(!this.isEmpty(this.input.nativeElement.value)){
      this.decisionService.addDecision(this.input.nativeElement.value);
      this.input.nativeElement.value = '';
    }
  }

  onDecisionClick(template: TemplateRef<any>){
    this.decision = this.decisionService.decideOption();
    this.decisionModalRef = this.modalService.show(template);
  }

  onRemoveAllClick(){
    this.decisionService.removeAllDecisions();
  }  

 isEmpty(str){
    return !str.replace(/^\s+/g, '').length; // boolean (`true` if field is empty)
  }
}
