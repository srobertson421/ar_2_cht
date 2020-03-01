(function main() {
  const cheats = [];
  const codesContainer = document.getElementById('codes');
  const newCodeNameInput = document.getElementById('new-code-name');
  const newCodeButton = document.getElementById('add-code');
  const frontPatterns = ['001', '002', '003', '004'];

  function addCheat(name) {
    cheats.push({
      name: name,
      original: '',
      converted: ''
    });

    renderCheats();
  }

  function removeCheat(cheatIndex) {
    cheats.splice(cheatIndex, 1);

    renderCheats();
  }

  function onCodeChange(newValue, cheatIndex) {
    cheats[cheatIndex].original = newValue;
  }

  function convertCode(cheat, index) {
    if(frontPatterns.some(p => cheat.original.substring(0, 3) === p)) {
      const splitCode = cheat.original.split(' ');
      const part1 = splitCode[0].substring(3);
      const part2 = splitCode[1].replace(/^0+/, '').match(/.{1,2}/g).reverse().join(',');
      cheats[index].converted = `${part1},${part2}`;

      renderCheats();
    } else {
      console.log('Cheat is invalid');
      alert('Looks like the code you entered is invalid!\nMake sure to check the rules on how codes should start');
    }
  }

  function renderCheats() {
    codesContainer.innerHTML = '';

    cheats.forEach((cheat, index) => {
      const divField = document.createElement('div');
      divField.classList.add('field');
      divField.classList.add('has-addons');
      const deleteButton = document.createElement('button');
      deleteButton.classList.add('delete');
      deleteButton.classList.add('is-large');
      deleteButton.addEventListener('click', function() { removeCheat(index); });
      const inputLabel = document.createElement('label');
      inputLabel.classList.add('label');
      const inputDiv = document.createElement('div');
      inputDiv.classList.add('control');
      inputDiv.classList.add('is-expanded');
      const cheatInput = document.createElement('input');
      cheatInput.classList.add('input');
      cheatInput.value = cheat.original;
      cheatInput.addEventListener('input', function(e) { onCodeChange(e.target.value, index) });
      const buttonDiv = document.createElement('div');
      buttonDiv.classList.add('control');
      const convertButton = document.createElement('button');
      convertButton.innerText = 'Convert Code';
      convertButton.classList.add('button');
      convertButton.addEventListener('click', function() { convertCode(cheat, index); });

      const divBox = document.createElement('div');
      divBox.classList.add('box');
      divBox.innerText = `
        Converted Cheat: ${cheat.converted}
        .CHT Line for copy/paste: ON=${cheat.converted}
      `;

      const articleMessage = document.createElement('article');
      articleMessage.classList.add('message');
      const messageHeader = document.createElement('div');
      messageHeader.classList.add('message-header');
      messageHeader.innerText = cheat.name;
      const messageBody = document.createElement('div');
      messageBody.classList.add('message-body');

      inputDiv.appendChild(cheatInput);
      buttonDiv.appendChild(convertButton);
      divField.appendChild(inputLabel);
      divField.appendChild(inputDiv);
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
})()