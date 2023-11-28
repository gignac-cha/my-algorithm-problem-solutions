import { editor } from 'monaco-editor/esm/vs/editor/editor.api';
import { styles } from './styles';

interface PlaceholderWidgetProperties {
  placeholder: string;
  applyFontInfo: editor.ICodeEditor['applyFontInfo'];
}

export class PlaceholderWidget
  implements editor.IContentWidget, PlaceholderWidgetProperties
{
  placeholder: string;
  applyFontInfo: editor.ICodeEditor['applyFontInfo'];

  constructor({ placeholder, applyFontInfo }: PlaceholderWidgetProperties) {
    this.placeholder = placeholder;
    this.applyFontInfo = applyFontInfo;
  }

  getId(): string {
    return 'placeholderWidget';
  }

  getDomNode(): HTMLElement {
    const domNode = document.createElement('div');
    domNode.classList.add(`css-${styles.placeholder.name}`);
    domNode.textContent = this.placeholder;
    this.applyFontInfo(domNode);
    return domNode;
  }

  getPosition(): editor.IContentWidgetPosition | null {
    return {
      position: { lineNumber: 1, column: 1 },
      preference: [editor.ContentWidgetPositionPreference.EXACT],
    };
  }
}
