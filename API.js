import express from "express";
const app = express();
const students = [];
const classes = ["JS1", "JS2", "JS3", "SS1", "SS2", "SS3"];
app.use(express.json());
const scanner = (data, isPartilal = false) => {
  const { name, age, studentClass, address } = data;
  const errors = [];
  if (!isPartilal || name !== undefined) {
    if (name.trim().length < 2 || typeof name !== "string")
      errors.push("Invalid Name");
  }
  if (!isPartilal || age !== undefined) {
    if (age < 10 || typeof age !== "number") errors.push("Invalid Age");
  }
  if (!isPartilal || studentClass !== undefined) {
    if (!classes.includes(studentClass) || typeof studentClass !== "string")
      errors.push("Invalid CLass");
  }
  if (!isPartilal || address !== undefined) {
    if (typeof address !== "string" || address.trim().length < 2)
      errors.push("Invalid Address");
  }
  return errors;
};
app.get("/CNPS", (req, res) => {
  console.log("someone just visited our website");
  res.send("welcome to Carmel Nursery And Primary School");
});
app.post("/CNPS/addstudent", (req, res) => {
  const student = req.body;
  const lastStudent = students[students.length - 1];
  student.id = lastStudent ? lastStudent.id + 1 : 1;
  const bouncer = scanner(student);
  if (bouncer.length > 0) {
    return res.status(400).send(`ERROR: ${bouncer.join(", ")}`);
  }
  students.push(student);
  res.send(`${student.name} has been successfully added`);
  console.log(students);
});
app.get("/CNPS/students", (req, res) => {
  res.send(students);
});
app.put("/CNPS/update/:id", (req, res) => {
  const student = req.body;
  const studentId = students.findIndex((s) => s.id === Number(req.params.id));
  if (studentId < 0) {
    return res.status(404).send("Student Not Found");
  }
  const bouncer = scanner(student);
  if (bouncer.length > 0) {
    res.status(400).send(`ERROR: ${bouncer.join(", ")}`);
  }
  res.send(`${student.name} has been successfully updated }`);
  console.log(students);
  students[studentId] = { ...students[studentId], ...student };
});
app.patch("/CNPS/update/:id", (req, res) => {
  const student = req.body;
  const studentId = students.findIndex((s) => s.id === Number(req.params.id));
  if (studentId < 0) {
    return res.status(404).send("Student Not Found");
  }
  const bouncer = scanner(student, true);
  if (bouncer.length > 0) {
    return res.status(400).send(`ERROR: ${bouncer.join(", ")}`);
  }
  res.send(`${student.name} has been updated`);
  students[studentId] = { ...students[studentId], ...student };
  console.log(students);
});
app.delete("/CNPS/delete/:id", (req, res) => {
  const student = students.findIndex((s) => s.id === Number(req.params.id));
  if (student < 0) {
    return res.status(404).send("Student Not Found");
  }
  res
    .status(200)
    .send(`${students[student].name} has been successfully deleted`);
  students.splice(student, 1);
});
app.listen(3000, () => {
  console.log("Server is up and running at port 3000");
});
