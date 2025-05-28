export const getAllSearch = async (token) => {
  const response = await fetch('http://localhost:3000/dataResearch/', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Fetch failed');
  }

  return response.json();
}