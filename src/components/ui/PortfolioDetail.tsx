'use client'
import s from '@/styles/dashboard/Portfolio.module.css'
import ds from '@/styles/dashboard/Documents.module.css'
import { Impact, Portfolio, Project, Tag, MediaMetadata } from '@/types'
import { useCallback, useState } from 'react'
import type { SyntheticEvent, ReactElement } from 'react'
import InputTag from './InputTag'
import ScreenShortDropdown from './Dropdown'

type FieldType = 'string' | 'string[]' | 'enum' | 'number' | 'boolean' | 'tags[]' | 'impacts[]' | 'reference[]';

const formTemplate: { name: string; type: FieldType; required: boolean }[] = [
  { name: 'title', type: 'string', required: true },
  { name: 'slug', type: 'string', required: true },
  { name: 'category', type: 'string', required: true },
  { name: 'tagColor', type: 'enum', required: true },
  { name: 'tags', type: 'tags[]', required: false },
  { name: 'screenshots', type: 'reference[]', required: false },
  { name: 'description', type: 'string', required: true },
  { name: 'longDescription', type: 'string', required: true },
  { name: 'impact', type: 'impacts[]', required: true },
  { name: 'challenge', type: 'string', required: true },
  { name: 'solution', type: 'string', required: true },
  { name: 'year', type: 'number', required: true },
  { name: 'color', type: 'string', required: true },
  { name: 'gradient', type: 'string', required: true },
  { name: 'featured', type: 'boolean', required: true },
  { name: 'liveUrl', type: 'string', required: false },
  { name: 'repoUrl', type: 'string', required: false },
]

const PortfolioDetail = ({ portfolio, impacts, medias, onAddProject }: { portfolio: Portfolio, tags?: Tag[], impacts: Impact[], medias: MediaMetadata[], onAddProject: (id:string ,project: Omit<Project, 'id'>) => void }) => {
  const { product_info, ...rest } = portfolio;
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [mediasSelected, setMediaSelected] = useState<string[]>([]);
  const [tagsValue, setTagsValue] = useState<string[]>([]);
  const [screenOpen, setScreenOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const fieldInputMap: Record<FieldType, (name: string, defaultValue?: string | string[] | MediaMetadata[]) => ReactElement> = {
  'string': (name, defaultValue) => (
    <input type="text" id={name} name={name} defaultValue={defaultValue as string} />
  ),
  'number': (name, defaultValue) => (
    <input type="number" id={name} name={name} defaultValue={defaultValue as string} />
  ),
  'string[]': (name, defaultValue) => (
    <input type="text" id={name} name={name} defaultValue={defaultValue as string} placeholder="comma (,) separated" />
  ),
  'enum': (name, defaultValue) => (
    <input type="text" id={name} name={name} defaultValue={defaultValue as string} />
  ),
  'boolean': (name, defaultValue) => (
    <div><input type="checkbox" id={name} name={name} defaultChecked={defaultValue === 'true'} /></div>
  ),
  'tags[]': (name, defaultValue) => {
    const onChangeTag = useCallback((tags: string[]) => {
      setTagsValue(tags);
    }, [])
    return <InputTag onChange={onChangeTag} defaultValue={Array.isArray(defaultValue) ? defaultValue.join(',') : (defaultValue ?? '')} />
  },
  'impacts[]': (name, defaultValue) => (
    <select id={name} name={name} className={ds.select} defaultValue={defaultValue as string}>
      <option value="">Select impact</option>
      {impacts.map((impact) => (
        <option key={impact.id} value={impact.impactList}>{impact.impactList.map((im) => im).join(', ')}</option>
      ))}
    </select>
  ),
  'reference[]': (name, defaultValue) => {
    const onChangeDropdown = useCallback((media: string[]) => {
      setMediaSelected(media);
    }, []);
    return <ScreenShortDropdown medias={medias} onChange={onChangeDropdown} defaultValue={Array.isArray(defaultValue) ? defaultValue as MediaMetadata[] : []} />
  },
};


  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget as HTMLFormElement;
    const newErrors: Record<string, string> = {};

    formTemplate.forEach(({ name, type, required }) => {
      if (!required || (type === 'boolean')) return;
      const input = form.elements.namedItem(name) as HTMLInputElement;
      if (!input || !input.value.trim()) {
        newErrors[name] = 'required';
      }
    });

    if (mediasSelected.length === 0 && !mediasSelected.includes('none')) {
      newErrors.screenshots = 'required';
      setScreenOpen(false)
    }

    if (tagsValue.length === 0) {
      newErrors.tags = 'required';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const getValue = (name: string) => (form.elements.namedItem(name) as HTMLInputElement).value.trim();
      const data: Omit<Project, 'id'> = {
        title:           getValue('title'),
        slug:            getValue('slug'),
        category:        getValue('category'),
        tags:            tagsValue,
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
        screenshots:     mediasSelected,
        liveUrl:         getValue('liveUrl') || undefined,
        repoUrl:         getValue('repoUrl') || undefined,
        viewed:          portfolio.viewed || 0
      };

       onAddProject(portfolio.id, data);
       setTimeout(() => {
        setLoading(false);
       }, 5000);
    }
  };

  return (
    <div>
      {!portfolio.isMigrated && <div className={s['detail-migrate']}>
        <div className={s.title}>Portfolio Detail (Yet Migrate)</div>
        {Object.entries(rest).map(([key, value]) => (
          <div className={s['detail-section']} key={key}>
            <label>{key}:</label>
            <div className={s.value}>{value.toString()}</div>
          </div>
        ))}
        {product_info && <div className={`${s.title} ${s.info}`}>product_info</div>}
        {product_info && Object.entries(product_info).map(([key, value]) => (
          <div className={s['detail-section']} key={key}>
            <label>{key}:</label>
            <div className={s.value}>{value}</div>
          </div>
        ))}
      </div>}
      <h1>Migrated Detail</h1>
      <div className={`${s['detail-migrate']} ${s.formWrapper}`}>
        <div className={s.title}>Portfolio Detail Form</div>
        <form onSubmit={handleSubmit} noValidate>
          <div className={s.formGrid}>
          {formTemplate.map(({ name, type }) => (
            <div className={s.formGroupView} key={name}>
              <div className={s.formGroupLabel}>
                <div className={s.labelView}>{name}:</div>
                {fieldInputMap[type](name, type === 'reference[]' ? ((portfolio as unknown as Record<string, string[]>)[name] ?? []) : String(portfolio[name as keyof Portfolio] ?? ''))}
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
            {
            loading ? <div className={s.buttonLoading} /> :
            <button type="submit" >
              Update
            </button>}
          </div>
        </form>
      </div>
    </div>
  )
}

export default PortfolioDetail
