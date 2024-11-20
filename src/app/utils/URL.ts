export const setQueryURL = (name: string, value: string) => {
  if (!name) throw new Error("name es requerido");
  if (!value) throw new Error("value es requerido");

  const currentUrl = new URL(window.location.href);
  const searchParams = currentUrl.searchParams;
  searchParams.set(name, value);

  window.history.pushState({}, "", currentUrl.toString());
};

export const getQueryURL = (name: string) => {
  if (!name) throw new Error("name es requerido");

  const currentUrl = new URL(window.location.href);
  const searchParams = currentUrl.searchParams;
  return searchParams.get(name);
};
