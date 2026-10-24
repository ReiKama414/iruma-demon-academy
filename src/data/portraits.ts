import sources from './portraits.json';

export type Portrait = {
  id: string; key: string; label: string; url: string; source: string;
  kind: string; organization: string; credit: string;
};
export const portraitCatalog: Record<string, Portrait[]> = sources;
export function getPortraits(characterId: string) { return portraitCatalog[characterId] || []; }
export function getPortrait(characterId: string, key?: string) {
  const choices = getPortraits(characterId);
  return choices.find(p => p.key === key) || choices[0];
}
