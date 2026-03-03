export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="font-mono text-sm text-text-secondary">
          <span className="text-accent">&lt;</span>
          built by{" "}
          <a
            href="https://github.com/cazy8"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-primary hover:text-accent transition-colors"
          >
            Harsh Gupta
          </a>
          <span className="text-accent"> /&gt;</span>
          <span className="ml-2 text-text-secondary/60">
            &copy; {currentYear}
          </span>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="https://github.com/cazy8"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-text-secondary hover:text-accent transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/h4rshg/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-text-secondary hover:text-accent transition-colors"
          >
            LinkedIn
          </a>
          <span className="font-mono text-xs text-text-secondary/40">
            v2.0.0
          </span>
        </div>
      </div>
    </footer>
  );
}
