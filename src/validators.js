const {
  MIN_SALARY_MULTIPLIER,
  MAX_SALARY_MULTIPLIER,
  MAX_REPORTING_LINE,
} = require("./constants");

const validateSalary = (managerSalary, avgSubordinateSalary) => {
  const minSalary = avgSubordinateSalary * MIN_SALARY_MULTIPLIER;
  const maxSalary = avgSubordinateSalary * MAX_SALARY_MULTIPLIER;
  if (managerSalary < minSalary) {
    return { status: "underpaid", difference: minSalary - managerSalary };
  }
  if (managerSalary > maxSalary) {
    return { status: "overpaid", difference: managerSalary - maxSalary };
  }
  return { status: "ok", difference: 0 };
};

const validateReportingLine = (depth) => {
  return depth > MAX_REPORTING_LINE
    ? { status: "tooLong", difference: depth - MAX_REPORTING_LINE }
    : { status: "ok", difference: 0 };
};

module.exports = { validateSalary, validateReportingLine };
