const createStudentController = (studentService) => {
  const getAllStudents = (req, res, next) => {
    try {
      const students = studentService.getAllStudents(req.query.sort);
      return res.status(200).json({ students });
    } catch (error) {
      return next(error);
    }
  };

  const getStudentById = (req, res, next) => {
    try {
      const student = studentService.getStudentById(req.params.studentId);
      return res.status(200).json({ student });
    } catch (error) {
      return next(error);
    }
  };

  const searchStudents = (req, res, next) => {
    try {
      const students = studentService.searchStudents(req.query.q, req.query.sort);
      return res.status(200).json({ students });
    } catch (error) {
      return next(error);
    }
  };

  const createStudent = (req, res, next) => {
    try {
      const student = studentService.createStudent(req.body);
      return res.status(201).json({ student });
    } catch (error) {
      return next(error);
    }
  };

  const updateStudent = (req, res, next) => {
    try {
      const student = studentService.updateStudent(req.params.studentId, req.body);
      return res.status(200).json({ student });
    } catch (error) {
      return next(error);
    }
  };

  const deleteStudent = (req, res, next) => {
    try {
      studentService.deleteStudent(req.params.studentId);
      return res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
      return next(error);
    }
  };

  return {
    getAllStudents,
    getStudentById,
    searchStudents,
    createStudent,
    updateStudent,
    deleteStudent
  };
};

module.exports = createStudentController;
