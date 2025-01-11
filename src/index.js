const { readCSV } = require("./utils");
const { buildHierarchy, processHierarchy } = require("./dataProcessor");

const main = () => {
  const filePath = "./data/employees.csv";
  const employees = readCSV(filePath);

  const hierarchy = buildHierarchy(employees);
  const { salaryViolations, reportingViolations } = processHierarchy(hierarchy);

  console.log("Salary Violations:");
  console.table(salaryViolations);

  console.log("Reporting Line Violations:");
  console.table(reportingViolations);
};

main();
