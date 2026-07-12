/** Build URLSearchParams for GET query endpoints (skips empty values) */
export function buildQueryParams(args?: Record<string, unknown>) {
  const params = new URLSearchParams();
  if (args) {
    Object.entries(args).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.append(key, String(value));
      }
    });
  }
  return params;
}
