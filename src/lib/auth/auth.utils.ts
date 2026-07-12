/* eslint-disable @typescript-eslint/no-explicit-any */

export function getApiErrorMessage(error: unknown, fallback = "Something went wrong") {
  if (!error || typeof error !== "object") return fallback;
  const err = error as { data?: any; message?: string };
  if (err.data?.message) return String(err.data.message);
  if (Array.isArray(err.data?.errorMessages)) return err.data.errorMessages.join(", ");
  if (typeof err.data === "string") return err.data;
  if (err.message) return err.message;
  return fallback;
}

export function extractAccessToken(response: unknown): string | null {
  if (!response || typeof response !== "object") return null;
  const r = response as Record<string, any>;
  return (
    r.accessToken ??
    r.token ??
    r.data?.accessToken ??
    r.data?.token ??
    null
  );
}
