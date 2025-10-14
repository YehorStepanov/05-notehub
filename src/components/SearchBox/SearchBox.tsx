import { useEffect, useState } from "react";
import css from "./SearchBox.module.css";
import { useDebouncedCallback } from "use-debounce";

interface SearchBoxProps{
  onChange: (request: string)=>void,
  setPage: (page: number)=>void
}

export default function SearchBox({onChange,setPage}:SearchBoxProps) {
  const [text, setText] = useState<string>('');

  const handleChange = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => setText(event.target.value),
    1000
  );

  useEffect(() => {
    setPage(1);    
    onChange(text);
  }, [text, onChange,setPage]);
  
  return <input onChange={handleChange}  className={css.input} type="text" placeholder="Search notes" />;
}
