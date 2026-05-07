import { addDoc, collection, deleteDoc, doc, DocumentReference, getDoc, getDocs, orderBy, query, setDoc, updateDoc, where } from "firebase/firestore";
import { db, storage } from "./firebase";
import type { Project, Tag } from "@/types";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

async function resolveRefs(obj: Record<string, unknown>): Promise<Record<string, unknown>> {
  const resolved: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value instanceof DocumentReference) {
      const refSnap = await getDoc(value);
      resolved[key] = refSnap.exists() ? { id: refSnap.id, ...refSnap.data() } : null;
    } else {
      resolved[key] = value;
    }
  }
  return resolved;
}

export const getPortfoliosCollection = async () => {
  const querySnapshot = await getDocs(collection(db, "portfoliosCollection"));
  return querySnapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
};

export const getPortfoliosCollectionByID = async (id: string) => {
  const docRef = doc(db, 'portfoliosCollection', id);
  const snap = await getDoc(docRef);
  if (!snap.exists()) return [];
  const raw = { id: snap.id, ...snap.data() } as Record<string, unknown>;
  const resolved = await resolveRefs(raw);
  return resolved;
};


export const deletePortfolioById = async (id: string) => {
  await deleteDoc(doc(db, "portfoliosCollection", id));
};

const stripUndefined = <T extends Record<string, unknown>>(obj: T): T =>
  Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined)) as T;

export const addProject = async (data: Omit<Project, 'id'>): Promise<string> => {
  const productRefs = data.screenshots?.map(id => doc(db, "mediaCollection", id));
  const docRef = await addDoc(collection(db, "portfoliosCollection"), stripUndefined({...data, screenshots: productRefs } as Record<string, unknown>));
  return docRef.id;
};

export const updateProjectById = async (id: string, data: Partial<Omit<Project, 'id'>>): Promise<void> => {
  const productRefs = data.screenshots?.map(id => doc(db, "mediaCollection", id));
  await updateDoc(doc(db, "portfoliosCollection", id), stripUndefined({ ...data, screenshots: productRefs } as Record<string, unknown>));
};

export const getDocumentsCollection = async () => {
  const q = query(collection(db, "documentsCollection"), where("role", "==", "WACHIII"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
};

export const uploadMediaCollection = async (data: Omit<import("@/types").MediaMetadata, "id">): Promise<string> => {
  const storageRef = ref(storage, `imagesCollection/${data.name}`);
  const snapshot = await uploadBytes(storageRef, data.file);
  const downloadURL = await getDownloadURL(snapshot.ref);
  const { file, ...refData } = data;
  const docRef = await addDoc(collection(db, "mediaCollection"), {
    ...refData,
    downloadURL
  });

  return docRef.id;
};

export const fetchMediaCollection = async (): Promise<import("@/types").MediaMetadata[]> => {
  const q = query(collection(db, "mediaCollection"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((d) => {
    const data = d.data() as import("@/types").MediaMetadata;
    return { id: d.id, ...data };
  });
};

export const addTag = async (data: Omit<Tag, 'created_at'>): Promise<string> => {
  const docRef = doc(db, "tagsCollection", data.id);
  await setDoc(docRef, { ...data, created_at: new Date().getTime() });
  return docRef.id;
};

export const fetchTags = async (): Promise<Tag[]> => {
  const q = query(collection(db, "tagsCollection"), orderBy("created_at", "asc"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((d) => {
    return { id: d.id, ...d.data() } as Tag;
  });
};

export const deleteTagById = async (id: string) => {
  await deleteDoc(doc(db, "tagsCollection", id));
};

export const deleteImpactById = async (id: string) => {
  await deleteDoc(doc(db, "impactCollection", id));
};

export const createImpactCollection = async (data: {value: string }[]): Promise<string[]> => {
  const impactList: string[] = data.map((d) => d.value);
  const docRef = await addDoc(collection(db, "impactCollection"), { impactList, create_at: new Date().getTime() });
  return [docRef.id];
};


export const fetchImpactsCollection = async (): Promise<import("@/types").Impact[]> => {
  const q = query(collection(db, "impactCollection"), orderBy("create_at", "asc"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((d) => ({
    id: d.id,
    impactList: d.data().impactList,
    create_at: d.data().create_at
  }));
};
