import Chart from 'chart.js/auto';
import { useState } from 'react';

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
    }
  ]
  });
  useEffect(() => {

  }, []);

  useEffect(() => {
    const setChart = () => {
      const ctx = document.querySelector('.chart-1');
      const ctx2 = document.querySelector('.chart-2');
      const ctx3 = document.querySelector('.chart-3');

      new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });

      new Chart(ctx2, {
        type: 'pie',
        data: data,
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

      new Chart(ctx3, {
        type: 'line',
        data: data,
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

    return () => setChart();
  }, []);




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
                  value={''}
                >
                  <option value="" disabled>-- Selecciona País --</option>
                </select>
              </div>
            </div>
            <canvas 
              className="chart-1"
            ></canvas>
          </div>
          <div className={styles.chart}>
            <h3>Hola</h3>
            <div className={styles.filters}>
              <div className={styles.filter}>
                <label htmlFor="country">País</label>
                <select 
                  name="country" 
                  id="country"
                  value={''}
                >
                  <option value="" disabled>-- Selecciona País --</option>
                </select>
              </div>
              <div className={styles.filter}>
                <label htmlFor="year">Año</label>
                <input 
                  type="number"
                  placeholder='Ej. 2021'
                />
              </div>
            </div>
            <canvas 
              className="chart-2"
            ></canvas>
          </div>
          <div className={styles.chart}>
            <h3>Hola</h3>
            <div className={styles.filters}>
              <div className={styles.filter}>
                <label htmlFor="country">País</label>
                <select 
                  name="country" 
                  id="country"
                  value={''}
                >
                  <option value="" disabled>-- Selecciona País --</option>
                </select>
              </div>
              <div className={styles.filter}>
                <label htmlFor="year">Año</label>
                <input 
                  type="number"
                  placeholder='Ej. 2021'
                />
              </div>
            </div>
            <canvas 
              className="chart-3"
            ></canvas>
          </div>
        </div>
    </>
  )
}

export default Data
