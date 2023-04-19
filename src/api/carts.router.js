import { Router } from 'express';
import { productsArray } from '../api/products.router.js';

const router = Router();

let carts = [];

//################## Método POST ##################
router.post('/', (req, res) => {

    const cart = req.body;
    const maxId = Math.max(0, ...carts.map(p => p.id));
    cart.id = maxId + 1;
    cart.products = []
    carts.push(cart);
    res.send({ status: 'success', payload:cart });

});
//################## Método POST ##################



//################## Método GET ##################
router.get('/:cid', (req, res) => {
    const cartId = Number(req.params.cid);

    const index = carts.findIndex(c => c.id === cartId);

    if (index === -1) {
        res.status(404).send({ error: 'cart not found' });
    } else {
        res.send(carts[index]);
    }
});
//################## Método GET ##################



//################## Método POST del producto en el carrito ##################  
router.post('/:cid/product/:pid', (req, res) => {
    const cartId = Number(req.params.cid);
    const prodId = Number(req.params.pid);
    const quantity = req.body.quantity || 1;

    const cartIndex = carts.findIndex(c => c.id === cartId);
    if (cartIndex === -1) {
        return res.status(404).send({ error: 'Cart not found' });
    }

    const product = productsArray.find(p => p.id === prodId);
    if (!product) {
        return res.status(404).send({ error: 'Product not found' });
    }

    const cartProductIndex = carts[cartIndex].products.findIndex(p => p.id === prodId);
    if (cartProductIndex === -1) {
        carts[cartIndex].products.push({ id: product.id, quantity });
    } else {
        carts[cartIndex].products[cartProductIndex].quantity += quantity;
    }

    res.send({ status: 'success', payload: { id: product.id, quantity } });
});
//################## Método POST del producto en el carrito ##################  










//################## Métodos extras ################## 

/* Estos son métodos extras que no vienen en la entrega pero facilitaría mucho la interacción del usuario con la aplicación */


//-------------- Borrar producto del carrito --------------
router.delete('/:cid/product/:pid', (req, res) => {
    const cartId = Number(req.params.cid);
    const prodId = Number(req.params.pid);
    const quantity = req.body.quantity || 1;

    const cartIndex = carts.findIndex(c => c.id === cartId);
    if (cartIndex === -1) {
        return res.status(404).send({ error: 'Cart not found' });
    }

    const product = productsArray.find(p => p.id === prodId);
    if (!product) {
        return res.status(404).send({ error: 'Product not found' });
    }

    const cartProductIndex = carts[cartIndex].products.findIndex(p => p.id === prodId);
    if (cartProductIndex === -1) {
        return res.status(404).send({ error: 'Product not found in cart' });
    }

    carts[cartIndex].products[cartProductIndex].quantity -= quantity;
    if (carts[cartIndex].products[cartProductIndex].quantity <= 0) {
        carts[cartIndex].products.splice(cartProductIndex, 1);
    }

    res.send({ status: 'success', payload: { id: product.id, quantity: -quantity } });
});
//-------------- Borrar producto del carrito --------------



//-------------- Borrar carrito --------------
router.delete('/:cid', (req, res) => {
    const cartId = Number(req.params.cid);
    const cartIndex = carts.findIndex(c => c.id === cartId);

    if (cartIndex === -1) {
        return res.status(404).send({ error: 'Cart not found' });
    }
    else{
        carts.splice(cartIndex, 1);
        res.send({ status: 'success', message: 'cart deleted' });
    }
});
//-------------- Borrar carrito --------------

//################## Métodos extras ################## 

export default router;