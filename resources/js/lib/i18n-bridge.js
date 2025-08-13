// Lightweight __ helper bridged to i18next
import i18next from '../i18n';

export function __(key, params = {}) {
    return i18next.t(key, params);
}

// Attach to window for global usage
if (typeof window !== 'undefined') {
    window.__ = __;
}


