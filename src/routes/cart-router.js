import {Router} from  'express';
import {  cartManager } from '../app.js';


const cartsRouter =Router();



///////////////////////////OBTENER POR ID CARRITO Y LISTAR PRODUCTOS//////////////////////////////////
cartsRouter.get( '/:id', async (req, res) =>{
  const {cartId} = req.params;
        try{
            const response = await cartManager.getCartProducts(cartId);
            res.json(response)
        }catch(error){
            res.send('Error al intentar enviar los productos del carrito' + error.menssage ) 
        }
})

///////////////////////////OBTENER RUTA PARA AGREGAR PRODUCTOS AL CARRITO//////////////////////////////////
cartsRouter.post('/cartId/products/productId', async (res, req) => {
    const {cartId,porductId} =req.params; //primero obtengo  el id de cart y products
        try{
            await cartManager.addProductToCart(cartId, porductId);
            return res.send('Producto agregado exitosamente')
        }catch(error){
            res.send('Producto no fue agregado al carrito' + error.menssage)
        }

})

export {cartsRouter}








///////////////////////////CREAR UN NUEVO CARRITO//////////////////////////////////

cartsRouter.post( '/',async(req, res) => {
    try{
        const response = await cartManager.newCart()
        res.json(response);
    }catch(error){
        console.log(error);
        res.send("Error al intentar crear el carrito");
    }
})