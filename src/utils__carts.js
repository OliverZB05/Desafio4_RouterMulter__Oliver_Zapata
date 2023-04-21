import fs from 'fs';

export function readCarts() {
    const data = fs.readFileSync('./public/carts.json');
    return JSON.parse(data);
}

export function writeCarts(carts) {
    fs.writeFileSync('./public/carts.json', JSON.stringify(carts));
}

