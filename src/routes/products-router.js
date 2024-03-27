import {Router} from  'express';
import { productManager } from '../app.js';

const productRouter = Router();

//ruta get 1

productRouter.get('/', async (req, res) =>{
    try{
        const {limit} = req.query;
        const products = await  productManager.getProducts();

        if(limit){
            const  limitsProducts = products.slice(0, limit)
            return res.json(limitsProducts)
        }
        return res.json(products);

    } catch (error){
        console.log(error);
        res.send("Error al intentar recibir los productos. "+ error)
    }

} );
//ruta get 2


productRouter.get('/:productId', async (req, res)=>{
    const id = req.params.productId;
    try{
        const products = await productManager.getProductById(id);
        if (products){
            return res.json(products)
        }else{
            res.send("No se encontro el producto con id ")
        }
        

    }catch(error){
        console.log(error);
        res.send("Error al intentar recibir los producto con id "+ error).statusCode(500);
    }
})

//ruta post 1

productRouter.post( '/',async(req, res) => {
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
        const response = await productManager.updateProduct(id, {title, description, price, thumbnail, code, stock, status, category});
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