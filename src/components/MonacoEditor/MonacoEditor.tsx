import { editor } from 'monaco-editor/esm/vs/editor/editor.api';
import { FunctionComponent, useEffect, useRef, useState } from 'react';
import { getLanguageFromExtensions } from '../../utilities/monacoEditor';
import { styles } from './styles';
import './userWorker';

interface MonacoEditorProperties {
  value: string;
  language: ReturnType<typeof getLanguageFromExtensions>;
  theme?: string;
}

export const MonacoEditor: FunctionComponent<MonacoEditorProperties> = ({
  value,
  language,
  theme,
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<editor.IStandaloneCodeEditor>();

  useEffect(() => {
    if (elementRef.current) {
      editorRef.current = editor.create(elementRef.current, {
        value,
        language,
        theme,
        scrollBeyondLastLine: false,
        readOnly: true,
      });
      editorRef.current.layout({
        width: elementRef.current.clientWidth,
        height: editorRef.current.getContentHeight(),
      });
    }
    return () => editorRef.current?.dispose();
  }, [language, theme, value]);

  useEffect(() => {
    const onResize = () => {
      if (elementRef.current && editorRef.current) {
        editorRef.current.layout({
          width: elementRef.current.clientWidth,
          height: editorRef.current.getContentHeight(),
        });
      }
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (theme) {
      editor.setTheme(theme);
      setLoading(true);
      setTimeout(() => setLoading(false), 1000 / 6);
    }
  }, [theme]);

  return (
    <div
      css={[styles.container, isLoading && styles.loadingContainer]}
      ref={elementRef}
    ></div>
  );
};
