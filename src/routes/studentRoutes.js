const express = require("express");

const createStudentRoutes = (studentController) => {
  const router = express.Router();

  router.get("/search", studentController.searchStudents);
  router.get("/", studentController.getAllStudents);
  router.get("/:studentId", studentController.getStudentById);
  router.post("/", studentController.createStudent);
  router.put("/:studentId", studentController.updateStudent);
  router.delete("/:studentId", studentController.deleteStudent);

  return router;
};

module.exports = createStudentRoutes;
