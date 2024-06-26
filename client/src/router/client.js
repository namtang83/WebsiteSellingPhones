import ClientLayout from "../layouts/client.vue";
import HomePage from "../views/Home.vue";
import FeedbackPage from "../views/Feedback.vue";
import AllProductsPage from "../views/AllProducts.vue";
import ProductDetailsPage from "../components/product/ProductDetails.vue";
import LoginSignUpPage from "../views/LoginSignup.vue";
import Register from "../components/loginsignup/SignUp.vue";
import CartPage from "../views/Cart.vue";
import ProductBrandPage from "../components/product/ProductBrand.vue"
const client = [
    {
        path: "/",
        name: "ClientLayout",
        component: ClientLayout,
        children: [
            {
                path: "/",
                name: "Home",
                component: HomePage,
            },
            {
                path: "about",
                name: "Feedback",
                component: FeedbackPage,
            },
            {
                path: "allproducts",
                name: "AllProducts",
                component: AllProductsPage,
            },
            {
                path: "allproducts/product/:id",
                name: "ProductsDetails",
                component: ProductDetailsPage,
            },
            {
                path: "allproducts/brand/:brand",
                name: "ProductBrand",
                component: ProductBrandPage,
            },
            {
                path: "loginsignup",
                name: "LoginSignUp",
                component: LoginSignUpPage,
            },
            {
                path: "loginsignup/register",
                name: "Register",
                component: Register,
            },
            {
                path: "cart",
                name: "Cart",
                component: CartPage,
            },
        ],
    }
];

export default client;