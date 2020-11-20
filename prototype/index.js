const alphabetCaps = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const numeral = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26'];
function Csv() {

}
const parseString = function parseStr(string, separator) {
  let stringCsv = string.split('\n');
  if (separator === undefined) {
    const comma = [...stringCsv];
    const semicolon = [...stringCsv];
    const tab = [...stringCsv];

    const commaLength = comma.reduce((pr, item, index) => {
      if (!(item.indexOf(',') === -1)) comma[index] = item.split(',');
      else return -1;
      if (!(pr === undefined)) if (!(pr === comma[index].length)) return -1;
      if (pr === -1) return -1;
      return comma[index].length;
    }, undefined);
    const semicolonLength = semicolon.reduce((pr, item, index) => {
      if (!(item.indexOf(';') === -1)) semicolon[index] = item.split(';');
      else return -1;
      if (!(pr === undefined)) if (!(pr === semicolon[index].length)) return -1;
      if (pr === -1) return -1;
      return semicolon[index].length;
    }, undefined);
    const tabLength = tab.reduce((pr, item, index) => {
      if (!(item.indexOf(' ') === -1)) tab[index] = item.split(' ');
      else return -1;
      if (!(pr === undefined)) if (!(pr === tab[index].length)) return -1;
      if (pr === -1) return -1;
      return tab[index].length;
    }, undefined);

    if (!(commaLength === -1)) stringCsv = [...comma];
    if (!(semicolonLength === -1)) stringCsv = [...semicolon];
    if (!(tabLength === -1)) stringCsv = [...tab];

    return stringCsv;
  }
  stringCsv = stringCsv.map((item, index) => {stringCsv[index] = item.split(separator)});
  return stringCsv;
};
const generateString = function generateStr(array, separator) {
  let arrayCsv = [...array];
  const joinArray = function joinArr(localSeparator) {
    if (!(array[0][0].length === 1)) {
      arrayCsv = arrayCsv.map((item, index) => {arrayCsv[index] = item.join(localSeparator)});
      return arrayCsv.join('\n');
    }
    return arrayCsv.join(localSeparator);
  };
  if (separator === undefined) return joinArray(',', arrayCsv);
  return joinArray(separator, arrayCsv);
};
Csv.prototype.parse = (string, separator) => {
  if (separator === undefined) return parseString(string);
  return parseString(string, separator);
};
Csv.prototype.generate = (array, separator) => {
  if (separator === undefined) return generateString(array);
  return generateString(array, separator);
};

function CsvArray() {

}
CsvArray.prototype = Object.create(Array.prototype);
CsvArray.prototype.parse = (string, separator) => {
  let csvArray;
  if (separator === undefined) csvArray = parseString(string);
  else csvArray = parseString(string, separator);
  csvArray = csvArray.map((item) => CsvArray.prototype.push(item));
};
CsvArray.prototype.generate = (separator) => {
  if (separator === undefined) return generateString(CsvArray.prototype);
  return generateString(CsvArray.prototype, separator);
};
CsvArray.prototype.getCell = (nameOfCell) => {
  const cell = nameOfCell.trim().split('');
  let column;
  let row;
  for (let counter = 0; counter < alphabetCaps.length; counter += 1) {
    if (cell[0] === alphabetCaps[counter]) column = counter;
    if (cell[1] === numeral[counter]) row = counter;
  }
  return CsvArray.prototype[row][column];
};
