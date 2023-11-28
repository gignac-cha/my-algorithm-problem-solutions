import { faFileImport } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DragEvent, FunctionComponent, useCallback, useState } from 'react';
import { styles } from './styles';

interface DragAndDropZoneProperties {
  initialText: string;
  errorText: string;
  isDragFailure: (dataTransfer: DataTransfer) => boolean;
  onDropSuccess: (dataTransfer: DataTransfer) => void;
}

export const DragAndDropZone: FunctionComponent<DragAndDropZoneProperties> = ({
  initialText,
  errorText,
  isDragFailure,
  onDropSuccess,
}) => {
  const [isDragging, setDragging] = useState(false);
  const [hasDraggingError, setDraggingError] = useState(false);
  const [dragContainerText, setDragContainerText] = useState(initialText);

  const onDragOver = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
      setDragging(true);
      setDraggingError(false);
      setDragContainerText(initialText);
    },
    [initialText],
  );
  const onDragLeave = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
      setDragging(false);
      setDraggingError(false);
      setDragContainerText(initialText);
    },
    [initialText],
  );
  const onDrop = useCallback(
    async (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
      setDragging(false);
      if (isDragFailure(event.dataTransfer)) {
        event.dataTransfer.dropEffect = 'none';
        setDraggingError(true);
        setDragContainerText(errorText);
      } else {
        setDraggingError(false);
        setDragContainerText(initialText);
        onDropSuccess(event.dataTransfer);
      }
    },
    [errorText, initialText, isDragFailure, onDropSuccess],
  );

  return (
    <div
      css={[
        styles.container,
        isDragging && styles.dragging,
        hasDraggingError && styles.error,
      ]}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <FontAwesomeIcon icon={faFileImport} />
      {dragContainerText}
    </div>
  );
};
