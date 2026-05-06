import React, { useEffect, useState } from 'react';
import s from '@/styles/ui/Tag.module.css'

const InputToTag = ({onChange}: {onChange: (tags: string[]) => void}) => {
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // เช็คว่ากด Enter หรือไม่
    if (e.key === 'Enter') {
      e.preventDefault(); // กัน Form Submit

      const value = inputValue.trim();

      // เงื่อนไข: ไม่เป็นค่าว่าง และ ไม่ซ้ำกับ tag เดิม
      if (value && !tags.includes(value)) {
        setTags([...tags, value]);
        setInputValue(''); // เคลียร์ช่อง input
      }
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      // แถม: ถ้าช่องว่างแล้วกด Backspace ให้ลบ tag ล่าสุด (UX ที่ดี)
      setTags(tags.slice(0, -1));
    }
  };

  const removeTag = (indexToRemove: number) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  useEffect(() => {
    tags.length > 0 && onChange(tags);
  }, [tags]);

  return (
    <div className={s['tag-panel']}>
      <label className={s.caption}>พิมพ์แล้วกด Enter:</label>
      <div className={s['tag-container']}>
        {tags.map((tag, index) => (
          <div
            key={index}
            className={s.tag}
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(index)}
              className={s.removeTag}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={tags.length === 0 ? "เพิ่มแท็ก..." : ""}
          className={s.inputTag}
        />
      <p className={s.caption}>
        * กด Enter เพื่อเพิ่ม | กด Backspace เพื่อลบอันล่าสุด
      </p>
    </div>
  );
};

export default InputToTag;
