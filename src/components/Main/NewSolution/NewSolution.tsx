import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQueryClient } from '@tanstack/react-query';
import {
  ChangeEvent,
  Suspense,
  lazy,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useParams } from 'react-router-dom';
import {
  editorLanguageCacheKey,
  getEditorNameCacheKey,
  getEditorValueCacheKey,
} from '../../../constants/localStorage';
import { useAnimationFrame } from '../../../hooks/useAnimationFrame';
import { useCategoriesQuery } from '../../../queries/useCategoryQuery';
import {
  localStorageGetItemQueryKey,
  useLocalStorageMutation,
  useLocalStorageQuery,
} from '../../../queries/useLocalStorageQuery';
import { useSolutionAddMutation } from '../../../queries/useSolutionQuery';
import { commonStyles } from '../../../styles/common';
import { readFile } from '../../../utilities/file';
import {
  getLanguageExtensions,
  getLanguageFromExtensions,
  getLanguageText,
  getTheme,
} from '../../../utilities/monaco';
import { DragAndDropZone } from '../../DragAndDropZone/DragAndDropZone';
import { styles } from './styles';

const LazyMonacoEditor = lazy(() =>
  import('../../MonacoEditor/MonacoEditor').then(({ MonacoEditor }) => ({
    default: MonacoEditor,
  })),
);

const languages: ExtendedMonacoEditorLanguage[] = [
  'c',
  'cpp',
  'java',
  'javascript',
  'kotlin',
  'python',
  'typescript',
];

function* getOptions(): Generator<{
  value: ExtendedMonacoEditorLanguage;
  text: string;
}> {
  for (const language of languages) {
    switch (language) {
      case 'c':
        yield { value: 'cpp', text: getLanguageText(language) };
        break;
      default:
        yield { value: language, text: getLanguageText(language) };
        break;
    }
  }
  // yield { value: 'cpp', text: 'C' };
  // yield { value: 'cpp', text: 'C++' };
  // yield { value: 'java', text: 'Java' };
  // yield { value: 'javascript', text: 'JavaScript' };
  // yield { value: 'kotlin', text: 'Kotlin' };
  // yield { value: 'python', text: 'Python' };
  // yield { value: 'typescript', text: 'TypeScript' };
}

const acceptExtensions = languages.map(
  (language: ExtendedMonacoEditorLanguage) => getLanguageExtensions(language),
);
const accept = acceptExtensions.join(',');

