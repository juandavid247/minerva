#!/bin/bash

# Script para restaurar los archivos originales del proyecto Minerva

echo "Restaurando archivos originales..."

# Regenerar componentes desde el HTML original
cd /home/juanda/minerva/minerva-app
node scripts/convert_template.cjs

echo "✓ Archivos regenerados desde el HTML original"
echo ""
echo "Archivos restaurados:"
echo "  - src/components/MinervaForm.jsx"
echo "  - src/components/MinervaForm.css"
echo ""
echo "Para completar la restauración, reinicia el servidor de desarrollo:"
echo "  npm run dev"
