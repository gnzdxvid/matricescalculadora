# 🌐 Despliegue 24/7 - Calculadora de Matrices

## 📋 Opciones de Despliegue

### 🚀 **Opción 1: Vercel (Recomendado)**
**Gratis y fácil de configurar**

1. **Crear cuenta en Vercel**:
   - Ve a [vercel.com](https://vercel.com)
   - Regístrate con GitHub/GitLab

2. **Subir a GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Calculadora de Matrices"
   git branch -M main
   git remote add origin https://github.com/tu-usuario/calculadora-matrices.git
   git push -u origin main
   ```

3. **Desplegar en Vercel**:
   - Conecta tu cuenta de GitHub a Vercel
   - Importa el repositorio
   - Automáticamente se despliega

4. **URL pública**: `https://tu-nombre.vercel.app`

---

### 🌐 **Opción 2: Netlify**
**Gratis y con dominio personalizado**

1. **Construir el proyecto**:
   ```bash
   npm run build
   ```

2. **Subir carpeta `build` a Netlify**:
   - Ve a [netlify.com](https://netlify.com)
   - Arrastra la carpeta `build`
   - Publica instantáneamente

3. **URL pública**: `https://tu-nombre.netlify.app`

---

### 🐳 **Opción 3: GitHub Pages**
**Gratis y con GitHub**

1. **Configurar `package.json`**:
   ```json
   "homepage": "https://tu-usuario.github.io/calculadora-matrices"
   ```

2. **Construir y desplegar**:
   ```bash
   npm run build
   git add build/
   git commit -m "Add build"
   git subtree push --prefix build origin gh-pages
   ```

3. **URL pública**: `https://tu-usuario.github.io/calculadora-matrices`

---

### 📱 **Beneficios del Despliegue Online**

✅ **Acceso 24/7**: Tu profesora puede acceder anytime  
✅ **QR permanente**: El código QR siempre funciona  
✅ **Sin instalación**: No necesita descargar nada  
✅ **Multiplataforma**: Funciona en cualquier dispositivo  
✅ **Actualizaciones automáticas**: Cada cambio se refleja instantáneamente  

---

## 🎯 **Recomendación Personal**

**Usa Vercel** porque:
- ✅ Más rápido y fácil
- ✅ URL corta y profesional
- ✅ HTTPS automático
- ✅ Despliegue instantáneo
- ✅ Preview de cambios
- ✅ Analytics incluidos

---

## 📷 **Código QR Permanente**

Una vez desplegado, el código QR apuntará siempre a la misma URL, permitiendo:
- **Escaneo rápido** desde cualquier dispositivo
- **Compartir fácil** con otros estudiantes
- **Acceso directo** sin escribir URLs
- **Presentación profesional** para tu tarea

---

## 🔧 **Comandos Útiles**

```bash
# Construir para producción
npm run build

# Probar localmente
npm start

# Verificar construcción
ls build/
```

---

## 📞 **Soporte**

Si necesitas ayuda con el despliegue:
1. **Vercel**: [vercel.com/docs](https://vercel.com/docs)
2. **Netlify**: [netlify.com/docs](https://netlify.com/docs)
3. **GitHub Pages**: [pages.github.com](https://pages.github.com)

**Elige la opción que prefieras y tendrás tu calculadora online en minutos!** 🚀
