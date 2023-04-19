# Desafio4_RouterMulter__Oliver_Zapata

## Pasos para ejecutarlo

- Seleccionar el archivo index.js y abrir en terminal integrada (Es decir abrir la consola)
- Teniéndo NodeJS instalado, instalar la dependencia express con el siguiente comando: npm install express
- Colocar el comando: node index.js estándo en la caperta src, si no se está en el carpeta src entonces colocar: node src/index.js


## Guía de métodos

En el archivo principal index.js usa 2 routers:

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

### Métodos del router products.router.js
- Método GET<br>
http://localhost:8080/api/products

- Método GET por id<br>
http://localhost:8080/api/products/:pid <br>
Una vez creado un producto se coloca su id como valor en el parámetro :pid

- Método POST<br>
http://localhost:8080/api/products <br>
Se pueden crear productos mediante postman u otra herramienta, a continuación pasaré algunos productos de ejemplo que se pueden utilizar:

{
    "title": "Silla de oficina",
    "description": "Silla de oficina en excelente estado",
    "price": 2000,
    "thumbnail": [
        "https://i.ibb.co/P9Ytc2W/1-Silla-de-oficina.png"
    ],
    "stock": 20,
    "category": "Productos del hogar"
}


{
    "title": "Smartwatch",
    "description": "reloj digital deportivo",
    "price": 3000,
    "thumbnail": [
        "https://i.ibb.co/0rzKD6R/23-Smartwatch.png"
    ],
    "stock": 15,
    "category": "Electrodomésticos"
}


{
    "title": "Cafetera",
    "description": "El mejor producto de cocina para las mañanas",
    "price": 500,
    "thumbnail": [
        "https://i.ibb.co/HYFpnNB/18-Cafetera.jpg"
    ],
    "stock": 30,
    "category": "Productos de cocina"
}


- Método PUT<br>
http://localhost:8080/api/products/:pid <br>
Se actualizará el producto con el id específicado


- Método DELETE<br>
http://localhost:8080/api/products/:pid <br>
Se borrará el producto con el id específicado


### Métodos del router carts.router.js
- Método POST<br>
http://localhost:8080/api/carts

- Método GET por ID<br>
http://localhost:8080/api/carts/1<br>
Una vez creado un carrito se coloca su id como valor en el parámetro :pid

- Método POST (para pasar un producto al carrito)<br>
http://localhost:8080/api/carts/:cid/product/:pid<br>
Aquí se usa el id del carrito en el parámetro :cid para especificar en que carrito quiero poner el producto, y se usa el id del producto en el parámetro :pid para especificar que producto a poner en el carrito

#### ------- Extras -------

- Método DELETE (para quitar un producto del carrito)<br>
http://localhost:8080/api/carts/:cid/product/:pid<br>
Al igual que el método anterior se usa el id del carrito en el parámetro :cid para especificar de que carrito eliminar el producto, y se usa el id del producto en el parámetro :pid para especificar que producto eliminar del carrito.<br>
Cuando se elimina un producto con cierta cantidad (por ejemplo 8) esta va disminuyendo, pero si la cantidad es 1 y se ejecuta este método lo borrará al no quedar ninguna cantidad de ese producto

- Método DELETE (para eliminar carrito)<br>
http://localhost:8080/api/carts/:cid<br>
Se borrará el carrito con el carrito con el id específicado

