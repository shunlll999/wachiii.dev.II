'use client'
import s from '@/styles/dashboard/Portfolio.module.css'
import { Portfolio, Project } from '@/types'
import { addProject } from '@/services/firebaseCollection'
import { useState } from 'react'
import type { SyntheticEvent, ReactElement } from 'react'

type FieldType = 'string' | 'string[]' | 'enum' | 'boolean';

const formTemplate: { name: string; type: FieldType; required: boolean }[] = [
  { name: 'title', type: 'string', required: true },
  { name: 'slug', type: 'string', required: true },
  { name: 'category', type: 'string', required: true },
  { name: 'tags', type: 'string[]', required: true },
  { name: 'tagColor', type: 'enum', required: true },
  { name: 'description', type: 'string', required: true },
  { name: 'longDescription', type: 'string', required: true },
  { name: 'impact', type: 'string[]', required: true },
  { name: 'challenge', type: 'string', required: true },
  { name: 'solution', type: 'string', required: true },
  { name: 'year', type: 'string', required: true },
  { name: 'color', type: 'string', required: true },
  { name: 'gradient', type: 'string', required: true },
  { name: 'featured', type: 'boolean', required: true },
  { name: 'screenshots', type: 'string[]', required: false },
  { name: 'liveUrl', type: 'string', required: false },
  { name: 'repoUrl', type: 'string', required: false },
]

const fieldInputMap: Record<FieldType, (name: string) => ReactElement> = {
  'string': (name) => (
    <input type="text" id={name} name={name} />
  ),
  'string[]': (name) => (
    <input type="text" id={name} name={name} placeholder="comma (,) separated" />
  ),
  'enum': (name) => (
    <input type="text" id={name} name={name} />
  ),
  'boolean': (name) => (
    <div><input type="checkbox" id={name} name={name} /></div>
  ),
};

const PortfolioDetail = ({ portfolio }: { portfolio: Portfolio }) => {
  const { product_info, ...rest } = portfolio;
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const newErrors: Record<string, string> = {};

    formTemplate.forEach(({ name, type, required }) => {
      if (!required || type === 'boolean') return;
      const input = form.elements.namedItem(name) as HTMLInputElement;
      if (!input || !input.value.trim()) {
        newErrors[name] = 'required';
      }


    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const getValue = (name: string) => (form.elements.namedItem(name) as HTMLInputElement).value.trim();
      const data: Omit<Project, 'id'> = {
        title:           getValue('title'),
        slug:            getValue('slug'),
        category:        getValue('category'),
        tags:            getValue('tags').split(',').map(t => t.trim()).filter(Boolean),
        tagColor:        getValue('tagColor') as Project['tagColor'],
        description:     getValue('description'),
        longDescription: getValue('longDescription'),
        impact:          getValue('impact').split(',').map(t => t.trim()).filter(Boolean),
        challenge:       getValue('challenge'),
        solution:        getValue('solution'),
        year:            getValue('year'),
        color:           getValue('color') as Project['color'],
        gradient:        getValue('gradient'),
        featured:        (form.elements.namedItem('featured') as HTMLInputElement).checked,
        screenshots:     getValue('screenshots') ? getValue('screenshots').split(',').map(t => t.trim()).filter(Boolean) : undefined,
        liveUrl:         getValue('liveUrl') || undefined,
        repoUrl:         getValue('repoUrl') || undefined,
      };
      addProject(data)
        .then((id) => alert(`Saved! Document ID: ${id}`))
        .catch((err) => alert(`Error: ${err.message}`));
    }
  };

  return (
    <div>
      <div className={s['detail-migrate']}>
        <div className={s.title}>Portfolio Detail (Yet Migrate)</div>
        {Object.entries(rest).map(([key, value]) => (
          <div className={s['detail-section']} key={key}>
            <label>{key}:</label>
            <div className={s.value}>{value}</div>
          </div>
        ))}
        {product_info && <div className={`${s.title} ${s.info}`}>product_info</div>}
        {product_info && Object.entries(product_info).map(([key, value]) => (
          <div className={s['detail-section']} key={key}>
            <label>{key}:</label>
            <div className={s.value}>{value}</div>
          </div>
        ))}
      </div>
      <h1>Migrate Detail</h1>
      <div className={`${s['detail-migrate']} ${s.formWrapper}`}>
        <div className={s.title}>Portfolio Detail Form</div>
        <form onSubmit={handleSubmit} noValidate>
          <div className={s.formGrid}>
          {formTemplate.map(({ name, type }) => (
            <div className={s.formGroupView} key={name}>
              <div className={s.formGroupLabel}>
                <div className={s.labelView}>{name}:</div>
                {fieldInputMap[type](name)}
              </div>
              {errors[name] && (
                <span className={s.error}>
                  {errors[name]}
                </span>
              )}
            </div>
          ))}
          </div>
          <div className={s.buttonSubmit}>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PortfolioDetail
