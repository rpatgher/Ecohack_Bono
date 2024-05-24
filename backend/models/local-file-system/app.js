import mysql from 'mysql2/promise';
import express from 'express';
import cors from 'cors';

const app = express();

const whitelist = ['http://localhost:5173'];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin)){
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};
// app.use(cors(corsOptions));

 /* import fs from 'fs'; */
app.use(express.json());
app.use(express.static('public'));

async function connectToDB() {
  return await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      port: 3306,
      password: 'r922006',
      database: 'BonoDB'
  });
}


app.get('/factors/emison', (req, res) => {
  res.send('Hello World');
});

app.get('/calculate-n2o-direct-emissions/soils/:info', (req, res) => {
  const { FS_N_F_ON_CONDITIONS, F_CR, F_SOM, EF_1, N2O_N_OS_CONDITIONS, N2O_N_PRP_CONDITIONS} = JSON.parse(req.params.info);
  console.log(JSON.parse(req.params.info));
  let FS_N_F_ON_EF1i_SUM = 0;
  FS_N_F_ON_CONDITIONS.forEach(condition => {
    const { F_SN, F_ON, EF_1i} = condition;
    FS_N_F_ON_EF1i_SUM += (F_SN + F_ON) * EF_1i;
  });

  let N2O_N_OS_SUM = 0;
  N2O_N_OS_CONDITIONS.forEach(condition => {
    const { F_OS, EF_2 } = condition;
    N2O_N_OS_SUM += F_OS * EF_2;
  });

  let N2O_N_PRP_SUM = 0;
  N2O_N_PRP_CONDITIONS.forEach(condition => {
    const { F_PRP, EF3_PRP } = condition;
    N2O_N_PRP_SUM += F_PRP * EF3_PRP;
  })

  const N2O_N = FS_N_F_ON_EF1i_SUM + (F_CR + F_SOM) * EF_1 + N2O_N_OS_SUM + N2O_N_PRP_SUM;
  const N2O = N2O_N * (44/28);
  res.json({ N2O });

});

app.get('/data/historical-emissions/:info', async (req, res) => {
  let connection = null;
  
  const { country } = JSON.parse(req.params.info);

  try {
    connection = await connectToDB();

   const query = `
      SELECT year, value
      FROM emissions
      WHERE country = ? AND sector_title = 'AFOLU'
    `;

    const [results] = await connection.execute(query, [country]);

    const formattedResults = results.map(row => ({
      year: row.year,
      value: row.value
    }));

    res.json(formattedResults);

    // const params = [];
    // if (country) {
    //   query += ' AND country = ?';
    //   params.push(country);
    // }
    // if (region_ar6_6) {
    //   query += ' AND region_ar6_6 = ?';
    //   params.push(region_ar6_6);
    // }
    // if (year) {
    //   query += ' AND year = ?';
    //   params.push(year);
    // }
    // if (sector_title) {
    //   query += ' AND sector_title = ?';
    //   params.push(sector_title);
    // }
    // if (subsector_title) {
    //   query += ' AND subsector_title = ?';
    //   params.push(subsector_title);
    // }
    // if (gas) {
    //   query += ' AND gas = ?';
    //   params.push(gas);
    // }
    // if (value) {
    //   query += ' AND value = ?';
    //   params.push(value);
    // }
    // console.log(query);
    // const [rows] = await connection.query(query, params);
    // res.status(200).json(rows);

  } catch (error) {

    console.log(error.message);
    res.status(500).json({"message" : "Failed to query in data base"});

  } finally {
    if (connection !== null) {
      connection.end();
      console.log('Conexión cerrada exitosamente');
  }
  }
});


app.get('/data/historical-emissions/gas', async (req, res) => {
  const {country, year} = req.body;
  console.log(req.body);
  //JSON.parse(req.params.info);
  let connection = null;

  try {

    connection = await connectToDB();

    const query = `
    SELECT gas, SUM(value) as total_value
    FROM emissions
    WHERE country = ? AND year = ? AND sector_title = 'AFOLU'
    GROUP BY gas
  `;

  const [results] = await connection.execute(query, [country, year]);

  const formattedResults = results.reduce((acc, row) => {
    acc[row.gas] = row.total_value;
    return acc;
  }, {});

  res.json(formattedResults);

  } catch (error) {
    console.log(error.message);
    res.status(500).json({"message" : "Failed to query in data base"});
  } finally {
    if (connection !== null) {
      connection.end();
      console.log('Conexión cerrada exitosamente');
    }
  }
});
 
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));