import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Injectable } from '@angular/core';


@Component({
  selector: 'app-planogram',
  templateUrl: './planogram.component.html',
  styleUrls: ['./planogram.component.scss']
})
export class PlanogramComponent implements OnInit {

  toggleDropdown(form: any) {
    form.showDropdown = !form.showDropdown;
  }

  getNumberArray(count: number): number[] {
    return new Array(count);
  }

  

  ngOnInit(): void {
  }

  dialogForms: any[] = [];

  dialogForm = new FormGroup({
    title: new FormControl('', Validators.required),
    discription: new FormControl('',Validators.required),
    no_of_Rows: new FormControl('', Validators.required),
    no_of_columns: new FormControl('', Validators.required)
  });

  onSubmit() {
    if (this.dialogForm.valid) {
      const newForm = { ...this.dialogForm.value };
      
  
      // Add an entry for each card in cardData
      for (let i = 0; i < Number(newForm.no_of_columns) * Number(newForm.no_of_Rows); i++) {
        this.cardData.push({ details: {} });
      }
      this.dialogForms.push(newForm);
      if (this.dialogForm.valid) {
        // Your form submission logic here
        this.closepopup();
      }
  
      this.dialogForm.reset();
    }
  }
  get itemNameControl() {
    return this.cardForm.get('ItemName');
}

  cardData: any[] = [];
  selectedCardData: any = {}; 
  cardForm: FormGroup; 
  constructor(private fb: FormBuilder) {
    // Initialize your cardForm
    this.cardForm = this.fb.group({
      ItemName: ['', Validators.required],
      Price: ['', Validators.required],
      springType: ['',Validators.required],
      slotType: ['',Validators.required],
      rowNumber: [''],
      cardId: ['']
      // Add more form controls if needed
    });
    for (const form of this.dialogForms) {
      for (let i = 0; i < form.no_of_Rows; i++) {
          for (let j = 0; j < form.no_of_columns; j++) {
              this.cardData.push({
                  details: {}
              });
          }
      }
  }


  
  }

  selectedCardIndices: number[] = [];  // Initialize with -1, indicating no card is selected
  isSelectedCard(index: number): boolean {
    return this.selectedCardIndices.includes(index);
  }

  openCardPopup(index: number) {
    if (!this.selectedCardIndices.includes(index)) {
      this.selectedCardIndices.push(index);
      
      const cardDetails = this.cardData[index]?.details || {};
      this.selectedCardData = {
        ItemName: cardDetails.ItemName || '',
        Price: cardDetails.Price || '',
        springType: cardDetails.springType || '',
        slotType: cardDetails.slotType || ''
      };
      this.show1 = true;
      this.cardForm.patchValue(this.selectedCardData);
      this.cardForm['_selectedCardIndex'] = index;
      
    }
  }

  // Add a method to handle card form submission
  onsubmit1() {
    const selectedCardIndex = this.cardForm['_selectedCardIndex'];
    if (this.cardForm.valid && selectedCardIndex !== undefined) {
      const [rowNumber, cardId] = this.cardForm.value.cardId.split(' ');
      this.cardData[selectedCardIndex].details = {
        ItemName: this.cardForm.value.ItemName,
        Price: this.cardForm.value.Price,
        springType: this.cardForm.value.springType,
        slotType: this.cardForm.value.slotType,
      };
      // Optionally, store rowNumber and cardId in the details object if needed
      this.cardData[selectedCardIndex].details.rowNumber = rowNumber;
      this.cardData[selectedCardIndex].details.cardId = cardId;
  
      this.selectedCardData = {}; // Reset selectedCardData
      this.cardForm.reset();
      delete this.cardForm['_selectedCardIndex'];
      this.closecardpopup();
    }
  }
  editCardDetails(index: number) {
    const rowNumber = Math.floor(index / this.dialogForms[0].no_of_columns) + 1;
    const cardId = index % this.dialogForms[0].no_of_columns + 1;
    const cardDetails = this.cardData[index]?.details || {};
    this.selectedCardData = {
        ItemName: cardDetails.ItemName || '',
        Price: cardDetails.Price || '',
        springType: cardDetails.springType || '',
        slotType: cardDetails.slotType || '',
        rowNumber: rowNumber,
        cardId: `${rowNumber}${cardId}`,
    };
    this.show1 = true;
    this.cardForm.patchValue(this.selectedCardData);
    this.cardForm['_selectedCardIndex'] = index;
}
  

 

  
hasCardDetails(index: number): boolean {
  return this.cardData[index]?.details !== undefined;
}

  itemNames: string[] = ['Item 1', 'Item 2', 'Item 3'];
  springTypes: string[] = ['type1','type2','type3'];
  slotTypes: string[] = ['slot1','slot2','slot3']
  show = false;
  show1 = false;


  closecardpopup(){
    this.show1 = false;
  }
  openpopup() {
    const selectedCardIndex = this.cardForm['_selectedCardIndex'];
    if (selectedCardIndex !== undefined) {
      this.selectedCardData = {
        ItemName: this.cardForm.value.ItemName || '',
        Price: this.cardForm.value.Price || '',
        
      };
    } else {
      this.selectedCardData = {};
    }

    this.show = true;  // Show the main popup
    this.dialogForm.patchValue(this.selectedCardData);
  }
  closepopup() {
    this.show = false;
  }

}