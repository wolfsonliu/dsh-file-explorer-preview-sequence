import { type ComponentType } from 'react';
import type { PreviewProps, Translate } from '@dsh-external/dsh-file-explorer/client';
type ReadRaw = (path: string, offset?: number, limit?: number, signal?: AbortSignal) => Promise<ArrayBuffer>;
export declare function makeSequencePreview(readRaw: ReadRaw | undefined, t: Translate): ComponentType<PreviewProps>;
export {};
