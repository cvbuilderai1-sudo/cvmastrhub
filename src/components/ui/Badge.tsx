import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
    'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-colors',
    {
        variants: {
            variant: {
                default:
                    'bg-gradient-to-r from-purple-600 to-pink-600 text-white',
                secondary:
                    'bg-white/10 text-white border border-white/20 backdrop-blur-lg',
                success:
                    'bg-gradient-to-r from-green-600 to-emerald-600 text-white',
                warning:
                    'bg-gradient-to-r from-yellow-600 to-orange-600 text-white',
                danger:
                    'bg-gradient-to-r from-red-600 to-pink-600 text-white',
                info:
                    'bg-gradient-to-r from-blue-600 to-cyan-600 text-white',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
    return (
        <div className={cn(badgeVariants({ variant }), className)} {...props} />
    );
}

export { Badge, badgeVariants };
