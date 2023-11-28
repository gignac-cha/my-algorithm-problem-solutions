export const getLanguageFromExtensions = (
  name: string,
): MonacoEditorLanguage | undefined => {
  if (name.endsWith('.bat')) {
    return 'bat';
  } else if (
    name.endsWith('.c') ||
    name.endsWith('.cpp') ||
    name.endsWith('.h') ||
    name.endsWith('.hpp')
  ) {
    return 'cpp';
  } else if (name.endsWith('.cs')) {
    return 'csharp';
  } else if (name.endsWith('.css')) {
    return 'css';
  } else if (name.endsWith('.go')) {
    return 'go';
  } else if (name.endsWith('.html') || name.endsWith('.htm')) {
    return 'html';
  } else if (name.endsWith('.java')) {
    return 'java';
  } else if (name.endsWith('.js')) {
    return 'javascript';
  } else if (name.endsWith('.json')) {
    return 'json';
  } else if (name.endsWith('.kt')) {
    return 'kotlin';
  } else if (name.endsWith('.md')) {
    return 'markdown';
  } else if (name.endsWith('.ps1')) {
    return 'powershell';
  } else if (name.endsWith('.py')) {
    return 'python';
  } else if (name.endsWith('.rs')) {
    return 'rust';
  } else if (name.endsWith('.scala')) {
    return 'scala';
  } else if (name.endsWith('.sh')) {
    return 'shell';
  } else if (name.endsWith('.sql')) {
    return 'sql';
  } else if (name.endsWith('.ts')) {
    return 'typescript';
  } else if (name.endsWith('.xml')) {
    return 'xml';
  } else if (name.endsWith('.yaml') || name.endsWith('.yml')) {
    return 'yaml';
  }
};

export const languages: MonacoEditorLanguage[] = [
  'bat',
  'csharp',
  'css',
  'cpp',
  'go',
  'h',
  'html',
  'java',
  'javascript',
  'json',
  'kotlin',
  'markdown',
  'powershell',
  'python',
  'rust',
  'scala',
  'shell',
  'sql',
  'typescript',
  'xml',
  'yaml',
];
export const extendedLanguages: ExtendedMonacoEditorLanguage[] = [
  ...languages,
  'c',
  'h',
  'hpp',
];

export const getLanguageExtensions = (
  language: ExtendedMonacoEditorLanguage,
): string => {
  switch (language) {
    case 'csharp':
      return '.cs';
    case 'javascript':
      return '.js';
    case 'kotlin':
      return '.kt';
    case 'markdown':
      return '.md';
    case 'powershell':
      return '.ps1';
    case 'python':
      return '.py';
    case 'rust':
      return '.rs';
    case 'shell':
      return '.sh';
    case 'typescript':
      return '.ts';
    default:
      return `.${language}`;
  }
};

export const getLanguageText = (
  language: ExtendedMonacoEditorLanguage,
): string => {
  switch (language) {
    case 'bat':
      return 'Batch';
    case 'c':
      return 'C';
    case 'cpp':
      return 'C++';
    case 'csharp':
      return 'C#';
    case 'css':
      return 'CSS';
    case 'go':
      return 'Go';
    case 'h':
      return 'C Header';
    case 'html':
      return 'HTML';
    case 'hpp':
      return 'C++ Header';
    case 'java':
      return 'Java';
    case 'javascript':
      return 'JavaScript';
    case 'json':
      return 'JSON';
    case 'kotlin':
      return 'Kotlin';
    case 'markdown':
      return 'Markdown';
    case 'powershell':
      return 'PowerShell';
    case 'python':
      return 'Python';
    case 'rust':
      return 'Rust';
    case 'scala':
      return 'Scala';
    case 'shell':
      return 'Shell Script';
    case 'sql':
      return 'SQL';
    case 'typescript':
      return 'TypeScript';
    case 'xml':
      return 'XML';
    case 'yaml':
      return 'YAML';
  }
};

export const getTheme = () => {
  if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    return 'vs';
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'vs-dark';
  }
};
