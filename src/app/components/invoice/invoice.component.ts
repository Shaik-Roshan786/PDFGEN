import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
})
export class InvoiceComponent implements OnInit, AfterViewInit {
  @Input() order: any;
  content!: string;

  // Use ViewChild to get a reference to the HTML element with the #PrintInvoice identifier
  @ViewChild('printInvoice', { static: false }) printInvoiceElement!: ElementRef;

  constructor(private modalContrller: ModalController, private pdfGenerator: PDFGenerator) {
  }

  closeModal() {
    this.modalContrller.dismiss();
  }

  downloadInvoice() {
    if (this.printInvoiceElement) {
      // Use nativeElement to access the innerHTML of the element
      this.content = this.printInvoiceElement.nativeElement.innerHTML;

      let options = {
        documentSize: 'A4',
        type: 'share',
        // landscape: 'portrait',
        fileName: 'Order-Invoice.pdf'
      };

      this.pdfGenerator.fromData(this.content, options)
        .then((base64) => {
          console.log('OK', base64);
        }).catch((error) => {
          console.log('error', error);
        });
    } else {
      console.error('printInvoiceElement is undefined');
    }
  }

  ngOnInit() {
    console.log('Invoice Page2', this.order);
  }

  ngAfterViewInit() {
    // At this point, printInvoiceElement should be initialized
  }
}




// import { Component, OnInit, Input } from '@angular/core';
// import { ModalController } from '@ionic/angular';
// import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';

// @Component({
//   selector: 'app-invoice',
//   templateUrl: './invoice.component.html',
//   styleUrls: ['./invoice.component.scss'],
// })
// export class InvoiceComponent implements OnInit {
//   @Input() order: any;
//   content!: string;
//   printInvoiceElement: any;
//   constructor(private modalContrller: ModalController, private pdfGenerator: PDFGenerator) {
//   }
//   closeModal() {
//     this.modalContrller.dismiss();
//   }
//   downloadInvoice() {
//     this.content = this.printInvoiceElement.nativeElement.innerHTML
//     let options = {
//       documentSize: 'A4',
//       type: 'share',
//       // landscape: 'portrait',
//       fileName: 'Order-Invoice.pdf'
//     };
//     this.pdfGenerator.fromData(this.content, options)
//       .then((base64) => {
//         console.log('OK', base64);
//       }).catch((error) => {
//         console.log('error', error);
//       });

//   }
//   ngOnInit() {
//     console.log('Invoice Page2', this.order);
//   }
// }
