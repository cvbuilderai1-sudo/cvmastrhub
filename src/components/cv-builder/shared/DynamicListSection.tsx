'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface DynamicListItem {
    id: string;
    [key: string]: any;
}

export interface DynamicListField {
    name: string;
    label: string;
    type: 'text' | 'email' | 'url' | 'date' | 'textarea' | 'select' | 'checkbox';
    placeholder?: string;
    required?: boolean;
    options?: Array<{ value: string; label: string }>;
    validation?: (value: string) => { valid: boolean; message?: string };
}

export interface DynamicListSectionProps {
    title: string;
    description?: string;
    icon?: string;
    items: DynamicListItem[];
    fields: DynamicListField[];
    onAdd: () => void;
    onRemove: (id: string) => void;
    onUpdate: (id: string, field: string, value: any) => void;
    emptyMessage?: string;
    maxItems?: number;
}

export function DynamicListSection({
    title,
    description,
    icon,
    items,
    fields,
    onAdd,
    onRemove,
    onUpdate,
    emptyMessage = 'No items added yet',
    maxItems = 10,
}: DynamicListSectionProps) {
    const [expandedId, setExpandedId] = useState<string | null>(
        items.length > 0 ? items[0].id : null
    );
    const [errors, setErrors] = useState<Record<string, Record<string, string>>>({});

    const handleFieldChange = (itemId: string, fieldName: string, value: string) => {
        const field = fields.find((f) => f.name === fieldName);

        // Validate if validator exists
        if (field?.validation) {
            const validation = field.validation(value);
            setErrors((prev) => ({
                ...prev,
                [itemId]: {
                    ...prev[itemId],
                    [fieldName]: validation.valid ? '' : validation.message || 'Invalid input',
                },
            }));
        }

        onUpdate(itemId, fieldName, value);
    };

    const canAddMore = items.length < maxItems;

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
                {icon && <span className="text-3xl">{icon}</span>}
                <div>
                    <h2 className="text-xl font-bold text-white">{title}</h2>
                    {description && <p className="text-sm text-gray-300">{description}</p>}
                </div>
            </div>

            {/* Items List */}
            <div className="space-y-3">
                <AnimatePresence>
                    {items.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="p-6 text-center text-gray-400 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10"
                        >
                            {emptyMessage}
                        </motion.div>
                    ) : (
                        items.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="border border-white/20 rounded-lg overflow-hidden backdrop-blur-sm bg-white/5"
                            >
                                {/* Item Header (Collapsed View) */}
                                <button
                                    onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                                    className="w-full px-4 py-3 flex items-center justify-between 
                           bg-white/5 hover:bg-white/10 transition-colors"
                                >
                                    <div className="flex items-center gap-3 flex-1 text-left">
                                        <span className="text-sm font-medium text-gray-400">#{index + 1}</span>
                                        <span className="text-sm font-semibold text-white">
                                            {item[fields[0].name] || 'Untitled'}
                                        </span>
                                    </div>
                                    <span className="text-gray-400">{expandedId === item.id ? '▼' : '▶'}</span>
                                </button>

                                {/* Item Details (Expanded View) */}
                                <AnimatePresence>
                                    {expandedId === item.id && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="px-4 py-4 space-y-4 bg-white/5 border-t border-white/20"
                                        >
                                            {/* Form Fields */}
                                            {fields.map((field) => (
                                                <div key={`${item.id}-${field.name}`}>
                                                    <label className="block text-sm font-medium text-gray-200 mb-2">
                                                        {field.label}
                                                        {field.required && <span className="text-red-400 ml-1">*</span>}
                                                    </label>

                                                    {field.type === 'textarea' ? (
                                                        <textarea
                                                            value={item[field.name] || ''}
                                                            onChange={(e) => handleFieldChange(item.id, field.name, e.target.value)}
                                                            placeholder={field.placeholder}
                                                            className={`w-full px-3 py-2 border rounded-lg resize-none bg-white/10 text-white placeholder-gray-400 ${errors[item.id]?.[field.name]
                                                                    ? 'border-red-500 bg-red-500/10'
                                                                    : 'border-white/20'
                                                                }`}
                                                            rows={4}
                                                        />
                                                    ) : field.type === 'select' ? (
                                                        <select
                                                            value={item[field.name] || ''}
                                                            onChange={(e) => handleFieldChange(item.id, field.name, e.target.value)}
                                                            className={`w-full px-3 py-2 border rounded-lg bg-white/10 text-white ${errors[item.id]?.[field.name]
                                                                    ? 'border-red-500 bg-red-500/10'
                                                                    : 'border-white/20'
                                                                }`}
                                                        >
                                                            <option value="">Select...</option>
                                                            {field.options?.map((opt) => (
                                                                <option key={opt.value} value={opt.value}>
                                                                    {opt.label}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    ) : field.type === 'checkbox' ? (
                                                        <label className="flex items-center gap-2 cursor-pointer">
                                                            <input
                                                                type="checkbox"
                                                                checked={item[field.name] || false}
                                                                onChange={(e) => handleFieldChange(item.id, field.name, e.target.checked)}
                                                                className="w-4 h-4 rounded"
                                                            />
                                                            <span className="text-sm text-gray-300">{field.placeholder}</span>
                                                        </label>
                                                    ) : (
                                                        <input
                                                            type={field.type}
                                                            value={item[field.name] || ''}
                                                            onChange={(e) => handleFieldChange(item.id, field.name, e.target.value)}
                                                            placeholder={field.placeholder}
                                                            className={`w-full px-3 py-2 border rounded-lg bg-white/10 text-white placeholder-gray-400 ${errors[item.id]?.[field.name]
                                                                    ? 'border-red-500 bg-red-500/10'
                                                                    : 'border-white/20'
                                                                }`}
                                                        />
                                                    )}

                                                    {/* Error Message */}
                                                    {errors[item.id]?.[field.name] && (
                                                        <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                                                            <span>⚠️</span>
                                                            {errors[item.id][field.name]}
                                                        </p>
                                                    )}
                                                </div>
                                            ))}

                                            {/* Delete Button */}
                                            <button
                                                onClick={() => {
                                                    onRemove(item.id);
                                                    setExpandedId(null);
                                                }}
                                                className="w-full px-3 py-2 bg-red-500/20 text-red-400 rounded-lg 
                                 hover:bg-red-500/30 transition-colors text-sm font-medium border border-red-500/30"
                                            >
                                                🗑️ Delete {title}
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>

            {/* Add Button */}
            <button
                onClick={onAdd}
                disabled={!canAddMore}
                className={`w-full px-4 py-3 rounded-lg font-medium transition-all ${canAddMore
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg'
                        : 'bg-gray-600/50 text-gray-400 cursor-not-allowed'
                    }`}
            >
                + Add {title}
            </button>

            {!canAddMore && (
                <p className="text-xs text-gray-500 text-center">Maximum {maxItems} items allowed</p>
            )}
        </div>
    );
}
