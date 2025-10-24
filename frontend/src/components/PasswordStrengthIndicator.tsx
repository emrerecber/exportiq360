import React from 'react';
import { validatePasswordStrength } from '../utils/validation';

interface PasswordStrengthIndicatorProps {
  password: string;
}

export default function PasswordStrengthIndicator({ password }: PasswordStrengthIndicatorProps) {
  const strength = validatePasswordStrength(password);

  if (!password) return null;

  const colorMap = {
    red: 'bg-red-500',
    orange: 'bg-orange-500',
    yellow: 'bg-yellow-500',
    green: 'bg-green-500',
  };

  const textColorMap = {
    red: 'text-red-600',
    orange: 'text-orange-600',
    yellow: 'text-yellow-600',
    green: 'text-green-600',
  };

  return (
    <div className="mt-2 space-y-2">
      {/* Progress Bar */}
      <div className="flex gap-1">
        {[0, 1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className={`h-1 flex-1 rounded-full transition-all ${
              level <= strength.score
                ? colorMap[strength.color as keyof typeof colorMap]
                : 'bg-gray-200'
            }`}
          />
        ))}
      </div>

      {/* Strength Label */}
      <div className="flex items-center justify-between">
        <span className={`text-xs font-medium ${textColorMap[strength.color as keyof typeof textColorMap]}`}>
          Şifre Gücü: {strength.label}
        </span>
        {strength.isValid && (
          <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>

      {/* Suggestions */}
      {strength.suggestions.length > 0 && (
        <ul className="text-xs text-gray-600 space-y-1">
          {strength.suggestions.map((suggestion, index) => (
            <li key={index} className="flex items-center">
              <span className="mr-1">•</span>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
