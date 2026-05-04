'use client'
import { IconDelete, IconEdit } from '@/components/dashboard-ui/Icons';
import { useDocuments } from '@/hooks/useDocuments';
import ds from '@/styles/dashboard/Documents.module.css'
import s from '@/styles/dashboard/Portfolio.module.css'
import { Tag, TagColor } from '@/types';
import { useEffect, useState } from 'react';

const tableHeader = ["id", "value", "color", "created_at"] as const;
type TagFilters = { id: string; value: string; color: TagColor; created_at: number };

const TagPage = () => {
  const [tagValue, setTagValue] = useState<TagFilters>({ id: "", value: "", color: "orange", created_at: 0 });
  const { tags, createTag, deleteTagId } = useDocuments();

  const handleAddTag = () => {
    const { created_at: _, ...mapData } = tagValue;
    createTag(mapData);
    setTagValue({ id: "", value: "", color: "orange", created_at: 0 });
  }

  return (
    <div>
      <table className={s.tableWraper}>
        <thead className={s.tableHeader}>
          <tr>
            <th className={s.tableHeaderCell}>Id</th>
            <th className={s.tableHeaderCell}>Value</th>
            <th className={s.tableHeaderCell}>Color</th>
            <th className={s.tableHeaderCell}>created_at</th>
            <th className={s.tableHeaderCell}>Action</th>
          </tr>
        </thead>
        <tbody>
          {tags.map((document: Tag, index) => (
            <tr className={index % 2 === 0 ? s.even : s.mod} key={document.id}>
              <td className={`${s.tableCell} ${s.name}`}>{document.id}</td>
              <td className={`${s.tableCell} ${s.type}`}>{document.value}</td>
              <td className={s.tableCell}><span style={{ backgroundColor: document.color }}>{document.color}</span></td>
              <td className={s.tableCell}>{document.created_at && new Date(document.created_at).toLocaleString('th-TH')}</td>
              <td className={s.tableCell}>
                <div className={s.action}>
                  <button className={s.actionButton} onClick={() => deleteTagId(document.id)}><IconDelete /></button>
                </div>
              </td>
            </tr>
          ))}
          <tr>
            {tableHeader.map((col) => (
              col !== 'created_at' ? <th key={col} className={s.tableFilterCell}>
                {col === 'color' ?
                    <select name="color" value={tagValue.color} id="color" onChange={(e) => setTagValue((prev) => ({ ...prev, [col]: e.target.value as TagColor }))}>
                      <option value="orange">Orange</option>
                      <option value="purple">Purple</option>
                      <option value="green">Green</option>
                    </select>
                : <input
                  className={s.filterInput}
                  placeholder={`Enter ${col}...`}
                  value={tagValue[col]}
                  onChange={(e) => setTagValue((prev) => ({ ...prev, [col]: e.target.value }))}
                />}
              </th> : <th key={col} className={s.tableFilterCell}></th>
            ))}
            <th className={s.tableHeaderCell}>
              <button className={ds.createButton} onClick={handleAddTag}>+ Add</button>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TagPage;
