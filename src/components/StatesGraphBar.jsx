import { useState, useEffect } from 'react';
import { getCities, getStates } from '../services/requests';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

export default function RespostasChart() {
  const [selectedState, setSelectedState] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStates = async () => {
    setLoading(true);
    try {
      const data = await getStates();
      setChartData(data);
    } catch (error) {
      console.error('Error fetching states:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCities = async (state) => {
    setLoading(true);
    try {
      const data = await getCities(state);
      setChartData(data);
    } catch (error) {
      console.error('Error fetching cities:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStates();
  }, []);

  const handleBarClick = (data) => {
    if (data && data.activeLabel) {
      setSelectedState(data.activeLabel);
      fetchCities(data.activeLabel);
    }
  };

  const handleBack = () => {
    setSelectedState(null);
    fetchStates();
  };

  return (
    <div style={{ width: 700, height: 400, position: 'relative', textAlign: 'center' }} >
      {selectedState && (
        <button onClick={handleBack} style={{ marginBottom: 10 }}>
          ← Voltar para Estados
        </button>
      )}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ResponsiveContainer>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            onClick={selectedState ? undefined : handleBarClick} 
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={selectedState ? 'city' : 'state'} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total" fill="#8884d8" name="Total Respostas" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
