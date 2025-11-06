type Handler = () => void;

export function CreateRouter(): Router {
  const routes = new Map<string, Handler>();

  const register = (path: string, handler: Handler) =>
    routes.set(normalize(path), handler);

  const navigate = (path: string) => {
    history.pushState(null, "", path);
    handleLocation();
  };

  const normalize = (path: string): string => {
    return path.replace(/^#/, "").replace(/\?.*$/, "");
  };

  const handleLocation = () => {
    const path = normalize(location.pathname + location.hash);
    const handler = routes.get(path) ?? routes.get("*");
    handler?.();
  };

  window.addEventListener("popstate", handleLocation);
  window.addEventListener("hashchange", handleLocation);

  return { register, navigate };
}

export interface Router {
  register(path: string, handler: Handler): void;

  navigate(path: string): void;
}
