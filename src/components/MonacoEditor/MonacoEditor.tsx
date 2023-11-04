import { editor } from 'monaco-editor/esm/vs/editor/editor.api';
import { FunctionComponent, useEffect, useRef } from 'react';
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

  return <div css={styles.container} ref={elementRef}></div>;
};
