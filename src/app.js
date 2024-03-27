import express from "express";
import { ProductManager } from './productManager.js';
import { productRouter } from "./routes/products-router.js"

const puerto = 8080;
const app = express();
export const  productManager = new ProductManager;
//middlewares 
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use('/products', productRouter);



//Escucha del servidor
app.listen(puerto, () => console.log('Servidor andando en puerto ',  puerto));

