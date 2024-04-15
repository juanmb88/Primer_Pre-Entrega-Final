import { Router } from 'express';
import { ProductManager } from '../dao/productManager.js';
import __dirname from '../utils.js';
export const router=Router()


const productManager = new ProductManager(__dirname+'/data/products.json')

router.get('/',async(req,res)=>{
    const listOfProducts = await productManager.getProducts(); 
    res.setHeader('Content-Type','text/html');
    res.status(200).render('inicio', {listOfProducts});
    console.log(listOfProducts)
})
//aca usamos socket
 router.get('/realTimeproducts', async (req,res) => {
    res.status(200).render('realTimeProducts', {})

    
}) 
