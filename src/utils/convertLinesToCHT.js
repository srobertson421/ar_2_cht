function convertLinesToCHT(lines) {
  let converted = '';
  lines.forEach((line, lineIndex) => {
    if(line.value && line.value.length > 3) {
      const splitCode = line.value.split(' ');
      const part1 = splitCode[0].substring(3);
      const part2 = splitCode[1].replace(/^0+/, '').match(/.{1,2}/g).reverse().join(',');
      converted += `${part1},${part2}`;
      if(lineIndex < lines.length - 1) {
        converted += ';';
      }
    }
  });

  return converted;
}

export default convertLinesToCHT;