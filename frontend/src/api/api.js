const API_BASE = "http://127.0.0.1:8000";

export async function getBackendStatus() {
  const response = await fetch(`${API_BASE}/`);

  if (!response.ok) {
    throw new Error("Backend connection failed");
  }

  return response.json();
}