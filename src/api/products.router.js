import { Router } from 'express';

const router = Router();

let productsArray = [];

//################## Método GET ##################
router.get('/', (req, res) => {
    res.send({ status: 'success', payload:productsArray });
});
//################## Método GET ##################



//################## Método GET por ID ##################
router.get('/:pid', (req, res) => {
    const productsArrayId = Number(req.params.pid);

    const index = productsArray.findIndex(prod => prod.id === productsArrayId);

    if (index === -1) {
        res.status(404).send({ error: 'Product not found' });
    } else {
        res.send(productsArray[index]);
    }
});
//################## Método GET por ID ##################



//------------ Función para verificar si la propiedad thumbnail está repetida  ------------
function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}
//------------ Función para verificar si la propiedad thumbnail está repetida  ------------



//################## Método PUT ##################
router.put('/:pid', (req, res) => {
    if ('id' in req.body) {
        return res.status(400).send({ status: 'error', error: 'It is not allowed to set the id field manually' });
    }

    if ('status' in req.body) {
        return res.status(400).send({ status: 'error', error: 'It is not allowed to set the status field manually' });
    }

    if ('code' in req.body) {
        return res.status(400).send({ status: 'error', error: 'It is not allowed to set the code field manually' });
    }

    const allowedProperties = new Set(['title', 'description', 'price', 'thumbnail', 'stock', 'category']);
    for (const property in req.body) {
        if (!allowedProperties.has(property)) {
            return res.status(400).send({ status: 'error', error: `Property ${property} is not allowed, only 'title', 'description', 'price', 'thumbnail', 'stock', 'category' properties are allowed` });
        }
    }

    const prod = req.body;
    const productsArrayId = Number(req.params.pid);

    const index = productsArray.findIndex(p => p.id === productsArrayId);

    const existingProduct = productsArray.find((p, i) =>
        i !== index &&
        (p.title === prod.title ||
        p.description === prod.description ||
        arraysEqual(p.thumbnail, prod.thumbnail))
    );

    if(!prod.title || !prod.description || !prod.price || !prod.thumbnail || !prod.stock ||!prod.category ) {
        return res.status(400).send({ status: 'error', error: 'incomplete values' });
    }

    if(!Array.isArray(prod.thumbnail)){
        return res.status(400).send({ status: 'error', error: 'thumbnail must be an array' });
    }

    if (index !== -1) {
        if (!existingProduct) {
            prod.status = true;
            prod.code = true;
            prod.id = productsArrayId;
            productsArray[index] = prod;
            res.send({ status: 'success', message: 'product updated' });
        } else {
            let errorMessage = 'There is already a product with';
            if (existingProduct.title === prod.title) {
                errorMessage += ` the title "${prod.title}"`;
            }
            if (existingProduct.description === prod.description) {
                errorMessage += ` the description "${prod.description}"`;
            }
            if (arraysEqual(existingProduct.thumbnail, prod.thumbnail)) {
                errorMessage += ` the thumbnail "${prod.thumbnail}"`;
            }
            res.send({ status: 'error', message: errorMessage });
        }
    } else {
        res.send({ status: 'error', message: 'The product does not exist' });
    }
});
//################## Método PUT ##################



//################## Método POST ##################
router.post('/', (req, res) => {

    if ('id' in req.body) {
        return res.status(400).send({ status: 'error', error: 'It is not allowed to set the id field manually' });
    }

    if ('status' in req.body) {
        return res.status(400).send({ status: 'error', error: 'It is not allowed to set the status field manually' });
    }

    if ('code' in req.body) {
        return res.status(400).send({ status: 'error', error: 'It is not allowed to set the code field manually' });
    }

    const allowedProperties = new Set(['title', 'description', 'price', 'thumbnail', 'stock', 'category']);
    for (const property in req.body) {
        if (!allowedProperties.has(property)) {
            return res.status(400).send({ status: 'error', error: `Property ${property} is not allowed, only 'title', 'description', 'price', 'thumbnail', 'stock', 'category' properties are allowed` });
        }
    }

    const prod = req.body;
    const maxId = Math.max(0, ...productsArray.map(p => p.id));
    prod.id = maxId + 1;

    if(!prod.title || !prod.description || !prod.price || !prod.thumbnail || !prod.stock ||!prod.category ) {
        return res.status(400).send({ status: 'error', error: 'incomplete values' });
    }

    if(!Array.isArray(prod.thumbnail)){
        return res.status(400).send({ status: 'error', error: 'thumbnail must be an array' });
    }

    const existingProduct = productsArray.find((p, i) =>
        i !== prod.id &&
        (p.title === prod.title ||
        p.description === prod.description ||
        arraysEqual(p.thumbnail, prod.thumbnail))
    );

    if (existingProduct) {
        let errorMessage = 'There is already a product with';
        if (existingProduct.title === prod.title) {
            errorMessage += ` the title "${prod.title}"`;
        }
        if (existingProduct.description === prod.description) {
            errorMessage += ` the description "${prod.description}"`;
        }
        if (arraysEqual(existingProduct.thumbnail, prod.thumbnail)) {
            errorMessage += ` the thumbnail "${prod.thumbnail}"`;
        }
        res.send({ status: 'error', message: errorMessage });
    } else {
        prod.status = true;
        prod.code = true;
        productsArray.push(prod);
        res.send({ status: 'success', prod });
    }
});
//################## Método POST ##################



//################## Método DELETE ##################
router.delete('/:pid', (req, res) => {
    const prod = req.body;
    const productsArrayId = Number(req.params.pid);

    const index = productsArray.findIndex(p => p.id === productsArrayId);

    if(index !== -1) {
        productsArray.splice(index, 1);

        productsArray.forEach((p, index) => {
            p.id = index + 1;
        });
        res.send({ status: 'success', message: 'product deleted' })
    } else {
        res.status(404).send({ status: 'error', error: 'product not found' });
    }
});
//################## Método DELETE ##################

export {productsArray};
export default router;

