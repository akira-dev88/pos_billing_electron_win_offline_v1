const API_URL = "http://127.0.0.1:8000";

export async function getProfile() {
  const res = await fetch(`${API_URL}/api/me`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return res.json();
}