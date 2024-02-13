# Runat Ecommerce
## Visión General

RUNAT ECommerce constituye la entrega final de una App móvil de e-commerce desarrollada durante el curso "Desarrollo de Apps" de [Coderhouse](https://www.coderhouse.com).


> :warning:	**Disclaimer**:warning:	
> *Por tratarse de un ejercicio educativo, la app aún tiene inconsistencias y vacíos de diseño, idiomáticos y de flujo de procesos. Por ejemplo, mezcla el español con el inglés (pues usa una base de datos y código en inglés pero mantiene mensajes en español) y otras tantas oportunidades de mejora en UX/UI(ver sección de [oportunidades de mejora] para más detalles). Sin embargo, se asegura de mantener un flujo limpio y sin errores procurando hacer un uso óptimo y funcional de las herramientas vistas a lo largo del curso*.

###*Tecnologías Utilizadas*:

Este proyecto fué desarrollado apalancando el potencial del siguiente stack de tecnologías:

- :star2: **[Visual Studio Code](https://code.visualstudio.com/)**: un editor de código fuente ejecutable en el escritorio en el cual es posible editar, depurar y compliar código de distintos lenguajes. VSCODE fue el editor de código utilizado para desarrollar este proyecto. Sin emargo, el proyecto es apto para inspeccionarse en cualquier otro editor de código.
- :star2: **[React Native](https://reactnative.dev/)**: Una librería de javascript que utiliza APIS y componentes nativos de UI para el desarrollo de aplicaciones para dispositivos móviles. React Native fue el framework principal para el desarrollo de esta aplicación. Adicional a la tecnología base de react-native, fueron utilizadas varias dependencias derivadas de esta misma tecnología por ejemplo:
    - react-native-safe-area-context: parte del paquete de librerías requeridas para integrar react navigation en la app.
    - react-native-screens: parte del paquete de librerías requeridas para integrar react navigation en la app.
    - react-native-web: parte del paquete de librerías requeridas para integrar los componentes y APIs de react native y hacerlos interoperables con React DOM.
- :star2:**[Expo](https://expo.dev/)**: Un ecosistema (o conjunto de herramientas, librerías y servicios) para desarrollar aplicaciones nativas escritas en javascript y basadas en react native. Expo fue ecosistema principal de herramientas utilizadas en la app. Adicional a la tecnología base de expo, fueron utilizadas varias dependencias derivadas de esta misma tecnología, por ejemplo:
    - expo-file-system: brinda acceso a un sistema de archivos para almacenamiento en el dispositivo local. Esto permite que Expo Go gestione cada proyecto como un sistema de archivos independiente. 
    - expo-font: Permite la carga de fonts de la web para ser utilizados en los componentes de la app. 
    - expo-image-picker: Esta librería nos permite acceder a las fotografias del dispositivo o tomar fotos y videos con la cámara del dispositivo móvil. Fue utilizada para la implementación del perfil de usuario con fotografía. 
    - expo-location: Esta librería permite obtener la geolocalización del dispositivo que accede a la app. En la app fue implementada para obtener la ubicación del usuario que ingresa a la app. 
    - expo-status-bar: permite controlar visualmente el status bar de la app y costumizar sus detalles tales como color de fondo, de texto, esconderla y mucho más. 
    - expo-sqlite: Brinda acceso a una base de datos persistentes que pueden ser llamados a través de una API similar a una WEBSQL Api. Su persistencia permite que los datos permanezcan a través de los reinicios de la aplicación. 
- :star2:**[React](https://es.react.dev/)**: React es una biblioteca de javascript que permite construir interfaces de usuario web y nativas a partir de piezas individuales llamadas componentes. En esta app juega un papel clave a partir de la implementación de algunas de sus herramientas orientadas a manejar el estado local de cada componente (a través del hook useState) y el renderizado y manejo inicial de estados (a traves del hook useEffect).
- :star2:**[React-Navigation]()**: Es una librería para administrar el manejo de rutas y navegación en  aplicaciones React Native. En la app de Runat Commerce, react native jugó el papel central para la navegación e implementación de navegadores de distintos tipos. Por ejemplo:
    - react-navigation/bottom-tabs: genera una barra temática en la parte inferior de la pantalla, que permite brincar entre diferentes stacks o menús de navegación. 
    - react navigation/native: parte del paquete de librerías requerido para integrar react navigation en la app
    - react-navigation/native-stack: parte del paquete de librerías requerido para integrar react navigation en la app
- :star2:**[React-Redux](https://react-redux.js.org/)**: Se trata de una librería para la gestión y almacenamiento de datos globales accesibles a lo largo de toda la app. De este modo permite obtener datos de la redux-store y despachar acciones o cambios en dicha store para actualizar el estado de los datos globales. En la app, es utilizada para la gestión de datos reelevantes tales como el user, el localId del usuario, su ubicación, su foto de perfil, las órdenes por usuario e incluso la réplica local de las bases de datos remotas de categorías, productos y detalles de producto.  
    - reduxjs/toolkit: parte del conjunto de herramientas requerido para el funcionamiento óptimo de react-redux.
- :star2:**[Firebase](https://firebase.google.com/?hl=es-419)**: Una plataforma de Google con servicios para el desarrollo de apps móviles y de web. Firebase funge como la base de datos principal del proyecto, a través del consumo de dos servicios centrales: 
    - _**Firebase RealTime Database**_: una base de datos NoSQL alojada en la nube utilizada para almacentar y sincronizar datos de la aplicación. Este servicio se utilizó para la creación, gestión y e interacción entre la aplicación y las distintas bases de datos requeridas para el funcionamiento de la app (ej. bases de datos de productos, categorías de productos, detalles de productos, compras realizadas por cada usuario, ubiaciones detectadas de cada usuario, entre otras).
    - _**Firebase Authenication**_: un servicio de firebase para crear y administrar usuarios mediante correos electrónicos y contraseñas. En este proyecto, este servicio se utilizó para el registro, gestión y procesos de autenticación de los usuarios de la aplicación. 
- :star2:**[Geolib](https://www.npmjs.com/package/geolib)**: Se trata de una librería que proporciona operaciones geospaciales básicas tales como cálculo de distancias o conversión de coordenadas entre otras. En la aplicación, la biblioteca Geolib fue utilizada para simular el cálculo de distancia existente entre la ubicación del usuario de la app y la tienda física más cercana. 
- :star2:**[Yup](https://www.npmjs.com/package/yup)**: Yup es un constructor de Schemas para el parseo y validación de datos. En esta aplicación fué utilizada como la herramienta base para la validación de los datos (email y password) en las pantallas de login y signup.

## Pre-requisitos para la Emulación del proyecto. 
Para emular o levantar este proyecto, es necesario contar con algunas plataformas tecnológicas tales como `[Android Studio]()` o alguno equivalente. Si deseas utilizar Android Studio para el proceso de emulación deberás realizar lo siguiente:
1. :dart:Descargar `[Android Studio]()` e instalarlo en el dispositivo personal de desarrollo (laptop o desktop)
2. :dart:Configurar un emulador que pueda ser operado como AVD (Android Virtual Device) el cual permitirá examinar el proyecto. 
3. :dart:Instalar el SDK Platform correspondiente a nuestro entorno de desarrollo.

Posterior a esto, será necesario proceder con los pasos de descarga y configuración del proyecto descritos a continuación. 
## Descarga y Configuración del Proyecto:
Para ejecutar correctamente este proyecto, es necesario realizar las siguientes acciones de descarga y configuración:  
1. :pencil2:**Clonación del Proyecto**: Abre una consola CMD o Terminal equivalente en la carpeta o directorio donde desees alojar el proyecto. desde el directorio deseado ejectua el comando `git clone` seguido de la ubicación remota (git hub) del proyecto. Ejemplo:
```sh
git clone http://github.com/abcd/efg
```
2. :pencil2:**Ingreso a carpeta del proyecto**: Una vez que el archivo ha sido clonado, ingresa a la carpeta principal del proyecto ejecutando el comando 
```sh
cd runatEcommerce
```
3. :pencil2:**Instala las dependencias requeridas**: Posteriormente, debes instalar todas las dependencias necesarias para el correcto funcionamiento de la aplicación (aquellas listadas en al sección anterior e incluidas en el archivo `package.json` del proyecto). Para realizar la instalación debes ejecutar el comando `npm install` o su versión abreviada `npm i`.
4. :pencil2:**Configura el archivo .env**:
Finalmente, será necesario generar y configurar un archivo `.env` en el proyecto. El archivo `.env` contendrá la información confidencial de rutas especiales así como llaves y credenciales únicas de autenticación para acceder a aquellos servicios que lo requieran. Por razones de seguridad y confidencialidad, este archivo no se encuentra incluido en la copia remota alojada en Github. Ha sido omitido para su carga a través de las especificaciones del archivo `.gitignore`. En  este proyecto, los servicios de google (google firebase y google maps) incluidos en la app son los que requieren información del archivo `.env`  para operar correctamente. Por lo anterior, deberá crearse un archivo `.env` en la raiz del proyecto e incluir las siguientes claves:
```sh 
EXPO_PUBLIC_BASE_URL = https://reactnative-coder-default-rtdb.firebaseio.com/
EXPO_PUBLIC_BASE_AUTH_URL =  https://identitytoolkit.googleapis.com/v1/
EXPO_PUBLIC_AUTH_API_KEY = /*su llave de acceso a la API de los servicios de autenticación de Firebase*/
EXPO_PUBLIC_MAPS_API_KEY = /*su llave de acceso a la API de google maps*/

```

##Emulación/Ejecución

Una vez realizados los pasos anteriores es posible echar a andar el emulador y proceder a la vinculación final con el código del proyecto a través de la librería expo.

Para realizar esto, se requiere acceder al directorio raiz del proyecto desde una terminal. Estando ahí se deberá colocar el script:
```sh
npx expo start
```
Una vez realizado eso, el sistema devolverá las opciones de emular en un AVD, en un dispositivo móvil real o incluso en la web. 

El usuario/desarrollador deberá elegir la opción que mejor le parezca.

##Oportunidades de Mejora. 
Por tratarse de un proyecto educativo, esta aplicación aún tiene varias oportunidades de mejora para convertirse en un proyecto viable comercialmente hablando. Algunas de las áreas que podrían desarrollarse para acotar la brecha pendiente incluyen:
- Generación de contenido/base de datos con productos reales que puedan ser vinculados a la app y que mantengan una consistencia idiomática.
- Mejorar el flujo entre la pantalla de inicio de la aplicación y los embudos de conversión. 
- Expandir y mejorar la experiencia de compra incorporando la pasarela de pagos y finalización de la transacción. 
- Mejorar el perfil de usuario y funciones de geolocalización para incorporar puntos de venta reales y poder estimar distancias verdaderas entre la localización del usuario y las tiendas físicas. Por ahora esta función fue desarrollada a modo de "mockup" para mostrar cómo operaría. 
- Mejora del flujo de proceso de registro de usuario para incluir formulario de datos con dirección y perfiles reales, pues por ahora se encuentra diseñado de forma estática con una dirección "dummy" vinculado a un archivo json estático. 
- Mejoras visuales (de diseño con apoyo de un especialista en la materia) en todas las pantallas para crear una UI más atractiva y para incorporar un branding específico asociado a la marca del producto (ej. logo, colores oficiales,etc)
- Mejoras funcionales para la UX tales como: permitir la edición del perfil de usuario (más allá de la foto), o permitir al usuario borrar/eliminar su cuenta del sistema (flujo de cancelación de cuenta)

Las sugerencias anteriores pueden ampliarse en la medida que el proyecto se aplique a escenarios/contextos reales de una e-commerce. Dependiendo el tipo de productos y sector comercial, pudieran requerirse más mejoras o adaptaciones que las anteriormente mencionadas. 