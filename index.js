// index.js - API REST sencilla con Express
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Datos simulados (en memoria, se borran al reiniciar)
// Si quieres, luego los conectamos a Supabase o MySQL
let clientes = [
  { id: 1, nombre: "Ana", celular: "3001234567", email: "ana@mail.com" }
];

// GET: lista todos los clientes
app.get('/clientes', (req, res) => {
  res.json(clientes);
});

// GET por id
app.get('/clientes/:id', (req, res) => {
  const cliente = clientes.find(c => c.id == req.params.id);
  if (!cliente) return res.status(404).json({ error: "Cliente no encontrado" });
  res.json(cliente);
});

// POST: crea un cliente
app.post('/clientes', (req, res) => {
  const nuevo = { id: clientes.length + 1, ...req.body };
  clientes.push(nuevo);
  res.status(201).json(nuevo);
});

// PUT: actualiza cliente
app.put('/clientes/:id', (req, res) => {
  const cliente = clientes.find(c => c.id == req.params.id);
  if (!cliente) return res.status(404).json({ error: "Cliente no encontrado" });
  Object.assign(cliente, req.body);
  res.json(cliente);
});

// DELETE: elimina cliente
app.delete('/clientes/:id', (req, res) => {
  const index = clientes.findIndex(c => c.id == req.params.id);
  if (index === -1) return res.status(404).json({ error: "Cliente no encontrado" });
  const eliminado = clientes.splice(index, 1);
  res.json({ eliminado });
});

// Puerto dinámico para Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ API corriendo en puerto ${PORT}`));
