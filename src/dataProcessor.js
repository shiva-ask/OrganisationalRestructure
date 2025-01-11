const { validateSalary, validateReportingLine } = require("./validators");

const buildHierarchy = (employees) => {
  const map = new Map();
  employees.forEach((emp) => map.set(emp.id, { ...emp, subordinates: [] }));

  const root = [];
  employees.forEach((emp) => {
    if (emp.managerId) {
      const manager = map.get(emp.managerId);
      if (manager) manager.subordinates.push(map.get(emp.id));
    } else {
      root.push(map.get(emp.id));
    }
  });
  return root;
};

const calculateDepth = (employee, depth = 0) => {
  if (!employee.subordinates.length) return depth;
  return Math.max(...employee.subordinates.map((sub) => calculateDepth(sub, depth + 1)));
};

const processHierarchy = (hierarchy) => {
  const salaryViolations = [];
  const reportingViolations = [];

  const traverse = (employee, depth = 0) => {
    if (depth > 0) {
      const reportingValidation = validateReportingLine(depth);
      if (reportingValidation.status === "tooLong") {
        reportingViolations.push({
          id: employee.id,
          firstName: employee.firstName,
          lastName: employee.lastName,
          ...reportingValidation,
        });
      }
    }

    if (employee.subordinates.length) {
      const avgSalary = employee.subordinates.reduce((sum, sub) => sum + sub.salary, 0) / employee.subordinates.length;
      const salaryValidation = validateSalary(employee.salary, avgSalary);
      if (salaryValidation.status !== "ok") {
        salaryViolations.push({
          id: employee.id,
          firstName: employee.firstName,
          lastName: employee.lastName,
          ...salaryValidation,
        });
      }
    }

    employee.subordinates.forEach((sub) => traverse(sub, depth + 1));
  };

  hierarchy.forEach((root) => traverse(root));
  return { salaryViolations, reportingViolations };
};

module.exports = { buildHierarchy, processHierarchy, calculateDepth };
