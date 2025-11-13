type Props = {
  name:
    | "external"
    | "github"
    | "linkedin"
    | "mail"
    | "download"
    | "location"
    | "calendar"
    | "arrow-right";
  className?: string;
  title?: string;
};

/**
 * PUBLIC_INTERFACE
 * Icon - Minimal inline SVG icon set.
 */
export function Icon({ name, className, title }: Props) {
  switch (name) {
    case "external":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          aria-hidden={title ? undefined : true}
        >
          {title ? <title>{title}</title> : null}
          <path d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <path d="M15 3h6v6" />
          <path d="M10 14L21 3" />
        </svg>
      );
    case "github":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          width="18"
          height="18"
          fill="currentColor"
          aria-hidden={title ? undefined : true}
        >
          {title ? <title>{title}</title> : null}
          <path d="M12 .5A11.5 11.5 0 0 0 .5 12.3c0 5.25 3.41 9.7 8.15 11.28.6.12.82-.27.82-.6 0-.28-.01-1.03-.02-2.03-3.32.74-4.02-1.64-4.02-1.64-.55-1.44-1.33-1.83-1.33-1.83-1.1-.78.08-.76.08-.76 1.21.09 1.84 1.27 1.84 1.27 1.08 1.88 2.84 1.34 3.53 1.03.11-.8.42-1.34.77-1.65-2.65-.31-5.44-1.37-5.44-6.1 0-1.35.47-2.46 1.24-3.33-.12-.31-.54-1.56.12-3.25 0 0 1.01-.33 3.3 1.26a11.3 11.3 0 0 1 6 0c2.3-1.6 3.3-1.26 3.3-1.26.66 1.7.24 2.95.12 3.25.77.87 1.24 1.98 1.24 3.33 0 4.74-2.8 5.79-5.46 6.1.43.37.82 1.1.82 2.24 0 1.62-.02 2.93-.02 3.33 0 .33.22.73.83.6A11.52 11.52 0 0 0 23.5 12.3 11.5 11.5 0 0 0 12 .5Z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          width="18"
          height="18"
          fill="currentColor"
          aria-hidden={title ? undefined : true}
        >
          {title ? <title>{title}</title> : null}
          <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V23h-4V8.5zM8.5 8.5h3.8v2h.05c.53-1 1.84-2.05 3.8-2.05 4.06 0 4.8 2.67 4.8 6.15V23h-4v-5.87c0-1.4-.03-3.2-1.95-3.2-1.95 0-2.25 1.52-2.25 3.1V23h-4V8.5z" />
        </svg>
      );
    case "mail":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          aria-hidden={title ? undefined : true}
        >
          {title ? <title>{title}</title> : null}
          <path d="M4 4h16v16H4z" />
          <path d="m22 6-10 7L2 6" />
        </svg>
      );
    case "download":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          aria-hidden={title ? undefined : true}
        >
          {title ? <title>{title}</title> : null}
          <path d="M12 3v12" />
          <path d="m7 10 5 5 5-5" />
          <path d="M5 19h14" />
        </svg>
      );
    case "location":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          aria-hidden={title ? undefined : true}
        >
          {title ? <title>{title}</title> : null}
          <path d="M12 21s8-4.5 8-10a8 8 0 1 0-16 0c0 5.5 8 10 8 10z" />
          <circle cx="12" cy="11" r="3" />
        </svg>
      );
    case "calendar":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          aria-hidden={title ? undefined : true}
        >
          {title ? <title>{title}</title> : null}
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
      );
    case "arrow-right":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          aria-hidden={title ? undefined : true}
        >
          {title ? <title>{title}</title> : null}
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      );
  }
  return null;
}
