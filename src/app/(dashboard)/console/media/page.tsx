'use client'

import { SetStateAction, useState } from "react";
import { MediaMetadata } from '@/types';
import ds from '@/styles/dashboard/Documents.module.css'
import { useDocuments } from "@/hooks/useDocuments";

const MediaPage = () => {
  const { loading, medias, uploadMedia } = useDocuments();
  const [metadata, setMetadata] = useState<MediaMetadata | null>(null);
  const [preview, setPreview] = useState(null);


const onChangeALT = (event: React.ChangeEvent<HTMLInputElement>) => {
  if (metadata) {
    setMetadata({
      ...metadata,
      alt: event.target.value,
      name: metadata.name // Keep the existing name if it's already set
    });
  }
}
  const onHandleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const info = {
        name: file.name,
        size: (file.size / 1024).toFixed(2) + " KB",
        type: file.type,
        lastModified: new Date(file.lastModified).toLocaleString(),
        alt: file.name,
        file,
      };

      // หาความกว้าง/สูง ของภาพ
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
        const img = new Image();

        img.onload = () => {
          setMetadata({
            ...info,
            width: img.width,
            height: img.height,
            dimensions: `${img.width} x ${img.height} px`
          });
        };
          img.src = event.target.result as string;
          setPreview(event.target.result as SetStateAction<null>);
        }

      };
      reader.readAsDataURL(file);
    }
  };

  const handleOnSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (Object.entries(metadata || {}).some(([key, value]) => !value)) alert("Please fill all fields");
    else
    await uploadMedia(metadata);
    setMetadata({
        name: '',
        width: 0,
        height: 0,
        size: '',
        type: '',
        lastModified: '',
        alt: '',
        dimensions: '',
        file: null as unknown as File, // Use null as a placeholder and then cast it to File
      } as MediaMetadata);
      setPreview(null);
    // rest of your code
  }

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <span>Media : </span>
        <span><input type="file" accept="image/*" onChange={onHandleFileUpload}/></span>
        <div className={ds['media-info-box']} >
          <div className={ds['media-info-input']}>
            <label htmlFor="filename">File Name:</label>
            <input type="text" name="filename" value={metadata?.name ?? ''} readOnly />
          </div>
          <div className={ds['media-info-input']}>
            <label htmlFor="dimensions">Dimensions:</label>
            <input type="text" name="dimensions" value={`${metadata?.width || 0} x ${metadata?.height || 0} px`} readOnly />
          </div>
          <div className={ds['media-info-input']}>
            <label htmlFor="size">Size:</label>
            <input type="text" name="size" value={metadata?.size ?? ''} readOnly />
          </div>
          <div className={ds['media-info-input']}>
            <label htmlFor="type">Type:</label>
            <input type="text" name="size" value={metadata?.type ?? ''} readOnly />
          </div>
          <div className={ds['media-info-input']}>
            <label htmlFor="lastModified">Last Modified:</label>
            <input type="text" name="lastModified" value={metadata?.lastModified ?? '' } readOnly />
          </div>
          <div className={ds['media-info-input']}>
            <label htmlFor="alt">alt:</label>
            <input type="text" name="alt" value={metadata?.alt ?? ''} onChange={onChangeALT} />
          </div>
          </div>
          {preview &&
            <div className={ds.previewImage}>
              <div className={ds.previewLabel}> P r e v i e w :</div>
              <img src={preview} alt={metadata?.name} />
            </div>}
            <div className={ds['upload-bar']}>
              <button type="submit" className={ds.uploadButton}>⬆️ {loading ? "Uploading..." : "Upload"}</button>
            </div>
        </form>
        <div className={ds.mediaBox}>
          {medias.map((media: MediaMetadata) => (
            <div key={media.name}>
              <div className={ds.media}>
                <img className={ds.imageNetwork} src={media.downloadURL} alt={media.alt} />
                <div className={ds.mediaName}>{media.name}</div>
              </div>
            </div>
          ))}
        </div>
    </div>
  )
}

export default MediaPage
