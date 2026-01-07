import React from 'react';
import type { CVPreviewProps } from '@/lib/types/cv.types';

export const ModernTemplate = React.memo(({ data, config, atsScore }: CVPreviewProps) => {
    const { contact, personalStatement, workHistory, education, skills, languages } = data;
    const dir = config.features.supportRTL && data.contact.fullName ? 'ltr' : 'ltr'; // TODO: Detect from language

    return (
        <div
            className="w-full h-full bg-white text-gray-900 p-12"
            dir={dir}
            style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: config.typography.bodySize,
                lineHeight: config.spacing.lineHeight,
            }}
        >
            {/* Header Section */}
            <div className="mb-8">
                <div className="flex items-start gap-6">
                    {/* Photo */}
                    {config.features.includePhoto && (contact.photoUrl || contact.photoBase64) && (
                        <div className="flex-shrink-0">
                            <img
                                src={contact.photoBase64 || contact.photoUrl}
                                alt={contact.fullName}
                                className="w-32 h-32 rounded-full object-cover border-4"
                                style={{ borderColor: config.colors.accent }}
                            />
                        </div>
                    )}

                    {/* Contact Info */}
                    <div className="flex-1">
                        <h1
                            className="font-bold mb-2"
                            style={{
                                fontSize: config.typography.headingSize,
                                color: config.colors.primary,
                            }}
                        >
                            {contact.fullName || 'Your Name'}
                        </h1>
                        <p
                            className="text-lg mb-4"
                            style={{ color: config.colors.accent }}
                        >
                            {contact.title || 'Your Title'}
                        </p>

                        <div className="grid grid-cols-2 gap-2 text-sm" style={{ color: config.colors.secondary }}>
                            {contact.email && (
                                <div className="flex items-center gap-2">
                                    <span>📧</span>
                                    <span>{contact.email}</span>
                                </div>
                            )}
                            {contact.phone && (
                                <div className="flex items-center gap-2">
                                    <span>📱</span>
                                    <span>{contact.phone}</span>
                                </div>
                            )}
                            {contact.address && (
                                <div className="flex items-center gap-2">
                                    <span>📍</span>
                                    <span>{contact.address}</span>
                                </div>
                            )}
                            {contact.linkedin && (
                                <div className="flex items-center gap-2">
                                    <span>🔗</span>
                                    <span className="truncate">{contact.linkedin}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Professional Summary */}
            {personalStatement.summary && (
                <div className="mb-6" style={{ marginTop: config.spacing.sectionGap }}>
                    <h2
                        className="text-xl font-semibold mb-3 pb-2 border-b-2"
                        style={{
                            color: config.colors.primary,
                            borderColor: config.colors.accent,
                        }}
                    >
                        Professional Summary
                    </h2>
                    <p style={{ color: config.colors.text }}>{personalStatement.summary}</p>
                </div>
            )}

            {/* Work History */}
            {workHistory.length > 0 && (
                <div className="mb-6" style={{ marginTop: config.spacing.sectionGap }}>
                    <h2
                        className="text-xl font-semibold mb-3 pb-2 border-b-2"
                        style={{
                            color: config.colors.primary,
                            borderColor: config.colors.accent,
                        }}
                    >
                        Work Experience
                    </h2>
                    <div className="space-y-4">
                        {workHistory.map((job) => (
                            <div key={job.id}>
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className="font-semibold" style={{ color: config.colors.primary }}>
                                        {job.role}
                                    </h3>
                                    <span className="text-sm" style={{ color: config.colors.secondary }}>
                                        {job.startDate} - {job.isCurrentRole ? 'Present' : job.endDate}
                                    </span>
                                </div>
                                <p className="text-sm mb-2" style={{ color: config.colors.accent }}>
                                    {job.company} • {job.location}
                                </p>
                                <p className="text-sm" style={{ color: config.colors.text }}>
                                    {job.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Education */}
            {education.length > 0 && (
                <div className="mb-6" style={{ marginTop: config.spacing.sectionGap }}>
                    <h2
                        className="text-xl font-semibold mb-3 pb-2 border-b-2"
                        style={{
                            color: config.colors.primary,
                            borderColor: config.colors.accent,
                        }}
                    >
                        Education
                    </h2>
                    <div className="space-y-3">
                        {education.map((edu) => (
                            <div key={edu.id}>
                                <div className="flex justify-between items-start">
                                    <h3 className="font-semibold" style={{ color: config.colors.primary }}>
                                        {edu.degree} in {edu.field}
                                    </h3>
                                    <span className="text-sm" style={{ color: config.colors.secondary }}>
                                        {edu.startDate} - {edu.endDate}
                                    </span>
                                </div>
                                <p className="text-sm" style={{ color: config.colors.accent }}>
                                    {edu.school}
                                </p>
                                {edu.grade && (
                                    <p className="text-sm" style={{ color: config.colors.secondary }}>
                                        Grade: {edu.grade}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Skills */}
            {skills.length > 0 && (
                <div className="mb-6" style={{ marginTop: config.spacing.sectionGap }}>
                    <h2
                        className="text-xl font-semibold mb-3 pb-2 border-b-2"
                        style={{
                            color: config.colors.primary,
                            borderColor: config.colors.accent,
                        }}
                    >
                        Skills
                    </h2>
                    <div className="grid grid-cols-2 gap-3">
                        {skills.map((skill) => (
                            <div key={skill.id}>
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-sm font-medium" style={{ color: config.colors.text }}>
                                        {skill.name}
                                    </span>
                                    <span className="text-xs" style={{ color: config.colors.secondary }}>
                                        {skill.level}/5
                                    </span>
                                </div>
                                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        className="h-full rounded-full"
                                        style={{
                                            width: `${(skill.level / 5) * 100}%`,
                                            backgroundColor: config.colors.accent,
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Languages */}
            {config.features.includeLanguages && languages.length > 0 && (
                <div className="mb-6" style={{ marginTop: config.spacing.sectionGap }}>
                    <h2
                        className="text-xl font-semibold mb-3 pb-2 border-b-2"
                        style={{
                            color: config.colors.primary,
                            borderColor: config.colors.accent,
                        }}
                    >
                        Languages
                    </h2>
                    <div className="grid grid-cols-2 gap-3">
                        {languages.map((lang) => (
                            <div key={lang.id} className="flex justify-between items-center">
                                <span className="text-sm font-medium" style={{ color: config.colors.text }}>
                                    {lang.name}
                                </span>
                                <span
                                    className="text-xs px-2 py-1 rounded"
                                    style={{
                                        backgroundColor: `${config.colors.accent}20`,
                                        color: config.colors.accent,
                                    }}
                                >
                                    {lang.level}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
});

ModernTemplate.displayName = 'ModernTemplate';
