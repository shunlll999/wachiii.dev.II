'use client'
import { IconDelete, IconEdit } from '@/components/dashboard-ui/Icons';
import { useDocuments } from '@/hooks/useDocuments';
import ds from '@/styles/dashboard/Documents.module.css'
import s from '@/styles/dashboard/Portfolio.module.css'
import { Impact, Tag, TagColor } from '@/types';
import { useState } from 'react';

const tableHeader = ["value", "created_at"] as const;
type ImpactValue = {
  value: string
}

const ImpactPage = () => {
  const [impactsValue, setTagValue] = useState<ImpactValue[]>([
    { value: "" },
    { value: "" },
    { value: "" },
    { value: "" },
  ]);
  const { impacts, createImpact, deleteImpactId } = useDocuments();

  const handleAddImage = () => {
    if (impactsValue.some((item) => !item.value)) return;
    const mapData = impactsValue.map((item) => ({ ...item, created_at:  new Date().getTime() }));
    createImpact(mapData);
    setTagValue([
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
    ])
  }

  return (
    <div>
      <table className={s.tableWraper}>
        <thead className={s.tableHeader}>
          <tr>
            <th className={s.tableHeaderCell}>Value free setting</th>
            <th className={s.tableHeaderCell}>created_at</th>
            <th className={s.tableHeaderCell}>Action</th>
          </tr>
        </thead>
        <tbody>
          {impacts.map((document: Impact, index) => (
            <tr className={index % 2 === 0 ? s.even : s.mod} key={index}>
              <td className={`${s.tableCell} ${s.type} ${s.impactOverrideCell}`}><div className={s.impactList}>
                {
                document.impactList.map((impact, _) => (
                  <div className={s.impactCell} key={impact}>
                    <div>
                      <div className={s.impactTop}>{impact.split(" ")[0]}</div>
                      <div className={s.impactBottom}>{impact.split(" ").slice(1).join(" ")}</div>
                    </div>
                  </div>
                ))
                }
                </div></td>
              <td className={s.tableCell}>{document.create_at && new Date(document.create_at).toLocaleString('th-TH')}</td>
              <td className={s.tableCell}>
                <div className={s.action}>
                  <button className={s.actionButton} onClick={() => deleteImpactId(document.id as string)}><IconDelete /></button>
                </div>
              </td>
            </tr>
          ))}
          <tr>
            {tableHeader.map((col) => (
              col !== 'created_at' ? <th key={col} className={s.tableFilterCell}>
                {impactsValue.map((impact, _) => (
                  <input
                    key={_}
                    className={s.impactInput}
                    placeholder={`Enter ${col} ${_+1}...`}
                    value={impact[col]}
                    onChange={(e) => {
                      setTagValue((prev) => {
                        const newTagValue = [...prev];
                        newTagValue[_][col] = e.target.value;
                        return newTagValue;
                      });
                    }}
                  />
                ))}
              </th> : <th key={col} className={s.tableFilterCell}></th>
            ))}
            <th className={s.tableHeaderCell}>
              <button className={ds.createButton} onClick={handleAddImage}>+ Add</button>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ImpactPage;
