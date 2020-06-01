import { Component, OnInit } from '@angular/core';
import { CatalogueService } from '../catalogue.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public products;
  public editPhoto: boolean;
  public currentProduct: any;
  public selectedFiles;
  public progress: number;
  public currentFileUpload: any;
  public currentTime: number;
  private timestamp: any;
  private title: string;

  constructor(
    public catalogueService: CatalogueService,
    public route: ActivatedRoute, private router: Router,
    public authService: AuthenticationService) { }


  ngOnInit() {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        let url = val.url;
        console.log(url);
        let p1 = this.route.snapshot.params.p1;

        if (p1 == 1) {
          this.title = "sélection";
          this.getProducts('/products/search/selectedProducts');
        }
        else if (p1 == 2) {
          let idCat = this.route.snapshot.params.p2;
          this.title = "Produits de la catégorie " + idCat;
          this.getProducts('/categories/' + idCat + '/products');
        }

        else if (p1 == 3) {

          this.title = "Produits en promotion ";
          this.getProducts('/products/search/promoProducts');
        }

        else if (p1 == 4) {
          this.title = "Produits Disponibles";
          this.getProducts('/products/search/dispoProducts');
        }

        else if (p1 == 5) {

          this.title = "Recherche ";
          this.getProducts('/products/search/dispoProducts');
        }


      }
    });

    let p1 = this.route.snapshot.params.p1;
    if (p1 == 1) {
      this.getProducts('/products/search/selectedProducts');
    }
  }

  public getProducts(url) {
    this.catalogueService.getResource(url).subscribe(data => {
      this.products = data;
    }, err => {
      console.log(err);
    });
  }

  onEditPhoto(p) {
    this.currentProduct = p;
    this.editPhoto = true;
  }

  onSelectedFile(event) {
    this.selectedFiles = event.target.files;
  }

  uploadPhoto() {
    this.progress = 0;
    this.currentFileUpload = this.selectedFiles[0];
    this.catalogueService.uploadPhotoProduct(this.currentFileUpload, this.currentProduct)
      .subscribe(
        (event) => {
          console.log(event);
        },
        (err) => {
          console.log("Erorr");
          console.log(err);

        },
        () => {
          console.log("complet");
          location.reload();
        });
    this.selectedFiles = undefined;
  }


  getTS() {
    return this.timestamp;
  }

  public isAdmin() {
    return this.authService.isAdmin();
  }
}

