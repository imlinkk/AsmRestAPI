const express = require("express");

const StudentRepository = require("./src/repositories/StudentRepository");
const StudentService = require("./src/services/StudentService");
const createStudentController = require("./src/controllers/studentController");
const createStudentRoutes = require("./src/routes/studentRoutes");
const errorHandler = require("./src/middlewares/errorHandler");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const studentRepository = new StudentRepository();
const studentService = new StudentService(studentRepository);
const studentController = createStudentController(studentService);

app.get("/", (req, res) => {
  return res.json({
    message: "Student Management API is running"
  });
});

app.use("/api/students", createStudentRoutes(studentController));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
