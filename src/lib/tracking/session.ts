/**
 * "Uma vez por sessão": marca em sessionStorage. Se o storage falhar
 * (modo privado, bloqueio), cai num Set em memória, válido até recarregar.
 */
const memory = new Set<string>();
const PREFIX = "af_trk:";

export function oncePerSession(key: string): boolean {
  const k = PREFIX + key;
  if (memory.has(k)) return false;
  try {
    if (window.sessionStorage.getItem(k)) {
      memory.add(k);
      return false;
    }
    window.sessionStorage.setItem(k, "1");
  } catch {
    // sem storage: vale só a memória
  }
  memory.add(k);
  return true;
}
