(function main() {
  const cheats = [];
  const codesContainer = document.getElementById('codes');
  const newCodeNameInput = document.getElementById('new-code-name');
  const newCodeButton = document.getElementById('add-code');
  const downloadButton = document.getElementById('download-btn');
  const frontPatterns = ['001', '002', '003', '004', '022'];

  function generateCHT() {
    const chtText = cheats.map(cheat => {
      return `\n[${cheat.name}]\nON=${cheat.converted}\n`;
    }).join('');

    const chtFile = new Blob([chtText.trim()], {type: 'text/plain'});
    const chtURL = window.URL.createObjectURL(chtFile);

    downloadButton.parentNode.href = chtURL;
    downloadButton.innerText = '.cht File Ready for Download!';
    downloadButton.disabled = false;
  }

  function addCheat(name) {
    cheats.push({
      name: name,
      original: [],
      converted: ''
    });

    renderCheats();
  }

  function removeCheat(cheatIndex) {
    cheats.splice(cheatIndex, 1);

    renderCheats();
  }

  function onCodeLineChange(newValue, cheatIndex, lineIndex) {
    cheats[cheatIndex].original[lineIndex] = newValue;
  }

  function addLineToCode(cheatIndex) {
    cheats[cheatIndex].original.push('');
    renderCheats();
  }

  function removeLineFromCode(cheatIndex, lineIndex) {
    cheats[cheatIndex].original.splice(lineIndex, 1);
    renderCheats();
  }

  function convertCode(cheat, index) {
    cheat.original.forEach(function(line, lineIndex) {
      if(frontPatterns.some(p => line.substring(0, 3) === p)) {
        const splitCode = line.split(' ');
        const part1 = splitCode[0].substring(3);
        const part2 = splitCode[1].replace(/^0+/, '').match(/.{1,2}/g).reverse().join(',');
        cheats[index].converted += `${part1},${part2}`;
        if(lineIndex < cheat.original.length - 1) {
          cheats[index].converted += ';';
        }
      } else {
        console.log(`Cheat ${cheat.name} - Line ${lineIndex} is invalid`);
        alert('Looks like the code you entered is invalid!\nMake sure to check the rules on how codes should start');
      }
    });

    renderCheats();
  }

  function createInputs(originals, cheatIndex, parent) {
    originals.forEach((cheat, index) => {
      const inputLabel = document.createElement('label');
      inputLabel.classList.add('label');
      inputLabel.innerText = `Line ${index + 1}`;
      const lineDelete = document.createElement('button');
      lineDelete.classList.add('delete');
      lineDelete.classList.add('is-pulled-right');
      lineDelete.addEventListener('click', function() { removeLineFromCode(cheatIndex, index) });
      inputLabel.appendChild(lineDelete);
      const inputDiv = document.createElement('div');
      inputDiv.classList.add('control');
      inputDiv.classList.add('is-expanded');
      const cheatInput = document.createElement('input');
      cheatInput.classList.add('input');
      cheatInput.value = cheat;
      cheatInput.addEventListener('input', function(e) { onCodeLineChange(e.target.value, cheatIndex, index) });

      inputDiv.appendChild(cheatInput);
      parent.appendChild(inputLabel);
      parent.appendChild(inputDiv);
    });
  }

  function renderCheats() {
    codesContainer.innerHTML = '';

    cheats.forEach((cheat, index) => {
      const divField = document.createElement('div');
      divField.classList.add('field');

      const deleteButton = document.createElement('button');
      deleteButton.classList.add('delete');
      deleteButton.classList.add('is-large');
      deleteButton.addEventListener('click', function() { removeCheat(index); });
      
      const buttonDiv = document.createElement('div');
      buttonDiv.classList.add('control');

      const convertButton = document.createElement('button');
      convertButton.innerText = 'Convert Code';
      convertButton.classList.add('button');
      convertButton.addEventListener('click', function() { convertCode(cheat, index); });

      const addLineButton = document.createElement('button');
      addLineButton.innerText = 'Add Line to Code';
      addLineButton.classList.add('button');
      addLineButton.addEventListener('click', function() { addLineToCode(index) });

      const divBox = document.createElement('div');
      divBox.classList.add('box');
      divBox.innerText = `Converted Cheat: ${cheat.converted}
        .CHT Lines for copy/paste:
        
        [${cheat.name}]
        ON=${cheat.converted}
      `;

      const articleMessage = document.createElement('article');
      articleMessage.classList.add('message');

      const messageHeader = document.createElement('div');
      messageHeader.classList.add('message-header');
      messageHeader.innerText = cheat.name;

      const messageBody = document.createElement('div');
      messageBody.classList.add('message-body');

      buttonDiv.appendChild(addLineButton);
      buttonDiv.appendChild(convertButton);
      createInputs(cheat.original, index, divField);
      divField.appendChild(buttonDiv);

      messageBody.appendChild(divField);
      messageBody.appendChild(divBox);
      messageHeader.appendChild(deleteButton);
      articleMessage.appendChild(messageHeader);
      articleMessage.appendChild(messageBody);

      codesContainer.appendChild(articleMessage);
    });
  }

  newCodeButton.addEventListener('click', function() {
    const newCodeName = newCodeNameInput.value;
    addCheat(newCodeName || `Code ${cheats.length + 1}`);
    newCodeNameInput.value = '';
  });

  document.getElementById('file-btn').addEventListener('click', generateCHT);
})()