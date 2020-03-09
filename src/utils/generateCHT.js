function generateCHT(cheats, gameName) {
  let chtText = cheats.map(cheat => {
    return `\n[${cheat.name}]\nON=${cheat.value}\n`;
  }).join('');

  chtText += `\n[GameInfo]\nName=${gameName}\nSystem=GBA\nText=${gameName}`;

  const chtFile = new Blob([chtText.trim()], {type: 'text/plain'});
  return window.URL.createObjectURL(chtFile);
}

export default generateCHT;