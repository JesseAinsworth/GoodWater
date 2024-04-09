// export const themes = {
//     light: {
//       // Colores para tema claro
//       // Define aquí todos los colores para el tema claro
//     },
//     dark: {
//       // Colores para tema oscuro
//       // Define aquí todos los colores para el tema oscuro
//     },
//   };

export const themes = {
  light: {
    // Colores para tema claro
    primary: '#397bc2',
    secondary: '#6c757d',
    success: '#28a745',
    danger: '#dc3545',
    warning: '#ffc107',
    info: '#17a2b8',
    light: '#f8f9fa',
    dark: '#343a40',
    white: '#ffffff',
    black: '#000000',
    textPrimary: '#212529',
    textSecondary: '#6c757d',
    textLight: '#ffffff',
    textDark: '#000000',
    background: '#000000', //f8f9fa
    border: '#15181a',
    placeholder: '#6c757d',
    disabled: '#6c757d',
    divider: '#ced4da',
    overlay: 'rgba(0, 0, 0, 0.7)',
    shadow: 'rgba(0, 0, 0, 0.8)',
    muted: '#6c757d',
    link: '#007bff',
  },
  dark: {
    // Colores para tema oscuro
    primary: '#007bff',
    secondary: '#6c757d',
    success: '#28a745',
    danger: '#dc3545',
    warning: '#ffc107',
    info: '#17a2b8',
    light: '#f8f9fa',
    dark: '#343a40',
    white: '#ffffff',
    black: '#000000',
    textPrimary: '#ffffff',
    textSecondary: '#ced4da',
    textLight: '#ffffff',
    textDark: '#000000',
    background: '#343a40',
    border: '#6c757d',
    placeholder: '#6c757d',
    disabled: '#6c757d',
    divider: '#6c757d',
    overlay: 'rgba(255, 255, 255, 0.7)',
    shadow: 'rgba(255, 255, 255, 0.2)',
    muted: '#6c757d',
    link: '#007bff',
  },
};

export const fonts = {
  regular: 'Arial',
  bold: 'Arial-Bold',
  italic: 'Arial-Italic',
  boldItalic: 'Arial-BoldItalic',
  // Agrega más fuentes si es necesario
};

// Función para obtener el tema seleccionado
export const getTheme = themeName => {
  // Devuelve el tema seleccionado o el tema claro por defecto si no se proporciona un nombre de tema válido
  return themes[themeName] || themes.light;
};

// Ejemplo de cómo se podría utilizar esta función:
// const selectedTheme = getTheme('dark'); // Esto seleccionaría el tema oscuro
