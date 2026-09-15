const express = require("express");
const swaggerUi = require("swagger-ui-express");

const app = express();
app.use(express.json());

const products = [];

const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Tienda API",
    version: "1.0.0",
    description: "API para añadir productos y consultar su precio."
  },
  paths: {
    "/products": {
      get: {
        summary: "Lista productos disponibles",
        responses: {
          200: {
            description: "Listado de productos",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: { type: "integer" },
                      name: { type: "string" },
                      price: { type: "number" }
                    }
                  }
                }
              }
            }
          }
        }
      },
      post: {
        summary: "Añade un producto",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name", "price"],
                properties: {
                  name: { type: "string" },
                  price: { type: "number", minimum: 0 }
                }
              }
            }
          }
        },
        responses: {
          201: {
            description: "Producto creado"
          },
          400: {
            description: "Datos inválidos"
          }
        }
      }
    }
  }
};

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/products", (_req, res) => {
  res.json(products);
});

app.post("/products", (req, res) => {
  const { name, price } = req.body || {};

  if (typeof name !== "string" || name.trim() === "" || typeof price !== "number" || Number.isNaN(price) || price < 0) {
    return res.status(400).json({ error: "name y price válidos son requeridos" });
  }

  const product = {
    id: products.length + 1,
    name: name.trim(),
    price
  };

  products.push(product);
  return res.status(201).json(product);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
