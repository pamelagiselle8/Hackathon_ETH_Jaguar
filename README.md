# **REDE**

Este proyecto busca crear un espacio seguro y abierto para que los estudiantes expresen sus experiencias y consejos dentro de la universidad. A través de un agente de IA, cada comentario es evaluado para evitar palabras ofensivas y, en caso necesario, se sugieren reformulaciones que fomenten el respeto y la construcción de ideas. Una vez validados, los comentarios se almacenan en la blockchain de Ethereum, garantizando inmutabilidad, seguridad y transparencia. Los estudiantes pueden expresar su acuerdo o desacuerdo mediante votos, manteniendo siempre el anonimato de su identidad, lo que refuerza la libertad de expresión dentro de un entorno descentralizado y confiable.

---

## **Requisitos previos**

* **Node.js (>= 18.x)** debe estar instalado en tu sistema.
* **npm** (incluido con Node).

---

## **Configuración**

1. Clonar el repositorio:

```bash
git clone https://github.com/pamelagiselle8/Hackathon_ETH_Jaguar
cd Hackathon_ETH_Jaguar
```

2. Instalar dependencias:

```bash
npm install
```

3. Actualizar el archivo `.env_template`, copiarlo a `.env` y completar los valores requeridos, incluyendo el **URL del agente de IA** que corre en el otro repositorio.

Ejemplo de variables:

```env
VITE_LOGO=src/assets/logo.svg
VITE_PUBLIC_RPC_URL="https://arbitrum-sepolia.drpc.org"
VITE_PUBLIC_CHAIN_ID="421614"
VITE_PUBLIC_CONTRACT_ADDRESS="0xA3d4213c9f492EC63d61d734e0c7a9C6eFcc79c0"
VITE_AI_BACKEND_URL="http://localhost:3000"
```

El agente se encuentra en este repositorio: [ModeloHackathonAI](https://github.com/Diazgerard/ModeloHackathonAI). Asegúrate de tenerlo corriendo en tu máquina para que la DApp pueda validar los comentarios.

---

## **Ejecutar el proyecto**

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`.

---

⚡ Ahora los estudiantes pueden iniciar sesión, compartir comentarios validados y participar con opiniones inmutables en la blockchain.
