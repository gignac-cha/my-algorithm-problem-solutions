export const getLanguageFromExtensions = (name: string) => {
  if (name.endsWith('.c')) {
    return 'c';
  } else if (name.endsWith('.css')) {
    return 'css';
  } else if (name.endsWith('.html')) {
    return 'html';
  } else if (name.endsWith('.java')) {
    return 'java';
  } else if (name.endsWith('.js')) {
    return 'javascript';
  } else if (name.endsWith('.json')) {
    return 'json';
  } else if (name.endsWith('.py')) {
    return 'python';
  } else if (name.endsWith('.ts')) {
    return 'typescript';
  }
  return 'text';
};

export const getTheme = () => {
  if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    return 'vs';
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'vs-dark';
  }
};
