const AppError = require("../utils/AppError");
const { studentSchema, updateStudentSchema } = require("../utils/studentValidation");

class StudentService {
  constructor(studentRepository) {
    this.studentRepository = studentRepository;
  }

  getAllStudents(sort) {
    const students = this.studentRepository.findAll();
    return this.sortStudents(students, sort);
  }

  getStudentById(studentId) {
    const student = this.studentRepository.findById(studentId);
    if (!student) {
      throw new AppError(404, "Student not found");
    }

    return student;
  }

  searchStudents(query, sort) {
    if (!query || !query.trim()) {
      return [];
    }

    const students = this.studentRepository.search(query.trim());
    return this.sortStudents(students, sort);
  }

  createStudent(payload) {
    const { value, error } = studentSchema.validate(payload);
    if (error) {
      throw new AppError(400, error.details[0].message);
    }

    if (this.studentRepository.findById(value.studentId.trim())) {
      throw new AppError(409, "studentId already exists");
    }

    this.ensureAdult(value.dateOfBirth);

    const student = {
      studentId: value.studentId.trim(),
      fullName: value.fullName.trim(),
      dateOfBirth: this.toIsoDate(value.dateOfBirth),
      averageScore: value.averageScore,
      className: value.className.trim()
    };

    return this.studentRepository.create(student);
  }

  updateStudent(studentId, payload) {
    const existingStudent = this.studentRepository.findById(studentId);
    if (!existingStudent) {
      throw new AppError(404, "Student not found");
    }

    const { value, error } = updateStudentSchema.validate(payload);
    if (error) {
      throw new AppError(400, error.details[0].message);
    }

    if (value.dateOfBirth) {
      this.ensureAdult(value.dateOfBirth);
      value.dateOfBirth = this.toIsoDate(value.dateOfBirth);
    }

    if (typeof value.fullName === "string") {
      value.fullName = value.fullName.trim();
    }

    if (typeof value.className === "string") {
      value.className = value.className.trim();
    }

    return this.studentRepository.update(studentId, value);
  }

  deleteStudent(studentId) {
    const deleted = this.studentRepository.delete(studentId);
    if (!deleted) {
      throw new AppError(404, "Student not found");
    }
  }

  sortStudents(students, sortQuery) {
    if (!sortQuery) {
      return students;
    }

    const [field, direction = "asc"] = sortQuery.split(":");
    const allowedFields = ["studentId", "fullName", "averageScore"];

    if (!allowedFields.includes(field)) {
      throw new AppError(400, "Invalid sort field. Allowed: studentId, fullName, averageScore");
    }

    const factor = direction.toLowerCase() === "desc" ? -1 : 1;

    return [...students].sort((a, b) => {
      if (typeof a[field] === "string") {
        return a[field].localeCompare(b[field]) * factor;
      }

      return (a[field] - b[field]) * factor;
    });
  }

  toIsoDate(inputDate) {
    const date = new Date(inputDate);
    return date.toISOString().slice(0, 10);
  }

  ensureAdult(inputDate) {
    const dob = new Date(inputDate);
    const now = new Date();

    let age = now.getFullYear() - dob.getFullYear();
    const monthDiff = now.getMonth() - dob.getMonth();
    const dayDiff = now.getDate() - dob.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age -= 1;
    }

    if (age < 18) {
      throw new AppError(400, "Student must be at least 18 years old");
    }
  }
}

module.exports = StudentService;
