import { Component } from '@angular/core';
import { environment } from '../../environments/environment';
import { InvoiceComponent } from '../components/invoice/invoice.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  // public order = environment.orderData;
  public order= {
    address: {
      title: 'Home',
      name: 'Maida',
      flatNumber: 115,
      street: 'Brighton Road',
      locality: 'Brighton'
    },
    grandTotal: 87,
    products: [
      {
        images: ['apple.jpg'],
        name: 'Apple',
        offer: 10,
        salePrice: 2.7,
        regularPrice: 3,
        units: 10
      },
      {
        images: ['biryani.jpg'],
        name: 'Biryani',
        offer: 20,
        salePrice: 12,
        regularPrice: 15,
        units: 5
      }
    ],
    status: 'Delivered',
    delivery_status: 'Unassigned',
    createdAt: 'Nov 3, 2020 3:49 PM'
  }

  constructor(private modalCtrl: ModalController) { }

  async openInvoice(order: any) {
    const InvoiceModal = await this.createModal(InvoiceComponent, { order });
    await InvoiceModal.present();
  }

  async createModal(component: typeof InvoiceComponent, componentProps?: { order: any; }, cssClass?: undefined): Promise<HTMLIonModalElement> {
    const modal = await this.modalCtrl.create({
      component,
      cssClass,
      componentProps,
      backdropDismiss: true
    });
    return modal;
  }
}