const fs = require("fs");
const path = require("path");

const readCSV = (filePath) => {
  const absolutePath = path.resolve(filePath);
  const data = fs.readFileSync(absolutePath, "utf8");
  return data.split("\n").slice(1).map((line) => {
    const [id, firstName, lastName, salary, managerId] = line.split(",");
    return {
      id: id.trim(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      salary: parseFloat(salary.trim()),
      managerId: managerId ? managerId.trim() : null,
    };
  });
};

module.exports = { readCSV };
