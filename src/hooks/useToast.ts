import { toast } from 'sonner';

export type ToastType = 'success' | 'error' | 'info' | 'warning' | 'loading';

export interface ToastOptions {
    type: ToastType;
    message: string;
    duration?: number;
    action?: {
        label: string;
        onClick: () => void;
    };
}

export function useToast() {
    const showToast = (options: ToastOptions) => {
        const {
            type,
            message,
            duration = 3000,
            action,
        } = options;

        const commonOptions = {
            duration,
            action: action ? {
                label: action.label,
                onClick: action.onClick,
            } : undefined,
        };

        switch (type) {
            case 'success':
                toast.success(message, commonOptions);
                break;
            case 'error':
                toast.error(message, commonOptions);
                break;
            case 'info':
                toast.info(message, commonOptions);
                break;
            case 'warning':
                toast.warning(message, commonOptions);
                break;
            case 'loading':
                toast.loading(message, commonOptions);
                break;
        }
    };

    const dismissAll = () => {
        toast.dismiss();
    };

    return { showToast, dismissAll };
}

// Convenience functions
export const showSuccessToast = (message: string, duration = 2000) => {
    toast.success(message, { duration });
};

export const showErrorToast = (message: string, duration = 3000) => {
    toast.error(message, { duration });
};

export const showInfoToast = (message: string, duration = 2000) => {
    toast.info(message, { duration });
};

export const showWarningToast = (message: string, duration = 3000) => {
    toast.warning(message, { duration });
};
