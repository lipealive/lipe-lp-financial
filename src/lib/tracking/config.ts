/**
 * IDs públicos de tracking. Vazios = tracking desligado, sem erro.
 * (O token da API de Conversões NÃO fica aqui: só é lido no servidor, em /api/meta.)
 */
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";
export const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID ?? "";

export const metaEnabled = META_PIXEL_ID.length > 0;
export const clarityEnabled = CLARITY_ID.length > 0;
