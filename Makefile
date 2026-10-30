# =====================================================================
# Makefile — Ruta de Titulación (MVP React)
# Uso: make <objetivo>   (sin objetivo, muestra esta ayuda)
# =====================================================================

.DEFAULT_GOAL := help
.PHONY: help install dev host build preview clean reinstall branch

help: ## Muestra esta ayuda
	@echo "Objetivos disponibles:"
	@grep -E '^[a-z]+:.*## ' $(MAKEFILE_LIST) | awk -F ':.*## ' '{printf "  make %-10s %s\n", $$1, $$2}'

# Instala dependencias solo si falta node_modules o cambió package.json
node_modules: package.json
	npm install
	@touch node_modules

install: node_modules ## Instala las dependencias (si hace falta)

dev: node_modules ## Inicia el servidor de desarrollo (instala antes si falta)
	npm run dev

host: node_modules ## Servidor accesible desde la red local (para probar en el celular)
	npm run dev -- --host

build: node_modules ## Compila la versión de producción en dist/
	npm run build

preview: build ## Compila y sirve localmente la versión de producción
	npm run preview

clean: ## Borra dist/ y node_modules/
	rm -rf dist node_modules

reinstall: clean install ## Borra todo y vuelve a instalar desde cero