export function PageIntro({ title, description }: { title: string; description: string }) {
  return (
    <header className="page-head">
      <h1 className="display display-page">{title}</h1>
      <div className="grid">
        <p className="statement">{description}</p>
      </div>
    </header>
  );
}
