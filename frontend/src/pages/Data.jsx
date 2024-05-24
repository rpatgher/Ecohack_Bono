import Chart from 'chart.js/auto';
import { useState } from 'react';
import axios from 'axios';

// ***************** Styles *****************
import styles from '../styles/Data.module.css';

// ***************** Components *****************
import Header from '../components/Header';
import { useEffect } from 'react';

const Data = () => {
  const [data, setData] = useState({
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      borderWidth: 1
    }]
  });
  useEffect(() => {

  }, []);

  useEffect(() => {
    const setChart = () => {
      const ctx2 = document.getElementById('chart-2');
      const ctx3 = document.getElementById('chart-3');

      if(ctx2){
        new Chart(ctx2, {
          type: 'pie',
          data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
              label: '# of Votes',
              data: [12, 19, 3, 5, 2, 3],
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Chart.js Pie Chart'
              }
            }
          },
        })
      }

      if(ctx3){
        new Chart(ctx3, {
          type: 'line',
          data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
              label: '# of Votes',
              data: [12, 19, 3, 5, 2, 3],
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Chart.js Line Chart'
              }
            }
          },
        })
      }
    }
    return () => setChart();
  }, []);

  const [request1, setRequest1] = useState({
    country: '',
    year: ''
  });

  const [request2, setRequest2] = useState({
    country: '',
  });


  const handleRequest2 = async (e) => {
    setRequest2({
      ...request2,
      [e.target.name]: e.target.value
    });
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    try {
        const response = await axios.get(`http://localhost:3000/data/historical-emissions/${request2.country}`, config);
        
        console.log(response);
    } catch (error) {
        console.error(error);
    }

  }




  return (
    <>
        <Header
          title={'Datos Históricos'}
        />
        <div className={styles.charts}>
          <div className={styles.chart}>
            <h3>Hola</h3>
            <div className={styles.filters}>
              <div className={styles.filter}>
                <label htmlFor="country">País</label>
                <select 
                  name="country" 
                  id="country"
                  value={request2.country || ''}
                  onChange={handleRequest2}
                >
                  <option value="" disabled>-- Selecciona País --</option>
                  <option value="Mexico">México</option>
                </select>
              </div>
            </div>
            <canvas 
              id="chart-3"
            ></canvas>
          </div>
        </div>
    </>
  )
}

export default Data
