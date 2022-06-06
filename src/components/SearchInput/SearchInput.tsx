import {
  ChangeEventHandler,
  FC,
  KeyboardEventHandler,
  useEffect,
  useRef,
} from 'react';
import { Input } from '@chakra-ui/react';
import throttle from 'lodash/throttle';

import { OnArrowDown, SearchInputProps } from './SearchInput.types';

export const SearchInput: FC<SearchInputProps> = function SearchInput({
  onChange,
  onArrowDown,
  onEnterDown,
}) {
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange(e.currentTarget.value);
  };

  const handleArrowDownRef = useRef<OnArrowDown | null>(null);

  useEffect(() => {
    if (onArrowDown) {
      handleArrowDownRef.current = throttle<OnArrowDown>(onArrowDown, 100);
    } else {
      handleArrowDownRef.current = null;
    }

    return () => {
      (handleArrowDownRef.current as any)?.cancel();
    };
  }, [onArrowDown]);

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    switch (e.code) {
      case 'ArrowDown':
        e.preventDefault();
        handleArrowDownRef.current?.('down');
        break;
      case 'ArrowUp':
        e.preventDefault();
        handleArrowDownRef.current?.('up');
        break;
      case 'Enter':
        e.preventDefault();
        onEnterDown?.();
        break;
      default:
    }
  };

  return (
    <Input
      flex="0 0 auto"
      onChange={handleChange}
      onKeyDownCapture={handleKeyDown}
      w="full"
    />
  );
};
