import {Router} from  'express';
import { productManager } from '../app.js';

const productRouter = Router();

//ruta get 1

productRouter.get('/', async ()=>{
    try{
        const limits = req.query.limit;
        const products = await  productManager.getProducts();

        if(limits){
            const  limitsProducts = products.slice(0, limits)
            return res.json(limitsProducts)
        }
        return res.json(products);

    } catch (error){
        console.log(error);
        res.send("Error al intentar recibir los productos. "+ error).statusCode(500)
    }

} );
//ruta get 2


productRouter.get('/:productId', async ()=>{
    const id = req.params.productId;
    try{
        const products = await productManager.getProductById(id);
        res.json(products)

    }catch(error){
        console.log(error);
        res.send("Error al intentar recibir los producto con id "+ error).statusCode(500);
    }
})

//ruta post 1

productRouter.post( '/',async() => {
    try{
        const {title, description, price, thumbnail, code, stock, status = true, category} = req.body;
        const response = await productManager.addProduct({title, description, price, thumbnail, code, stock, status, category});
        res.json(response);
    }catch(error){
        console.log(error);
        res.send("Error al intentar agregar producto");
    }
})

//ruta put 3

productRouter.put('/:productId', async (req,res)=>{
    const id= req.params.productId;
    try{
        const {title, description, price, thumbnail, code, stock, status =true, category} = req.body;
        const response = await productManager.updateProducts(id, {title, description, price, thumbnail, code, stock, status, category});
        res.json(response)
    }catch(error){
        res.send("error al intentar editar producto")
    }
})

//ruta delete 4
productRouter.delete('/:productId', async (req,res)=>{
    const id= req.params.productId;
    try{
        const response = await productManager.deleteProductById(id);
        res.send("producto eliminadisisisismo")
    }catch(error){
        res.send("error al intentar eliminar producto")
    }
})
export {productRouter};