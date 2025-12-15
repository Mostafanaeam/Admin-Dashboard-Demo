import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fs from "fs";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const dbFile = "./data.json";
let db = { orders: [], prices: [], sizes: [], customers: [] };

// Load data from file if exists
if (fs.existsSync(dbFile)) {
  try {
    const data = fs.readFileSync(dbFile, "utf8");
    db = JSON.parse(data);
  } catch (err) {
    console.error("Error reading db file", err);
  }
} else {
  // Initial dummy data
  db.orders = [
    {
      id: 1,
      customerName: "Ali",
      customerPhone: "0123456789",
      items: ["Item1"],
      totalPrice: 100,
      status: "new",
      createdAt: new Date().toISOString(),
    },
  ];
  db.prices = [{ id: 1, name: "Item1", price: 100 }];
  db.sizes = [{ id: 1, name: "Small" }];
  db.customers = [{ id: 1, name: "Ali", phone: "0123456789" }];
  try {
    fs.writeFileSync(dbFile, JSON.stringify(db, null, 2));
  } catch (err) {
    console.error("Error writing init db file", err);
  }
}

// Helper to save
const saveDb = () => {
  try {
    fs.writeFileSync(dbFile, JSON.stringify(db, null, 2));
  } catch (err) {
    console.error("Error saving db", err);
  }
};

// Routes
app.get("/orders", (req, res) => res.json(db.orders));
app.patch("/orders/:id/status", (req, res) => {
  const order = db.orders.find((o) => o.id === +req.params.id);
  if (!order) return res.status(404).send("Order not found");
  order.status = req.body.status;
  saveDb();
  res.send(order);
});

app.get("/prices", (req, res) => res.json(db.prices));
app.patch("/prices/:id", (req, res) => {
  const item = db.prices.find((p) => p.id === +req.params.id);
  if (!item) return res.status(404).send("Price item not found");
  item.price = req.body.price;
  saveDb();
  res.send(item);
});

app.get("/sizes", (req, res) => res.json(db.sizes));
app.post("/sizes", (req, res) => {
  const newSize = { id: Date.now(), ...req.body };
  db.sizes.push(newSize);
  saveDb();
  res.send(newSize);
});

app.get("/customers", (req, res) => res.json(db.customers));
app.post("/customers", (req, res) => {
  const newCustomer = { id: Date.now(), ...req.body };
  db.customers.push(newCustomer);
  saveDb();
  res.send(newCustomer);
});

app.listen(PORT, () =>
  console.log(`Backend running on http://localhost:${PORT}`)
);
