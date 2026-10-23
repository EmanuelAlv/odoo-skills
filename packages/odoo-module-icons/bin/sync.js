#!/usr/bin/env node
// Copia la skill desde skills/odoo-module-icons antes de empaquetar (fuente única).
const fs = require("fs");
const path = require("path");

const src = path.resolve(__dirname, "../../../skills/odoo-module-icons");
const dest = path.resolve(__dirname, "../skill");

fs.rmSync(dest, { recursive: true, force: true });
fs.cpSync(src, dest, { recursive: true });
console.log(`skill copiada: ${src} -> ${dest}`);
