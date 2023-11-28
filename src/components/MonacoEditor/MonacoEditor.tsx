import { editor } from 'monaco-editor/esm/vs/editor/editor.api';
import {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { PlaceholderWidget } from './PlaceholderWidget';
import { styles } from './styles';
import './userWorker';

interface MonacoEditorProperties {
  isNew: boolean;
  placeholder: string;
  onValueChange: (value?: string) => void;
}

export const MonacoEditor: FunctionComponent<
  Partial<MonacoEditorProperties> & editor.IStandaloneEditorConstructionOptions
> = ({ isNew = false, placeholder, onValueChange, value, language, theme }) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<editor.IStandaloneCodeEditor>();
  const valueRef = useRef(value);

  const placeholderWidgetRef = useRef<editor.IContentWidget>();

  const onChange = useCallback(() => {
    const value = editorRef.current?.getModel()?.getValue();
    if (onValueChange) {
      onValueChange(value);
    }
    if (value) {
      if (placeholderWidgetRef.current) {
        editorRef.current?.removeContentWidget(placeholderWidgetRef.current);
      }
    } else {
      if (placeholderWidgetRef.current) {
        editorRef.current?.addContentWidget(placeholderWidgetRef.current);
      }
    }
  }, [onValueChange]);

  useEffect(() => {
    if (elementRef.current) {
      editorRef.current = editor.create(elementRef.current, {
        value: valueRef.current,
        language,
        theme,
        scrollBeyondLastLine: isNew,
        readOnly: !isNew,
      });
      editorRef.current.onDidChangeModelContent(onChange);
      if (!isNew) {
        editorRef.current.layout({
          width: elementRef.current.clientWidth,
          height: editorRef.current.getContentHeight(),
        });
      }
      if (!placeholderWidgetRef.current && placeholder) {
        placeholderWidgetRef.current = new PlaceholderWidget({
          placeholder,
          applyFontInfo: (target: HTMLElement) =>
            editorRef.current?.applyFontInfo(target),
        });
      }
      if (!valueRef.current && placeholderWidgetRef.current) {
        editorRef.current.addContentWidget(placeholderWidgetRef.current);
      }
    }
    return () => {
      delete placeholderWidgetRef.current;
      editorRef.current?.dispose();
      delete editorRef.current;
    };
  }, [isNew, language, onChange, placeholder, theme]);

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
      css={[
        styles.container,
        isLoading && styles.loadingContainer,
        isNew && styles.newContainer,
      ]}
      ref={elementRef}
    >
      <div css={styles.placeholder}></div>
    </div>
  );
};
