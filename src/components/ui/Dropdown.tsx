import s from "@/styles/ui/Dropdown.module.css";
import { MediaMetadata  } from "@/types";
import { useEffect, useState } from "react";

const Dropdown = ({ medias,  onChange }: { medias: MediaMetadata[], onChange: (uid: string[]) => void }) => {
  const [open, setOpen] = useState(false);
  const [mediaSelected, setMediaSelected] = useState<MediaMetadata[] | null>(null);
  const onHandleShowList = () => {
    setOpen(true);
  }


  const onSelectImage = (media: MediaMetadata) => {
    setOpen(false);
    if ((mediaSelected ?? []).length > 3) return;
    setMediaSelected(prev => {
      if (prev === null) {
        return [media];
      } else {
        return [...prev, media] as MediaMetadata[]; // Cast the result to MediaMetadata[]
      }
    });
  }

  const removeImage = (indexToRemove: number) => {
    setMediaSelected((mediaSelected ?? []).filter((_, index) => index !== indexToRemove));
  };

  useEffect(() => {
    if ((mediaSelected ?? []).length > 4) return;
    const ids = (mediaSelected ?? []).map((p) => p?.id) as string[];
    onChange(ids);
  }, [mediaSelected]);


  return <div className={s.listContainer}>
    <div className={s.display} onClick={onHandleShowList}>
      {mediaSelected?.map((media, _) => (
        <div className={s.mediaView}>
          <img key={_} className={s.itemDisplay} src={media.downloadURL} alt={media.name} />
          <button
              type="button"
              onClick={() => removeImage(_)}
              className={s.removeImg}
            >
              &times;
            </button>
        </div>
      ))}
    </div>
    <div className={`${s.itemList} ${open ? s.show : ""}`}>
    {medias && medias.map(media => (
      <div key={media.id} className={s.item} onClick={() => onSelectImage(media)}>
        <img className={s.ListImg} src={media.downloadURL} alt={media.name} />
        <div>{media.id}</div>
      </div>
    ))}
    </div>
  </div>;
};

export default Dropdown;
