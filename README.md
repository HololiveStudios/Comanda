# Comanda - PWA Moderno para Restaurantes e Bares

## 1. Objetivo e Finalidade
Aplicativo PWA para garçons e operadores lançarem pedidos, fecharem contas e lerem QR Codes de mesas.

## 2. Tecnologias Utilizadas
- React, TypeScript, Vite, Redux Toolkit, html5-qrcode, Framer Motion, Tailwind CSS, PWA

## 3. Arquitetura e Estrutura de Diretórios
PWA offline-first com Redux Toolkit para controle de comandas abertas e leitor de QR Code de câmeras via `html5-qrcode`.

## 4. Principais Arquivos e Responsabilidades
- `src/App.tsx`: Painel de controle de mesas e comandas.
- `package.json`: Bibliotecas de leitura de QR code e gerenciamento de estado.

## 5. Funcionalidades Identificadas
- Leitura de QR Code na mesa do cliente
- Lançamento rápido de pratos e bebidas com observações
- Cálculo automático de taxas de serviço e total da comanda

## 6. Como Compilar ou Executar
```bash
npm install
npm run dev
```

## 7. Estado Atual do Projeto
**Completo**

## 8. Pendências e Limitações Identificadas
Impressão automática dos pedidos na impressora térmica da cozinha.
