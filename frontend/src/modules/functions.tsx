export function checkLocalStorage(str: string): string {
  const item = localStorage.getItem(str);
  if (item !== null) {
    return item;
  }
  return "";
}
export function getParams(data: object, method: string): object {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const accessToken = checkLocalStorage("jwt").replace(/"/g, "");

  if (accessToken !== "") {
    headers.Authorization = `Bearer ${accessToken}`;
  }
  const params = {
    method: method,
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers,
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  };
  return params;
}
