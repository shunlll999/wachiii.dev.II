import { useEffect, useState, useCallback } from "react";
import { MediaMetadata } from "@/types";
import { addTag, fetchTags, deleteTagById, createImpactCollection, fetchImpactsCollection, deleteImpactById, uploadMediaCollection, fetchMediaCollection } from "@/services/firebaseCollection";
import { Impact, Tag } from "@/types";

export const useDocuments = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [impacts, setImpacts] = useState<Impact[]>([]);
  const [medias, setMedia] = useState<MediaMetadata[]>([]);
  const [loading, setLoading] = useState<boolean>(false);


  const onFetchTags = useCallback(() => {
    setLoading(true);
    fetchTags().then((data) => {
      setTags(data as Tag[]);
      setLoading(false);
    });
  }, []);

  const createTag = async (data: Omit<Tag, 'created_at'>) => {
    setLoading(true);
    await addTag(data);
    onFetchTags();
  }


  const deleteTagId = async (id: string) => {
    setLoading(true);
    await deleteTagById(id);
    onFetchTags();
  }

  const onFetchImpacts = useCallback(() => {
    setLoading(true);
    fetchImpactsCollection().then((data) => {
      setImpacts(data)
      setLoading(false);
    });
  }, []);

  const onFetchMedia = useCallback(() => {
    setLoading(true);
    fetchMediaCollection().then((data) => {
      setMedia(data);
       setLoading(false);
    });
  }, []);

  const createImpact = async (data: { value: string }[]) => {
    setLoading(true);
    await createImpactCollection(data);
    onFetchImpacts();
  }

  const deleteImpactId = async (id: string) => {
    setLoading(true);
    await deleteImpactById(id);
    onFetchImpacts();
  }

  const uploadMedia = async (metadata: MediaMetadata | null) => {
    if (metadata) {
      setLoading(true);
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
    loading,
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
