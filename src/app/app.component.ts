import { Component, ElementRef, ViewChild } from '@angular/core';
import { PriceList } from './pricelist.model';
import html2canvas from 'html2canvas';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  @ViewChild('screen') screen: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('downloadLink') downloadLink: ElementRef;

  currentDate = new Date();
  title = 'GUJARAT STEEL PRICE LIST';
  isShow = true;

  priceList: PriceList[] = [
    { index: 1, name: 'GI Pipe Apollo', price: '110/kg' },
    { index: 2, name: 'MS Pipe', price: 'Coil 89/kg Patti 78/kg' },
    { index: 3, name: 'Angle 35x5/25x3/30x3', price: '62/kg' },
    { index: 4, name: 'Channel 3x1.5', price: '63.5/kg' },
    { index: 5, name: 'Choras/Patti 10mm/25x6/20x5', price: '61/kg' },
    { index: 6, name: 'JSW Patra without Guardfilm', price: '160 Running Feet' },
    { index: 7, name: 'MS Sheet 10/12 Guage', price: '86/kg' },
    { index: 8, name: 'GI Sheet 22/20/18/16 Guage', price: '103/kg' },
    { index: 9, name: 'Cement Patra Per Piece', price: '6.5ft - 350 / 8ft - 440' },
    { index: 10, name: 'Cement Patra Per Piece', price: '10ft - 525 / 12ft - 720' },
    { index: 11, name: 'Shutter Patti Coating', price: '120/kg' },
    { index: 12, name: 'Guide/Bottom/Braket', price: '84/kg' },
    { index: 13, name: 'Bright Choras/Round', price: '64.50/kg' },
    { index: 14, name: 'Bright Patti 25x6/30x6/20x5', price: '67/kg' },
    { index: 15, name: 'Coating Role/GI Role', price: '120/kg' },
    { index: 16, name: 'Polycarbonate Sheet', price: '55/sq.ft' },
    { index: 17, name: 'FRP Sheet', price: '55/sq.ft' },
    { index: 18, name: 'PVC Sheet', price: '30/sq.ft' },
    { index: 19, name: 'Gate Channel', price: '69/kg' },
  ];

  ngOnInit() {
    let savedItems = localStorage.getItem("items")

    if (savedItems == null || JSON.parse(savedItems).length == 0) {
      localStorage.setItem("items", JSON.stringify(this.priceList))
    } else {
      this.priceList = JSON.parse(savedItems)
    }
    this.indexReseed();
  }

  public addItemPrice(itemname: string, price: string) {
    this.indexReseed();
    let maxIndex = Math.max.apply(Math, this.priceList.map(function (o) { return o.index; }))
    let itemPrice: PriceList = {
      index: maxIndex + 1,
      name: itemname,
      price: price
    };

    this.priceList.push(itemPrice);
  }

  public removeItem(index: number) {
    this.priceList = this.priceList.filter(i => i.index !== index);
    this.indexReseed();
  }

  downloadImage() {
    this.isShow = !this.isShow;
    setTimeout(() => {
      this.export();
    },
      50);
  }

  export() {
    localStorage.setItem("items", JSON.stringify(this.priceList));

    html2canvas(this.screen.nativeElement, {
      scrollY: -window.scrollY, scrollX: 0,
      windowWidth: document.documentElement.offsetWidth,
      windowHeight: document.documentElement.offsetHeight
    }).then(canvas => {
      this.canvas.nativeElement.src = canvas.toDataURL();
      this.downloadLink.nativeElement.href = canvas.toDataURL('image/jpg');
      this.downloadLink.nativeElement.download = 'gs-price-list.jpg';
      this.downloadLink.nativeElement.click();
      this.isShow = !this.isShow;
    });
  }

  updateItemName(index, event) {
    this.priceList.find((obj => obj.index == index)).name = event.target.value;
  }

  updateItemPrice(index, event){
    this.priceList.find((obj => obj.index == index)).price = event.target.value;
  }

  indexReseed() {
    let index = 1;
    this.priceList.forEach(function (itemPrice) {
      itemPrice.index = index;
      index++;
    });
  }
}



