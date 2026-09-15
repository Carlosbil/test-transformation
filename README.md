# test-transformation
To test Transformation

Backend sencillo con Swagger para:
- Añadir productos con nombre y precio
- Exponer los productos disponibles y su precio

## Ejecutar

```bash
npm install
npm start
```

## Endpoints

- `POST /products` -> crea un producto `{ "name": "Producto", "price": 9.99 }`
- `GET /products` -> lista los productos cargados
- `GET /api-docs` -> documentación Swagger UI
