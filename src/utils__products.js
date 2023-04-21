import fs from 'fs';

export function readProducts() {
    const data = fs.readFileSync('./public/products.json');
    return JSON.parse(data);
}

export function writeProducts(products) {
    fs.writeFileSync('./public/products.json', JSON.stringify(products));
}

