import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authguardGuard } from './shared/services/authguard.guard';
import { NotfoundComponent } from './shared/components/notfound/notfound.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  // { path: 'home',canActivate:[authguardGuard], component: HomeComponent },

  {
    path: 'home',
    canActivate: [authguardGuard],
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'about-us',
    canActivate: [authguardGuard],
    loadChildren: () =>
      import('./about/about.module').then((m) => m.AboutModule),
  },
  {
    path: 'allproducts',
    canActivate: [authguardGuard],
    loadChildren: () =>
      import('./allproducts/allproducts.module').then(
        (m) => m.AllproductsModule
      ),
  },
  {
    path: 'brands',
    canActivate: [authguardGuard],
    loadChildren: () =>
      import('./brands/brands.module').then((m) => m.BrandsModule),
  },
  {
    path: 'cart',
    canActivate: [authguardGuard],
    loadChildren: () => import('./cart/cart.module').then((m) => m.CartModule),
  },
  {
    path: 'categories',
    canActivate: [authguardGuard],
    loadChildren: () =>
      import('./categories/categories.module').then((m) => m.CategoriesModule),
  },
  {
    path: 'checkout',
    canActivate: [authguardGuard],
    loadChildren: () =>
      import('./checkout/checkout.module').then((m) => m.CheckoutModule),
  },
  {
    path: 'contact',
    canActivate: [authguardGuard],
    loadChildren: () =>
      import('./contact/contact.module').then((m) => m.ContactModule),
  },
  {
    path: 'account',
    canActivate: [authguardGuard],
    loadChildren: () =>
      import('./account/account.module').then((m) => m.AccountModule),
  },

  // { path: 'Wishlist',canActivate:[authguardGuard], component: WishlistComponent },
  // { path: 'productdetalies/:id',canActivate:[authguardGuard], component: ProductdetaliesComponent },
  // { path: 'login', component: LoginComponent },
  // { path: 'register', component: RegisterComponent },
  // { path: 'signup', component: SignupComponent },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
