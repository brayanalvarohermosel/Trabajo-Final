# Superhero Fights — Botones y comportamiento

Este pequeño proyecto muestra héroes/villanos y tiene controles interactivos. Toda la lógica de interacción está en `main.js`.

## Botones y qué hacen

- **Buscar** (`#searchBtn`): toma lo que escribes en la caja `#heroInput` y hace una petición a `node.php?name=...`. Los resultados se muestran en la sección de resultados y aparece un mensaje (toast) que indica si la búsqueda está en curso, si hubo resultados o si ocurrió un error.

- **⚔️ Atacar** (`#btnAttack`): muestra un mensaje breve (toast) indicando que el jugador ataca con fuerza.

- **🛡️ Defenderse** (`#btnDefend`): muestra un mensaje (toast) diciendo que el jugador se protege con un escudo.

- **✨ Usar habilidad** (`#btnSkill`): muestra un mensaje (toast) indicando que se usa una habilidad especial.
