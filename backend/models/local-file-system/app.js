import express from "express";
const app = express();
app.use(express.json());
app.use(express.static('public'));


app.get('/factors/emison', (req, res) => {
  res.send('Hello World');
});

app.get('/calculate-n2o-direct-emissions/soils', (req, res) => {
  const { FS_N_F_ON_CONDITIONS, F_CR, F_SOM, EF_1, N2O_N_OS_CONDITIONS, N2O_N_PRP_CONDITIONS} = req.body;

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

app.get('data/historic/', (req, res) => {
  res.send('data historic');
});
 
// Listen
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));