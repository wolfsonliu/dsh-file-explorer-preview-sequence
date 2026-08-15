/** Viewer styles injected as a <style> tag (external plugins cannot import CSS modules). */
export const VIEWER_CSS = `
.dsh-sq { display: flex; flex-direction: column; height: 100%; min-height: 0; font-family: system-ui, -apple-system, sans-serif; }
.dsh-sq-toolbar { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; flex-shrink: 0; padding: 4px 8px; border-bottom: 1px solid var(--dsw-alias-border-l2, #0000001a); background: var(--dsw-alias-bg-layer-1, #f5f5f5); user-select: none; }
.dsh-sq-select { border: 1px solid var(--dsw-alias-border-l2, #0000001a); background: var(--dsw-alias-bg-base, #fff); color: var(--dsw-alias-label-primary, #333); border-radius: 4px; padding: 2px 4px; font-size: 12px; line-height: 18px; }
.dsh-sq-field { display: inline-flex; align-items: center; gap: 4px; font-size: 12px; color: var(--dsw-alias-label-secondary, #666); }
.dsh-sq-input { border: 1px solid var(--dsw-alias-border-l2, #0000001a); background: var(--dsw-alias-bg-base, #fff); color: var(--dsw-alias-label-primary, #333); border-radius: 4px; padding: 2px 6px; font-size: 12px; width: 140px; }
.dsh-sq-range { width: 80px; }
.dsh-sq-check { display: inline-flex; align-items: center; gap: 4px; font-size: 12px; color: var(--dsw-alias-label-secondary, #666); }
.dsh-sq-enzymes { display: flex; align-items: center; gap: 4px; flex-wrap: wrap; flex-shrink: 0; padding: 2px 8px; border-bottom: 1px solid var(--dsw-alias-border-l2, #0000001a); background: var(--dsw-alias-bg-layer-1, #f5f5f5); }
.dsh-sq-chip { border: 1px solid var(--dsw-alias-border-l2, #0000001a); background: transparent; color: var(--dsw-alias-label-primary, #333); border-radius: 10px; padding: 1px 8px; font-size: 11px; line-height: 16px; cursor: pointer; }
.dsh-sq-chip.is-active { background: var(--dsw-alias-state-business-primary, #4a90d9); color: #fff; border-color: transparent; }
.dsh-sq-viewport { flex: 1; min-height: 0; overflow: auto; }
.dsh-sq-plain { margin: 0; padding: 8px; font-size: 12px; white-space: pre-wrap; word-break: break-all; overflow: auto; height: 100%; box-sizing: border-box; color: var(--dsw-alias-label-primary, #333); }
.dsh-sq-overlay { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; color: var(--dsw-alias-label-secondary, #666); font-size: 12px; }
.dsh-sq-overlay.is-error { color: var(--dsw-alias-state-error, #d32f2f); }
.dsh-sq-spinner { width: 20px; height: 20px; border: 2px solid var(--dsw-alias-border-l2, #0000001a); border-top-color: var(--dsw-alias-state-business-primary, #4a90d9); border-radius: 50%; animation: dsh-sq-spin 0.8s linear infinite; }
@keyframes dsh-sq-spin { to { transform: rotate(360deg); } }
.dsh-sq-btn { border: 1px solid var(--dsw-alias-border-l2, #0000001a); background: transparent; color: var(--dsw-alias-label-primary, #333); border-radius: 4px; padding: 2px 8px; cursor: pointer; font-size: 12px; line-height: 18px; }
.dsh-sq-status { display: flex; align-items: center; gap: 8px; flex-shrink: 0; padding: 2px 8px; border-top: 1px solid var(--dsw-alias-border-l2, #0000001a); background: var(--dsw-alias-bg-layer-1, #f5f5f5); font-size: 12px; color: var(--dsw-alias-label-secondary, #666); }
.dsh-sq-format { background: var(--dsw-alias-state-business-primary, #4a90d9); color: #fff; border-radius: 3px; padding: 0 6px; font-size: 11px; line-height: 16px; }
`
