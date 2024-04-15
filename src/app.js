import express from "express";
import { ProductManager } from './dao/productManager.js';
import { productRouter } from "./routes/products-router.js"
import { CartManager } from "./dao/cartManager.js";
import { cartsRouter } from "./routes/cart-router.js";
import { router as vistasRouter } from './routes/vistas.router.js';
import { errorHandler, middleware01, middleware02, middleware03 } from "./middleware/middleW01.js";
import { engine } from "express-handlebars";
 import path from "path"; 
 import __dirname from "./utils.js"; 
 import { Server } from "socket.io";
const puerto = 8080;
const app = express();

export const  productManager = new ProductManager;
export const  cartManager = new CartManager;

//middlewares 
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname,'/views'));


//contenido estatico
app.use(express.static(path.join(__dirname,'/public')));

//middleware a nivel de aplicacion
/* app.use(middleware01,middleware02,  (req,res,next)=>{
    console.log('middleware a nivel app')
    next()
}) */    

app.use('/api/products', productRouter);
app.use('/api/carts', cartsRouter);
app.use('/', vistasRouter)//ruta de las vistas con handlebars



app.use('/',/* middleware03, */(req, res)=>{
    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send("Todo Ok")
})  

app.use(errorHandler)//error handler


//Escucha del servidor
const serverHTTP=  app.listen(puerto, () => console.log('Servidor andando en puerto ',  puerto));
export const io =new Server(serverHTTP)
//FIN Escucha del servidor


///WEB SOCKETS
io.on("connection",async socket=>{  
    socket.on("message", (message) => {
        console.log(message);
      });
     console.log(`'Se conecto un cliente con ID'`, socket.id)
        const listOfProducts = await productManager.getProducts(); 

        socket.emit('sendProducts', listOfProducts)//emito para enviar productos al cliente

        socket.on("addProduct",async (objeto)=>{
            await productManager.addProduct(objeto)
            const listOfProducts = await productManager.getProducts(); 
            socket.emit('sendProducts', listOfProducts)
        })
//escuchando deleteProduct
        socket.on("deleteProduct", async(id)=>{
            console.log(id)
            await productManager.deleteProductById(id)
            const listOfProducts = await productManager.getProducts();
            socket.emit('sendProducts', listOfProducts)
        })
 

})