import { Component, OnInit } from '@angular/core';
import { CatalogueService } from './catalogue.service';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public categories;
  public currentCategorie;

  constructor(public catalogueService: CatalogueService, private router: Router,
    public authService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.authService.loadAuthenticatedUserFromLocalStorage();

    this.getCategories();
  }


  //public
  public getCategories() {
    this.catalogueService.getResource("/categories")
      .subscribe(data => {
        console.log("get categorie");
        console.log(data);
        this.categories = data;
      }, err => {
        console.log(err);
      })


  }


  getProductsByCat(c) {
    this.currentCategorie = c;
    this.router.navigateByUrl('/products/2/' + c.id);

  }

  onSelectedProducts() {
    this.currentCategorie = undefined;
    this.router.navigateByUrl("/products/1/0")
  }

  onLogout() {
    this.authService.removeTokenFromLocalStorage();
    this.router.navigateByUrl('/login');
  }




}
