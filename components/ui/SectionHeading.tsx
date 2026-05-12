type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  copy?: string;
};

export function SectionHeading({ eyebrow, title, copy }: SectionHeadingProps) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="mb-4 text-xs uppercase tracking-[0.3em] text-amber">{eyebrow}</p>
      <h2 className="font-display fluid-heading font-light">{title}</h2>
      {copy ? <p className="mx-auto mt-5 max-w-2xl text-balance text-muted">{copy}</p> : null}
    </div>
  );
}
