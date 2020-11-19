function Csv() {

}
Csv.prototype.parse = (string, separator) => {
  let stringCsv = string.split('\n');
  if (separator === undefined) {
    const comma = [...stringCsv];
    const semicolon = [...stringCsv];
    const tab = [...stringCsv];

    const commaLength = comma.reduce((pr, item, index) => {
      if (!(item.indexOf(',') === -1)) comma[index] = item.split(',');
      if (!(pr === undefined)) if (!(pr === comma[index].length)) return -1;
      if (pr === -1) return;
      return comma[index].length;
    }, undefined);
    const semicolonLength = semicolon.reduce((pr, item, index) => {
      if (!(item.indexOf(';') === -1)) semicolon[index] = item.split(';');
      if (!(pr === undefined)) if (!(pr === semicolon[index].length)) return -1;
      if (pr === -1) return;
      return semicolon[index].length;
    }, undefined);
    const tabLength = tab.reduce((pr, item, index) => {
      if (!(item.indexOf(' ') === -1)) tab[index] = item.split(' ');
      if (!(pr === undefined)) if (!(pr===tab[index].length)) return -1;
      if (pr === -1) return;
      return tab[index].length;
    }, undefined);

    if (!(commaLength === -1)) stringCsv = [...comma];
    if (!(semicolonLength === -1)) stringCsv = [...semicolon];
    if (!(tabLength === -1)) stringCsv = [...tab];

    return stringCsv;
  }
  stringCsv = stringCsv.map((item, index) => stringCsv[index] = item.split(separator));
  return stringCsv;
};
Csv.prototype.generate = (array, separator) => {
  if (!(array[0][0] === 1)) return array.join('\n');
  if (separator === undefined) return array.join(',');
  return array.join(separator);
};
