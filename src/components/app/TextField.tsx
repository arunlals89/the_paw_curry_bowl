"use client";

import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

type BaseProps = {
  label: string;
  error?: string;
};

type TextFieldProps = BaseProps &
  InputHTMLAttributes<HTMLInputElement> & { multiline?: false };

type TextAreaFieldProps = BaseProps &
  TextareaHTMLAttributes<HTMLTextAreaElement> & { multiline: true };

export function TextField(props: TextFieldProps | TextAreaFieldProps) {
  const { label, error, className, multiline, ...rest } = props;
  const fieldClassName = `w-full rounded-xl border bg-white px-4 py-3 text-[15px] text-bark placeholder:text-bark-soft/50 focus:outline-none focus:ring-2 focus:ring-paw-orange/30 ${
    error ? "border-paw-red" : "border-black/10"
  } ${className ?? ""}`;

  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-semibold text-bark">{label}</span>
      {multiline ? (
        <textarea rows={3} className={fieldClassName} {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)} />
      ) : (
        <input className={fieldClassName} {...(rest as InputHTMLAttributes<HTMLInputElement>)} />
      )}
      {error ? <span className="text-xs font-medium text-paw-red">{error}</span> : null}
    </label>
  );
}
