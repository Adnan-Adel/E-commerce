import { Routes } from '@angular/router';
import { RegisterComponent } from './features/auth/register/register.component';
import { LoginComponent } from './features/auth/login/login.component';
import { HomeComponent } from './features/products/home/home.component';
import { CartComponent } from './features/products/cart/cart.component';
import { BrandsComponent } from './features/products/brands/brands.component';
import { ProductDetailsComponent } from './features/products/product-details/product-details.component';
import { CategoriesComponent } from './features/products/categories/categories.component';
import { NotFoundComponent } from './layout/not-found/not-found.component';
import { authGuard } from './core/guard/auth.guard';
import { ProductsSharedComponent } from './shared/components/products-shared/products-shared.component';
import { OrderComponent } from './features/products/order/order/order.component';
import { AllordersComponent } from './features/products/order/allorders/allorders.component';
import { ProductsSliderComponent } from './features/products/home/products-slider/products-slider.component';
import { ProductsPageComponent } from './features/products/products-page/products-page/products-page.component';
import { WishlistComponent } from './features/products/wishlist/wishlist/wishlist.component';
import { ForgetPasswordComponent } from './features/auth/forgetPassword/forget-password/forget-password.component';
import { VerifyCodeComponent } from './features/auth/forgetPassword/verify-code/verify-code.component';
import { ResetPasswordComponent } from './features/auth/forgetPassword/reset-password/reset-password.component';


export const routes: Routes = [
    { path: "", redirectTo: "register", pathMatch: 'full' },
    { path: "register", component: RegisterComponent, title: "Register" },
    { path: "login", component: LoginComponent, title: "Login" },
    {
        path: "home", component: HomeComponent, title: "Home",
        canActivate: [authGuard]
    },
    {
        path: "cart", component: CartComponent, title: "Cart",
        canActivate: [authGuard]
    },
    {
        path: "products", component: ProductsPageComponent, title: "Products",
        canActivate: [authGuard]
    },
    {
        path: "brands", component: BrandsComponent, title: "Brands",
        canActivate: [authGuard]
    },
    {
        path: "categories", component: CategoriesComponent, title: "Categories",
        canActivate: [authGuard]
    },
    {
        path: "wishlist", component: WishlistComponent, title: "Wishlist",
        canActivate: [authGuard]
    },
    {
        path: "forget-password", component: ForgetPasswordComponent, title: "Forget Password"
    },
    {
        path: "verify-code", component: VerifyCodeComponent, title: "Verify Code"
    },
    {
        path: "reset-password", component: ResetPasswordComponent, title: "Reset Password"
    },
    {
        path: "details/:pId", component: ProductDetailsComponent, title: "Product Details",
        canActivate: [authGuard]
    },
    {
        path: "order/:cartId", component: OrderComponent, title: "Order",
        canActivate: [authGuard]
    },
    {
        path: "allorders", component: AllordersComponent, title: "All Orders",
        canActivate: [authGuard]
    },
    { path: "**", component: NotFoundComponent, title: "not found" }
];

