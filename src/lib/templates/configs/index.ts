export { ModernTemplate, ClassicTemplate, MinimalTemplate } from './templates.config';

import { ModernTemplate, ClassicTemplate, MinimalTemplate } from './templates.config';
import type { TemplateConfig } from '@/lib/types/cv.types';

export const templateConfigs: Record<string, TemplateConfig> = {
    modern: ModernTemplate,
    classic: ClassicTemplate,
    minimal: MinimalTemplate,
};

export const getTemplateConfig = (templateId: string): TemplateConfig => {
    return templateConfigs[templateId] || ModernTemplate;
};
