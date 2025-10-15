import { useState } from "react";
import css from "./SearchBox.module.css";
import { useDebouncedCallback } from "use-debounce";

interface SearchBoxProps{
  onChange: (request: string)=>void
}

export default function SearchBox({onChange}:SearchBoxProps) {
  const [text, setText] = useState<string>('');

  const debouncedSearch = useDebouncedCallback((value: string) => {
    onChange(value);
  }, 800);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
    debouncedSearch(event.target.value);
  };
  
  return <input onChange={handleChange} value={text} className={css.input} type="text" placeholder="Search notes" />;
}
