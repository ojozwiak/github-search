export type OnArrowDown = (arrow: 'up' | 'down') => void;

export interface SearchInputProps {
  onChange: (value: string) => void;
  onArrowDown?: OnArrowDown;
  onEnterDown?: () => void;
}
