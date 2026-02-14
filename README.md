# 🧮 Calculadora de Matrices Interactiva

Una aplicación web moderna para realizar operaciones con matrices 3×3, desarrollada con React, TypeScript y Tailwind CSS.

## ✨ Características

### 🎯 Funcionalidades Principales
- **Llenar matrices** con números aleatorios del 0 al 9
- **Suma de matrices** con visualización paso a paso
- **Resta de matrices** con proceso detallado
- **Multiplicación de matrices** con fórmulas matemáticas
- **Interfaz moderna** y responsiva

### 🎨 Diseño y Experiencia
- **Interfaz moderna** con gradientes y animaciones
- **Visualización del proceso** matemático paso a paso
- **Diseño responsivo** para todos los dispositivos
- **Animaciones suaves** y transiciones elegantes
- **Colores intuitivos** para diferenciar matrices

### 📊 Proceso Matemático
La aplicación muestra detalladamente cómo se realizan las operaciones:

#### Suma: `C[i][j] = A[i][j] + B[i][j]`
- Muestra cada posición individualmente
- Fórmula: `2 + 5 = 7`

#### Resta: `C[i][j] = A[i][j] - B[i][j]`
- Proceso similar a la suma
- Fórmula: `8 - 3 = 5`

#### Multiplicación: `C[i][j] = Σ(A[i][k] × B[k][j])`
- Muestra el producto punto completo
- Fórmula: `1×2 + 3×4 + 5×6 = 44`

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js (versión 14 o superior)
- npm o yarn

### Instalación
```bash
# Clonar o descargar el proyecto
cd tareaalgebra

# Instalar dependencias
npm install

# Iniciar la aplicación
npm start
```

### Uso
1. Abre la aplicación en tu navegador (http://localhost:3000)
2. Usa los botones del menú para:
   - **Llenar Matriz A**: Genera números aleatorios para la primera matriz
   - **Llenar Matriz B**: Genera números aleatorios para la segunda matriz
   - **Sumar**: Realiza la suma y muestra el proceso
   - **Restar**: Realiza la resta y muestra el proceso
   - **Multiplicar**: Realiza la multiplicación y muestra el proceso
   - **Salir/Reiniciar**: Limpia todas las matrices

## 🛠️ Tecnologías

- **React 18** - Biblioteca principal de UI
- **TypeScript** - Tipado estático y mejor desarrollo
- **Tailwind CSS** - Framework de CSS moderno
- **Vite** - Build tool rápido y moderno

## 📁 Estructura del Proyecto

```
tareaalgebra/
├── public/
│   └── index.html
├── src/
│   ├── App.tsx          # Componente principal
│   ├── index.tsx        # Punto de entrada
│   └── index.css        # Estilos globales
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── README.md
```

## 🎯 Características Técnicas

### Componentes React
- **MatrixCalculator**: Componente principal con toda la lógica
- Estados manejados con hooks de React
- Tipado completo con TypeScript

### Estilos y Diseño
- **Tailwind CSS** para estilos rápidos y consistentes
- **Animaciones personalizadas** con CSS keyframes
- **Diseño responsive** con grid y flexbox
- **Gradientes modernos** y efectos hover

### Lógica Matemática
- **Operaciones vectorizadas** con map de JavaScript
- **Procesos detallados** para cada operación
- **Validaciones** para evitar operaciones con matrices vacías

## 🎓 Objetivo Educativo

Esta aplicación está diseñada para ayudar a estudiantes de álgebra a:

1. **Visualizar** las operaciones matriciales
2. **Entender** el proceso paso a paso
3. **Practicar** con diferentes valores
4. **Comprobar** sus resultados manualmente

## 🚀 Mejoras Futuras

- [ ] Soporte para matrices de diferentes tamaños
- [ ] Operaciones adicionales (determinante, inversa)
- [ ] Modo oscuro/claro
- [ ] Exportación de resultados
- [ ] Historial de operaciones

## 📄 Licencia

Proyecto educativo desarrollado para la clase de álgebra.
