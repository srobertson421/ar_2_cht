import generateCHT from './generateCHT';

const downloadCHT = game => {
  if(game) {
    const chtURL = generateCHT(game.cheats, game.name);
    const a = document.createElement('a');
    a.href = chtURL;
    a.download = `${game.name}.cht`;
    a.click();
  }
}

export default downloadCHT;