// components/DetailPanel.jsx
const DetailPanel = ({ item, onClose }) => {
  if (!item) return null;

return (
    <div className="fixed top-0 right-0 w-96 h-full bg-white shadow-lg border-l border-gray-200 z-50 p-6 overflow-y-auto">
       <div className="flex justify-end mb-4">
        <button onClick={onClose} className="text-sm text-blue-600">
            <strong>Fechar ✕</strong>
        </button>
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
        Detalhes da Pesquisa
      </h2>
      <h3 className="text-lg font-semibold text-gray-700 mb-4 uppercase tracking-wide">
        Dados Sociográficos
      </h3>
      <div className="space-y-2">
        <p><strong>Cidade:</strong> {item.city}</p>
        <p><strong>Estado:</strong> {item.state}</p>
        <p><strong>Idade:</strong> {item.age}</p>
        <p><strong>Tipo instituição:</strong> {item.institutionType}</p>
        <p><strong>Sexo:</strong> {item.gender}</p>
        <p><strong>Estado Civil:</strong> {item.marital_status}</p>
        <p><strong>Religião:</strong> {item.religion}</p>
        <p><strong>Semestre:</strong> {item.semester}</p>
        <p><strong>Experiência:</strong> {item.experience_time}</p>
        <p><strong>Curso Suicídio?:</strong> {item.suicideCourse}</p>
        <p><strong>Disciplina Suicídio?:</strong> {item.suicideDiscipline}</p>
        <p><strong>Estagio Suicídio?:</strong> {item.suicideInternship}</p>
        <p><strong>Contato com casos Suicídio? :</strong> {item.suicide}</p>
        <p><strong>Renda:</strong> {item.salaryAverage}</p>
        <p><strong>Data de Criação:</strong> {new Date(item.createdAt).toLocaleString()}</p>
      </div>
      <h3 className="text-lg font-semibold text-gray-700 mb-4 mt-4 uppercase tracking-wide">
        RESPOSTAS
      </h3>
      <div className="space-y-2">
        <p><strong>Resposta 1:</strong> {item.answer_1}</p>
        <p><strong>Resposta 2:</strong> {item.answer_2}</p>
        <p><strong>Resposta 3:</strong> {item.answer_3}</p>
        <p><strong>Resposta 4:</strong> {item.answer_4}</p>
        <p><strong>Resposta 5:</strong> {item.answer_5}</p>
        <p><strong>Resposta 6:</strong> {item.answer_6}</p>
        <p><strong>Resposta 7:</strong> {item.answer_7}</p>
        <p><strong>Resposta 8:</strong> {item.answer_8}</p>
        <p><strong>Resposta 9:</strong> {item.answer_9}</p>
        <p><strong>Resposta 10:</strong> {item.answer_10}</p>
        <p><strong>Resposta 11:</strong> {item.answer_11}</p>
        <p><strong>Resposta 12:</strong> {item.answer_12}</p>
        <p><strong>Resposta 13:</strong> {item.answer_13}</p>
        <p><strong>Resposta 14:</strong> {item.answer_14}</p>
        <p><strong>Resposta 15:</strong> {item.answer_15}</p>
        <p><strong>Resposta 16:</strong> {item.answer_16}</p>
        <p><strong>Resposta 17:</strong> {item.answer_17}</p>
        <p><strong>Resposta 18:</strong> {item.answer_18}</p>
        <p><strong>Resposta 19:</strong> {item.answer_19}</p>
        <p><strong>Resposta 20:</strong> {item.answer_20}</p>
        <p><strong>Resposta 21:</strong> {item.answer_21}</p>
      </div>
    </div>
  );
};

export default DetailPanel;
