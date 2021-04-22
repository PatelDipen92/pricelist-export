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
    { index: 1, name: 'GI Pipe', price: '99' },
    { index: 2, name: 'MS Pipe', price: '83' },
    { index: 3, name: 'Angle', price: '59' },
    { index: 4, name: 'Channel', price: '61' },
    { index: 5, name: 'Choras/Patti', price: '57.50' },
    { index: 6, name: 'Coating Patra', price: '160 Running Feet' },
    { index: 7, name: 'MS Sheet', price: '82' },
    { index: 8, name: 'GI Sheet', price: '98' },
    { index: 9, name: 'Cement Patra', price: '170 Running Meter' },
    { index: 10, name: 'Shutter Patti', price: '105' },
    { index: 11, name: 'Guide/Bottom', price: '82' },
    { index: 12, name: 'Bright Choras/Round', price: '60' },
    { index: 13, name: 'Bright Patti', price: '62.5' },
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



