import { useEffect, useState, useCallback } from "react";
import { MediaMetadata } from "@/types";
import { addTag, fetchTags, deleteTagById, createImpactCollection, fetchImpactsCollection, deleteImpactById, uploadMediaCollection, fetchMediaCollection } from "@/services/firebaseCollection";
import { Impact, Tag } from "@/types";

export const useDocuments = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [impacts, setImpacts] = useState<Impact[]>([]);
  const [medias, setMedia] = useState<MediaMetadata[]>([]);


  const onFetchTags = useCallback(() => {
    fetchTags().then((data) => setTags(data as Tag[]));
  }, []);

  const createTag = async (data: Omit<Tag, 'created_at'>) => {
    await addTag(data);
    onFetchTags();
  }

  const deleteTagId = async (id: string) => {
    await deleteTagById(id);
    onFetchTags();
  }

  const onFetchImpacts = useCallback(() => {
    fetchImpactsCollection().then((data) => {
      setImpacts(data)
    });
  }, []);

    const onFetchMedia = useCallback(() => {
    fetchMediaCollection().then((data) => {
      setMedia(data);
    });
  }, []);

  const createImpact = async (data: { value: string }[]) => {
    await createImpactCollection(data);
    onFetchImpacts();
  }

  const deleteImpactId = async (id: string) => {
    await deleteImpactById(id);
    onFetchImpacts();
  }

  const uploadMedia = async (metadata: MediaMetadata | null) => {
    if (metadata) {
      await uploadMediaCollection(metadata);
      onFetchMedia();
    }
  };


  useEffect(() => {
    fetchTags().then((data) => setTags(data as Tag[]));
    fetchImpactsCollection().then((data) => setImpacts(data));
    fetchMediaCollection().then((data) => {
      setMedia(data);
    });
  }, []);

  return {
    tags,
    impacts,
    medias,
    uploadMedia,
    createTag,
    createImpact,
    deleteImpactId,
    deleteTagId,
  };
};
