import fs  from "fs";
import {v4 as uuidv4} from "uuid";

export class CartManager {

        constructor() {
            this.PATH = "./src/data/cart.json";
            this.carts = [];
        }; 

//--------------------FUNCION AGREGAR NUEVO CARRITO ---------------------//
   newCart= async () => { 
        const id = uuidv4()

        let newCart =  { id,  products : []} ;   

        this.carts = await this.getCarts(); //      
        this.carts.push(newCart)

      await fs.promises.writeFile(this.PATH, JSON.stringify(this.carts));

    return newCart;
        
    }

 //-------------------FUNCION OBTENER LISTA DE CARRITOS---------------------//
    getCarts = async  ()=> {
        const response = await fs.promises.readFile(this.PATH, 'utf-8');
        const responseParse =  JSON.parse(response);  
        return  responseParse ;
    };

//-------------------FUNCION OBTENER LISTA DE PRODUCTOS DE CARRITO ---------------------//
    getCartProducts = async(id) =>{
        const carts = await this.getCarts();

        const cart = carts.find(cart => cart.id === id);
        if (cart){
            return  cart.products
        }else{
            console.log("No se encontró el carrito")
        }

    }
    addProductToCart = async (cId,pId) =>{
        const carts = await this.getCarts();
        const findIndexCart = carts.findIndex(cart => cart.id === cId);

        if(findIndexCart != -1){
          const cartProducts =  await this.getCartProducts(cId)
          const findIndexProductToSave = cartProducts.findIndex(product =>product.id === pId )

                    if(findIndexProductToSave != -1){
                        cartProducts[findIndexProductToSave].quantity++;
                    } else{
                        cartProducts.push({id:pId, quantity:1})
                    }
                    carts[findIndexCart].products = cartProducts//sobreescribo  los productos del carrito de compras con la nueva lista de productos
                    await fs.promises.writeFile(this.PATH, JSON.stringify(carts));// se guarda en el archivo la lista de  carritos actualizada
                    console.log("producto agregado con exito") //  para ver si funciona
                    }else{
                        console.log("carrito no encontrado por ende producto no agregado")

                    }
    }
}
