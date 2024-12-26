# **Telegram Subscription Management**

Una plataforma para gestionar suscripciones de canales de Telegram, integrando autenticación de usuarios, pagos y control de acceso a los canales.

---

## **Características**
- Roles de usuarios: Administradores y Suscriptores.
- Planes de suscripción con duraciones y precios flexibles.
- Integración de pagos (Stripe, PayPal).
- Gestión automática de acceso a canales de Telegram.
- PostgreSQL como base de datos.
- Configuración con Docker para facilitar el despliegue.

---

## **Instrucciones de Configuración**

### **1. Clonar el Repositorio**
```bash
git clone <repository-url>
cd <repository-folder>

### **2. Instalar Dependencias**
Asegúrate de tener instalado **Node.js** y **npm** en tu sistema. Luego, ejecuta el siguiente comando para instalar las dependencias del proyecto:

```bash
npm install

### **3. Variables de Entorno**

Crea un archivo `.env` en la raíz del proyecto y agrega las siguientes variables:

```dotenv
DATABASE_URL=postgresql://postgres:password@localhost:5432/telegram_subscription
TELEGRAM_BOT_TOKEN=<your-telegram-bot-token>
TELEGRAM_API_ID=<your-telegram-api-id>
TELEGRAM_API_HASH=<your-telegram-api-hash>

### **4. Configurar la Base de Datos**

#### **Usando Docker**
1. Asegúrate de que Docker esté instalado y en ejecución en tu sistema.
2. Usa el archivo `docker-compose.yml` para levantar el servicio de PostgreSQL:
   ```bash
   docker-compose up -d

### **5. Ejecutar las Migraciones de la Base de Datos**

Utiliza Prisma para inicializar el esquema de la base de datos con las migraciones:

```bash
npx prisma migrate dev --name init

### **6. Iniciar la Aplicación**

Ejecuta el servidor de desarrollo utilizando el siguiente comando:

```bash
npm run dev

## **Scripts**

A continuación, se presentan los comandos disponibles para trabajar con el proyecto:

```bash
# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm run dev

# Ejecutar migraciones de la base de datos
npx prisma migrate dev --name init

# Generar el cliente de Prisma
npx prisma generate

# Levantar servicios en segundo plano con Docker Compose
docker-compose up -d

# Apagar los servicios de Docker Compose
docker-compose down