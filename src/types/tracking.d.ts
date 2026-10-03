/** Globais dos scripts de tracking (Meta Pixel e Microsoft Clarity). */
type FbqFn = {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue?: unknown[];
  push?: FbqFn;
  loaded?: boolean;
  version?: string;
};

type ClarityFn = {
  (...args: unknown[]): void;
  q?: unknown[];
};

interface Window {
  fbq?: FbqFn;
  _fbq?: FbqFn;
  clarity?: ClarityFn;
}
