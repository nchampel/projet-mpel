export function checkLocalStorage(str: string): string {
  const item = localStorage.getItem(str)
  if (item !== null) {
    return item;
  }
  return '';
}
// export function getParamsPOST(accessToken: string, data: {}): {}{
export function getParams(
  data: {},
  method: string,
  // accessToken: string = ""
): {} {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const accessToken = checkLocalStorage("jwt").replaceAll('"', "")

  // Ajouter Authorization seulement si accessToken n'est pas vide
  if (accessToken !== "") {
    headers.Authorization = `Bearer ${accessToken}`;
  }
  // headers.Authorization = "Bearer 1";
  const params = {
    method: method,
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    // headers: {
    // "Content-Type": "application/json",
    // Authorization: `Bearer ${accessToken}`,
    // },
    headers,
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data),
  };
  // console.log(params);
  return params;
}

