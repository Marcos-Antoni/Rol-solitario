# Generador de NPC

Este proyecto es un generador de NPC para juegos de rol o historias. Creé este proyecto porque me parecía una forma entretenida de usar la IA. Pienso actualizar la app web con más funcionalidades y mejorar la interfaz de usuario.

## Estructura del Proyecto

- **src/**: Contiene el código fuente de la aplicación.
  - **app/**: Aquí se encuentran los componentes de React y las utilidades.
    - **components/**: Componentes reutilizables como `Button`, `TextAreaComponent`, y `NPCGenerator`.
    - **utils/**: Funciones utilitarias como `CreateRandomSentence` y manejo de URLs.
    - **server/**: Contiene la lógica para interactuar con la API de OpenAI.
    - **types/**: Definiciones de tipos TypeScript para asegurar la consistencia en el uso de datos.
- \***\*test**/\*\*: Contiene pruebas automatizadas para asegurar que los componentes y funciones funcionan correctamente. Utiliza `vitest` para las pruebas.

## Cómo Funciona

1. **Interfaz de Usuario**: La aplicación presenta una interfaz donde los usuarios pueden ingresar diferentes atributos para el NPC, como contexto y generadores aleatorios para la motivación, personalidad y alineamientos.

2. **Generación de NPC**:

   - Cuando el usuario hace clic en el botón "Generar NPC", se recopilan los datos generados.
   - Se verifica que todos los campos requeridos estén completos.
   - Si falta información, se muestra un mensaje de error.
   - Si todos los datos están presentes, se envían a la API de OpenAI para generar una descripción del NPC.

3. **Uso de la API de OpenAI**:

   - La función `obtenerRespuesta` en `OpenAI.ts` se encarga de enviar los datos a la API y recibir la respuesta.
   - La respuesta se muestra en la interfaz de usuario.

4. **Manejo de URLs**:
   - La aplicación utiliza la URL para almacenar el estado de los datos ingresados, lo que permite que los usuarios compartan enlaces con configuraciones específicas de NPC.

## Pruebas

El proyecto incluye pruebas automatizadas para asegurar que los componentes y funciones se comporten como se espera. Las pruebas se encuentran en la carpeta `__test__` y se pueden ejecutar utilizando el comando:

```bash
npm run test
```

## Requisitos

Asegúrate de tener instalado Node.js y npm. Puedes instalar las dependencias del proyecto ejecutando:

1. Crea un archivo `.env` en la raíz del proyecto y agrega tu clave de API de OpenAI:

   ```env
   OPENAI_KEY = [Tu clave de API de OpenAI]
   ```

2. Ejecuta los siguientes comandos en la terminal:
   ```bash
   npm install
   ```

---

¡Gracias por tu interés en el Generador de NPC! Si tienes alguna pregunta, no dudes en abrir un issue en el repositorio.
