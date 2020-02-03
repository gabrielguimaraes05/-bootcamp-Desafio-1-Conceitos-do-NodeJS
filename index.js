const express = require("express");
const app = express();

app.listen(3010);
app.use(express.json());

const listProjetos = [];


app.use((req, res, next) => {
  //Gerar log de todas as chamadas
  
  console.log(`Metodo: ${req.method} - URL: ${req.url}`);

  return next(); //Continua para o seu respectivo metodo;
});

function checkIDExixts(req, res, next) {
  const { id } = req.params;

  if(!listProjetos[id]) {
      return res.status(500).json({ error: "ID invalido" });
  }
  return next();
}


app.post("/projects", (req, res) => {
  const { id, title } = req.body;

  var project = new Object();
    project.id = id;
    project.title = title;
    project.tasks = [];
  
  listProjetos.push(project);

  res.json({ mens: project });

});

app.get("/projects", (req, res) => {
  res.json({ mens: listProjetos });
});

app.put("/projects/:id", checkIDExixts, (req, res) => {
  
  const { id } = req.params;
  const { title } = req.body;

      listProjetos[id].title = title;
  
    res.json({ mens:  listProjetos[id] });
});

app.delete("/projects/:id", checkIDExixts, (req, res) => {
  const { id } = req.params;

  listProjetos.splice(id, 1);

  res.json({ mens: "Sucesso" });
});

app.post("/projects/:id/tasks", checkIDExixts, (req, res) => {
  const { title } = req.body;
  const { id } = req.params;

    listProjetos[id].tasks.push(title);

    res.json({ mens: listProjetos[id]})
});