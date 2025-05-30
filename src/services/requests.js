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

export const generateExcel = async () => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;

    const response = await fetch('http://localhost:3000/dataResearch/export', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Erro ao baixar o arquivo');
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'dados_pesquisa.xlsx';
    document.body.appendChild(a);
    a.click();
    a.remove();

    window.URL.revokeObjectURL(url);

  } catch (error) {
    console.error('Erro ao gerar Excel:', error);
  }
};

export const deleteSearch = async (id) => {
  try{
      await fetch(`http://localhost:3000/dataResearch/${id}`, { method: 'DELETE' });
  }catch (error){
      console.error('Erro ao gerar Excel:', error);
  }
  
}