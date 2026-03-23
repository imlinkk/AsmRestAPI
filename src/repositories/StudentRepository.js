class StudentRepository {
  constructor() {
    this.students = [];
  }

  findAll() {
    return [...this.students];
  }

  findById(studentId) {
    return this.students.find((student) => student.studentId === studentId) || null;
  }

  create(studentData) {
    this.students.push(studentData);
    return studentData;
  }

  update(studentId, updatedData) {
    const index = this.students.findIndex((student) => student.studentId === studentId);
    if (index === -1) {
      return null;
    }

    this.students[index] = {
      ...this.students[index],
      ...updatedData
    };

    return this.students[index];
  }

  delete(studentId) {
    const index = this.students.findIndex((student) => student.studentId === studentId);
    if (index === -1) {
      return false;
    }

    this.students.splice(index, 1);
    return true;
  }

  search(keyword) {
    const normalizedKeyword = keyword.toLowerCase();
    return this.students.filter((student) => {
      return (
        student.studentId.toLowerCase().includes(normalizedKeyword) ||
        student.fullName.toLowerCase().includes(normalizedKeyword)
      );
    });
  }
}

module.exports = StudentRepository;