const Container = () => {
  const { categoryName = '' } = useParams<RouterParameters>();

  const { data: categories } = useCategoriesQuery();

  const categoryOptions = useMemo(
    () =>
      categories.map((category: GitHubDirContent) => ({
        value: category.name,
        text: category.name,
      })),
    [categories],
  );
  const languageOptions = useMemo(() => [...getOptions()], []);

  const languageSelectRef = useRef<HTMLSelectElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const [category, setCategory] = useState<string>(categoryName);
  const onCategorychange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) =>
      setCategory(event.currentTarget.value),
    [],
  );
  const categoryData = useMemo(() => ({ name: category }), [category]);

  const queryClient = useQueryClient();

  const { data: cachedLanguage } = useLocalStorageQuery(
    editorLanguageCacheKey,
    languages[0],
  );
  const { mutateAsync: setCachedLanguage } = useLocalStorageMutation(
    editorLanguageCacheKey,
  );
  const onLanguageChange = useCallback(
    async (event: ChangeEvent<HTMLSelectElement>) => {
      const value = event.currentTarget.value;
      await setCachedLanguage(value);
      queryClient.invalidateQueries({
        queryKey: [...localStorageGetItemQueryKey, editorLanguageCacheKey],
      });
      if (languageSelectRef.current) {
        languageSelectRef.current.value = value;
      }
    },
    [queryClient, setCachedLanguage],
  );

  const nameCacheKey = useMemo(
    () => getEditorNameCacheKey(categoryData),
    [categoryData],
  );
  const { data: cachedName } = useLocalStorageQuery(nameCacheKey, '');
  const { mutateAsync: setCachedName } = useLocalStorageMutation(nameCacheKey);
  const onNameChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      await setCachedName(event.currentTarget.value);
      queryClient.invalidateQueries({
        queryKey: [...localStorageGetItemQueryKey, nameCacheKey],
      });
    },
    [nameCacheKey, queryClient, setCachedName],
  );

  const extensions = useMemo(
    () => getLanguageExtensions(cachedLanguage as ExtendedMonacoEditorLanguage),
    [cachedLanguage],
  );

  const valueCacheKey = useMemo(
    () => getEditorValueCacheKey(categoryData),
    [categoryData],
  );
  const { data: cachedValue } = useLocalStorageQuery(valueCacheKey, '');
  const { mutateAsync: setCachedValue } =
    useLocalStorageMutation(valueCacheKey);

  const isDragFailure = useCallback((dataTransfer: DataTransfer) => {
    const files = [...dataTransfer.files];
    if (files.length !== 1) {
      return true;
    }
    const file = files.shift();
    if (!file) {
      return true;
    }
    if (
      !acceptExtensions.some((extension: string) =>
        file.name.endsWith(extension),
      )
    ) {
      return true;
    }
    return false;
  }, []);
  const onDropSuccess = useCallback(
    async (dataTransfer: DataTransfer) => {
      const files = [...dataTransfer.files];
      if (files.length === 1) {
        const file = files.shift();
        if (file) {
          await setCachedName(file.name);
          queryClient.invalidateQueries({
            queryKey: [...localStorageGetItemQueryKey, nameCacheKey],
          });
          if (nameInputRef.current) {
            nameInputRef.current.value = file.name;
          }

          setCachedValue(await readFile(file));
          queryClient.invalidateQueries({
            queryKey: [...localStorageGetItemQueryKey, valueCacheKey],
          });
        }
      }
    },
    [nameCacheKey, queryClient, setCachedName, setCachedValue, valueCacheKey],
  );

  const onFileChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const { files } = event.currentTarget;
      if (files?.length === 1) {
        const file = files.item(0);
        if (file) {
          const language = getLanguageFromExtensions(file.name);
          if (language) {
            await setCachedLanguage(language);
            queryClient.invalidateQueries({
              queryKey: [
                ...localStorageGetItemQueryKey,
                editorLanguageCacheKey,
              ],
            });
            if (languageSelectRef.current) {
              languageSelectRef.current.value = language;
            }
          }

          await setCachedName(file.name);
          queryClient.invalidateQueries({
            queryKey: [...localStorageGetItemQueryKey, nameCacheKey],
          });
          if (nameInputRef.current) {
            nameInputRef.current.value = file.name;
          }

          setCachedValue(await readFile(file));
          queryClient.invalidateQueries({
            queryKey: [...localStorageGetItemQueryKey, valueCacheKey],
          });
        }
      }
    },
    [
      nameCacheKey,
      queryClient,
      setCachedLanguage,
      setCachedName,
      setCachedValue,
      valueCacheKey,
    ],
  );

  const onValueChange = useCallback(
    (value?: string) => {
      setCachedValue(value);
      queryClient.invalidateQueries({
        queryKey: [...localStorageGetItemQueryKey, valueCacheKey],
      });
    },
    [queryClient, setCachedValue, valueCacheKey],
  );

  const canSave = useMemo(
    () => !!cachedName && !!cachedValue,
    [cachedName, cachedValue],
  );

  const { mutateAsync: addSolution } = useSolutionAddMutation(categoryData);

  const onSaveClick = useCallback(async () => {
    if (canSave) {
      let name = cachedName;
      if (!name.endsWith(extensions)) {
        name = `${name}${extensions}`;
      }
      await addSolution({
        solution: { name },
        content: cachedValue,
      });
    }
  }, [addSolution, cachedName, cachedValue, canSave, extensions]);

  const [theme, setTheme] = useState<string>();
  useAnimationFrame(() => setTheme(getTheme()));

  return (
    <>
      <header css={styles.header.container}>
        <select
          css={[commonStyles.select, styles.header.input]}
          onChange={onCategorychange}
        >
          {categoryOptions.map(({ value, text }, index: number) => (
            <option key={index} value={value}>
              {text}
            </option>
          ))}
        </select>
        <select
          ref={languageSelectRef}
          css={[commonStyles.select, styles.header.input]}
          onChange={onLanguageChange}
          defaultValue={cachedLanguage}
        >
          {languageOptions.map(({ value, text }, index: number) => (
            <option key={index} value={value}>
              {text}
            </option>
          ))}
        </select>
        <input
          ref={nameInputRef}
          css={[commonStyles.input, styles.header.input, styles.header.name]}
          placeholder="Input file name here..."
          onChange={onNameChange}
          defaultValue={cachedName}
        />
        <code css={commonStyles.badge}>{extensions}</code>
        <button
          css={commonStyles.button}
          onClick={onSaveClick}
          disabled={!canSave}
        >
          <FontAwesomeIcon icon={faSave} /> Save
        </button>
      </header>
      <label>
        <DragAndDropZone
          initialText="Drop file here or click to choose file"
          errorText="Drop file only a single source file for the languages specified above"
          isDragFailure={isDragFailure}
          onDropSuccess={onDropSuccess}
        />
        <input
          css={styles.header.hiddenFile}
          type="file"
          accept={accept}
          onChange={onFileChange}
        />
      </label>
      <LazyMonacoEditor
        isNew
        language={cachedLanguage}
        theme={theme}
        placeholder="Write your solution here..."
        value={cachedValue}
        onValueChange={onValueChange}
      />
    </>
  );
};

export const NewSolution = () => {
  return (
    <section css={styles.container}>
      <Suspense>
        <Container />
      </Suspense>
    </section>
  );
};
