// Importa los polyfills necesarios
import 'core-js/es7/reflect';
import 'zone.js/dist/zone';

// Agrega el polyfill para el módulo 'path'
(window as any).global = window;
(window as any).process = {
  env: { DEBUG: undefined },
};

// Importa el módulo 'path'
import 'path';