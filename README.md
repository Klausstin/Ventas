# Gran Berta Group - Portal de pedidos

Pagina estatica e interactiva para orientar clientes antes de una cotizacion formal.

## Que incluye

- Acceso previo con nombre, empresa, email o telefono.
- Selector por unidad de negocio: Gran Berta, GB Films y Bani VFX.
- Servicios, entregables, calidad, alcance y urgencia.
- Rangos orientativos de inversion y tiempos.
- Resumen listo para enviar por WhatsApp.

## Como publicarlo en GitHub Pages

1. Subi `index.html`, `styles.css`, `script.js` y este `README.md` al repositorio.
2. En GitHub, entra a `Settings` -> `Pages`.
3. En `Build and deployment`, elegi `Deploy from a branch`.
4. Selecciona la rama principal y la carpeta `/root`.
5. Guarda los cambios.

## Ajustes importantes

En `script.js`, al principio, cambia estos valores:

```js
const CONFIG = {
  ownerWhatsapp: "5491100000000",
  leadEndpoint: "",
  currency: "USD",
};
```

- `ownerWhatsapp`: reemplazar por tu numero con codigo de pais, sin signos ni espacios.
- `leadEndpoint`: opcional. Para que los datos te lleguen automaticamente, conectar un servicio de formularios como Formspree, Basin, Make, Zapier o un endpoint propio.
- `currency`: moneda visible en los rangos.

Los precios, tiempos, servicios e inclusiones tambien se editan en `script.js`, dentro del objeto `units`.

## Nota sobre privacidad

El filtro de entrada funciona como barrera comercial liviana. En una pagina estatica no existe seguridad real para ocultar precios: alguien con conocimientos tecnicos puede inspeccionar el codigo. Si necesitás acceso privado real, conviene agregar backend, login o una lista de invitados.
