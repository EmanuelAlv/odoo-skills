#!/usr/bin/env node
const fs = require("fs");
const os = require("os");
const path = require("path");

const NAME = "odoo-module-icons";
const args = process.argv.slice(2);

if (args.includes("-h") || args.includes("--help")) {
  console.log(`Uso: npx ${NAME} [opciones]

Instala la skill ${NAME} para Claude Code.

  (sin opciones)    Global, en ~/.claude/skills/${NAME}
  -p, --project     En el proyecto actual, en ./.claude/skills/${NAME}
  -d, --dir <ruta>  En <ruta>/${NAME} (para otros agentes)
  -h, --help        Muestra esta ayuda`);
  process.exit(0);
}

let base = path.join(os.homedir(), ".claude", "skills");
if (args.includes("-p") || args.includes("--project")) {
  base = path.join(process.cwd(), ".claude", "skills");
}
const dirIndex = args.findIndex((a) => a === "-d" || a === "--dir");
if (dirIndex !== -1) {
  if (!args[dirIndex + 1]) {
    console.error("Falta la ruta después de --dir");
    process.exit(1);
  }
  base = path.resolve(args[dirIndex + 1]);
}

const src = path.join(__dirname, "..", "skill");
const dest = path.join(base, NAME);
const updating = fs.existsSync(dest);

fs.rmSync(dest, { recursive: true, force: true });
fs.mkdirSync(base, { recursive: true });
fs.cpSync(src, dest, { recursive: true });

console.log(`✓ ${NAME} ${updating ? "actualizada" : "instalada"} en ${dest}`);
console.log("  Pídele a tu agente: \"crea el icono para mi módulo de Odoo ...\"");
