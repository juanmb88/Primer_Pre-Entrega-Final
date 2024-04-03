import express from "express";
import { ProductManager } from './productManager.js';
import { productRouter } from "./routes/products-router.js"
import { CartManager } from "./cartManager.js";
import { cartsRouter } from "./routes/cart-router.js";
const puerto = 8080;
const app = express();

export const  productManager = new ProductManager;
export const  cartManager = new CartManager;

//middlewares 
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use('/api/products', productRouter);
app.use('/api/carts', cartsRouter);



//Escucha del servidor
app.listen(puerto, () => console.log('Servidor andando en puerto ',  puerto));

