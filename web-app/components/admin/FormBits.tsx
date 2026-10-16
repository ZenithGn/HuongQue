/**
 * Mảnh UI dùng chung cho khu vực quản trị (không chứa hook, không import
 * module server-only nên dùng được ở cả Server và Client Component).
 */

export const adminInputClass =
  'w-full rounded-xl bg-[#120401]/70 border border-[#5c2b12] px-3 py-2 text-sm text-[#f3dfae] ' +
  'placeholder:text-[#a98a5f] focus:outline-none focus:ring-2 focus:ring-[#c59a4b]/60 focus:border-[#c59a4b]/60 ' +
  'disabled:opacity-50 disabled:cursor-not-allowed';

export const adminLabelClass = 'block text-[11px] font-semibold uppercase tracking-wider text-[#c9b69a] mb-1.5';

export const adminCardClass = 'rounded-2xl bg-[#180702]/80 border border-[#5c2b12] p-5';

export function Field({
  label,
  htmlFor,
  error,
  hint,
  required,
  children,
}: {
  label: string;
  htmlFor?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className={adminLabelClass} htmlFor={htmlFor}>
        {label}
        {required ? <span className="text-[#c59a4b]"> *</span> : null}
      </label>
      {children}
      {hint ? <p className="mt-1 text-[11px] text-[#a98a5f]">{hint}</p> : null}
      {error ? <p className="mt-1 text-[11px] font-medium text-rose-400">{error}</p> : null}
    </div>
  );
}

export function Alert({
  tone = 'info',
  children,
}: {
  tone?: 'info' | 'success' | 'error' | 'warning';
  children: React.ReactNode;
}) {
  const tones: Record<string, string> = {
    info: 'bg-[#210c04]/70 border-[#5c2b12] text-[#f3dfae]',
    success: 'bg-[#34d399]/10 border-[#34d399]/40 text-[#34d399]',
    error: 'bg-[#2a0707]/70 border-[#a33b20]/70 text-rose-200',
    warning: 'bg-[#381a0b]/60 border-[#5c2b12]/60 text-[#c59a4b]',
  };
  return (
    <div className={`rounded-xl border px-4 py-3 text-xs leading-relaxed ${tones[tone]}`} role="status">
      {children}
    </div>
  );
}

export function SectionTitle({
  code,
  title,
  description,
}: {
  code?: string;
  title: string;
  description?: string;
}) {
  return (
    <div>
      <h2 className="text-lg font-serif font-bold text-[#f3dfae]">
        {code ? <span className="text-[#c59a4b] font-mono text-xs mr-2">{code}</span> : null}
        {title}
      </h2>
      {description ? <p className="text-xs text-[#c9b69a] mt-1">{description}</p> : null}
    </div>
  );
}
