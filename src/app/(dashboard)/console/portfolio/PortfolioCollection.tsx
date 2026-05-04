'use client'
import { IconDelete, IconEdit } from "@/components/dashboard-ui/Icons";
import { useProducts } from "@/hooks/useProducts";
import s from '@/styles/dashboard/Portfolio.module.css'
import { Portfolio } from "@/types";
import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";

const tableHeader = ["name", "type", "viewed", "describe", "photo_url", "product_year"] as const;
type PortfolioFilterKey = (typeof tableHeader)[number];
type PortfolioFilters = Record<PortfolioFilterKey, string>;

const PortfolioCollection = () => {
  const router = useRouter();
  const { portfolios, deletePortfolio } = useProducts();
  const [filters, setFilters] = useState<PortfolioFilters>({ name: "", type: "", viewed: "", describe: "", photo_url: "", product_year: "" });

  const handleDelete = async (id: string) => {
    if (!confirm("ลบ project นี้?")) return;
    await deletePortfolio(id);
  };

  const handleEdit = (id: string) => {
    router.push(`/console/portfolio/${id}`);
  }

  const filtered = useMemo(() => {
    if (!portfolios) return [];
    return portfolios.filter((p: Portfolio) =>
      p.name?.toLowerCase().includes(filters.name.toLowerCase()) &&
      p.type?.toLowerCase().includes(filters.type.toLowerCase()) &&
      String(p.viewed ?? "").includes(filters.viewed) &&
      p.describe?.toLowerCase().includes(filters.describe.toLowerCase()) &&
      p.photo_url?.toLowerCase().includes(filters.photo_url.toLowerCase()) &&
      String(p.product_year ?? "").includes(filters.product_year)
    );
  }, [portfolios, filters]);

  if (!portfolios) return <>loading</>

  return (
    <div>
      <table className={s.tableWraper}>
        <thead className={s.tableHeader}>
          <tr>
            <th className={s.tableHeaderCell}>name</th>
            <th className={s.tableHeaderCell}>type</th>
            <th className={s.tableHeaderCell}>viewed</th>
            <th className={s.tableHeaderCell}>describe</th>
            <th className={s.tableHeaderCell}>photo_url</th>
            <th className={s.tableHeaderCell}>product_year</th>
            <th className={s.tableHeaderCell}>Actions</th>
          </tr>
          <tr>
            {tableHeader.map((col) => (
              <th key={col} className={s.tableFilterCell}>
                <input
                  className={s.filterInput}
                  placeholder={`Enter ${col}...`}
                  value={filters[col]}
                  onChange={(e) => setFilters((prev) => ({ ...prev, [col]: e.target.value }))}
                />
              </th>
            ))}
            <th className={s.tableFilterCell} />
          </tr>
        </thead>
        <tbody>
          {filtered.map((portfolio: Portfolio, index) => (
            <tr className={index%2 === 0 ? s.even : s.mod} key={portfolio.id}>
              <td className={`${s.tableCell} ${s.name}`}>{portfolio.name}</td>
              <td className={`${s.tableCell} ${s.type}`}>{portfolio.type}</td>
              <td className={`${s.tableCell} ${s.viewed}`}>{portfolio.viewed}</td>
              <td className={s.tableCell}>{portfolio.describe}</td>
              <td className={s.tableCell}>{portfolio.photo_url}</td>
              <td className={`${s.tableCell} ${s.url}`}>{portfolio.product_year}</td>
              <td className={s.tableCell}>
                <div className={s.action}>
                  <button className={s.actionButton} onClick={() => handleEdit(portfolio.id)}><IconEdit /></button>
                  <button className={s.actionButton} onClick={() => handleDelete(portfolio.id)}><IconDelete /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PortfolioCollection;
