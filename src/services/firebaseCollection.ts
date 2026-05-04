import { addDoc, collection, deleteDoc, doc, DocumentReference, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
import type { Project } from "@/types";

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
  const docRef = await addDoc(collection(db, "portfoliosCollection"), stripUndefined(data as Record<string, unknown>));
  return docRef.id;
};

export const updateProjectById = async (id: string, data: Partial<Omit<Project, 'id'>>): Promise<void> => {
  await updateDoc(doc(db, "portfoliosCollection", id), stripUndefined(data as Record<string, unknown>));
};
