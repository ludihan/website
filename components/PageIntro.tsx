// A page title, with an optional statement below it on the grid.
export function PageIntro({ title, description }: { title: string; description?: string }) {
  return (
    <header className="page-head">
      <h1 className="display display-page">{title}</h1>
      {description && (
        <div className="grid">
          <p className="statement">{description}</p>
        </div>
      )}
    </header>
  );
}
