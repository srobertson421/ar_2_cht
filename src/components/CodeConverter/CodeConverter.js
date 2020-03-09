import React, { useState } from 'react';
import {
  Grid,
  FormPanel,
  FormGroup,
  Input,
  Button,
  Paragraph,
  Title,
  Card,
  Label,
} from 'beautiful-react-ui';
import convertLinesToCHT from '../../utils/convertLinesToCHT';
import downloadCHT from '../../utils/downloadCHT';

const newCheat = {
  name: 'New Cheat',
  lines: [],
  value: ''
}

const newLine = {
  name: 'Line',
  value: '',
}

const CodeConverter = ({ exportCallback, download = false }) => {
  const [ cheats, setCheats ] = useState([]);
  const [ newCheatName, setNewCheatName ] = useState('');
  const [ gameName, setGameName ] = useState('');

  const addCheat = () => {
    const tmpCheat = { ...newCheat }
    if(newCheatName) {
      tmpCheat.name = newCheatName;
    } else {
      tmpCheat.name = `New Cheat - ${cheats.length + 1}`
    }
    tmpCheat.lines = [ { ...newLine } ];
    const tmpCheats = [ tmpCheat, ...cheats ];
    setCheats(tmpCheats);
    setNewCheatName('');
  }

  const removeCheat = cheatIndex => {
    setCheats([
      ...cheats.slice(0, cheatIndex),
      ...cheats.slice(cheatIndex + 1),
    ]);
  }

  const addLine = cheatIndex => {
    const tmpLine = { ...newLine };
    const tmpLines = [ ...cheats[cheatIndex].lines, tmpLine ];
    const tmpCheat = { ...cheats[cheatIndex], lines: tmpLines };
    setCheats([
      ...cheats.slice(0, cheatIndex),
      tmpCheat,
      ...cheats.slice(cheatIndex + 1),
    ]);
  }

  const removeLine = (lineIndex, cheatIndex) => {
    const tmpLines = [
      ...cheats[cheatIndex].lines.slice(0, lineIndex),
      ...cheats[cheatIndex].lines.slice(lineIndex + 1),
    ];
    const tmpCheat = { ...cheats[cheatIndex], lines: tmpLines };
    setCheats([
      ...cheats.slice(0, cheatIndex),
      tmpCheat,
      ...cheats.slice(cheatIndex + 1),
    ]);
  }

  const handleLineChange = (value, lineIndex, cheatIndex) => {
    const tmpCheat = { ...cheats[cheatIndex] };
    const tmpLine = { ...cheats[cheatIndex].lines[lineIndex] };
    tmpLine.value = value;
    tmpCheat.lines = [
      ...cheats[cheatIndex].lines.slice(0, lineIndex),
      tmpLine,
      ...cheats[cheatIndex].lines.slice(lineIndex + 1),
    ];
    tmpCheat.value = convertLinesToCHT(tmpCheat.lines);
    setCheats([
      ...cheats.slice(0, cheatIndex),
      tmpCheat,
      ...cheats.slice(cheatIndex + 1),
    ]);
  }

  const handleCHTDownload = () => {
    if(download) {
      downloadCHT({
        name: gameName || 'Some Game',
        cheats
      });
    }
  }

  return (
    <Grid>
      { download && cheats.length > 0 && (
        <Grid.Column size="12">
          <Input
            type="text"
            fluid
            value={gameName}
            onChange={e => setGameName(e.target.value)}
            placeholder="Enter a name for the game the cheats are for, e.g. Fire Emblem"
          />
          <Button color="info" onClick={handleCHTDownload} icon="save">Download .cht File</Button>
        </Grid.Column>
      ) }
      <Grid.Column size="10" offset="1">
        <Input
          fluid
          type="text"
          value={newCheatName}
          onChange={e => setNewCheatName(e.target.value)}
          placeholder="Enter Cheat Name e.g. Inf HP"
        />
        <Button onClick={addCheat} color="success" icon="plus">Add Cheat</Button>
      </Grid.Column>
      { cheats.map((cheat, cheatIndex) => (
        <Grid.Column key={`cheat-${cheatIndex}`} size="12">
          <Card
            fluid
            actionButton
            onActionButtonClick={() => removeCheat(cheatIndex)}
            actionButtonIcon="times"
          >
            <Card.Title>{ cheat.name }</Card.Title>
            <Card.Content>
              <Button onClick={() => addLine(cheatIndex)} color="primary" icon="plus">Add Line To Cheat</Button>
              <FormPanel>
                { cheat.lines.map((line, lineIndex) => (
                  <FormGroup key={`cheat-${cheatIndex}-line-${lineIndex}`}>
                    <Label>{ `${line.name} ${lineIndex + 1}` } <Button onClick={() => removeLine(lineIndex, cheatIndex)} icon="times" color="danger">Delete Line</Button></Label>
                    <Input
                      fluid
                      type="text"
                      value={line.value}
                      onChange={e => handleLineChange(e.target.value, lineIndex, cheatIndex)}
                      placeholder="Enter Action Replay Raw code, e.g. 0022C297 00000063"
                    />
                  </FormGroup>
                )) }
              </FormPanel>
            </Card.Content>
            <Card.Footer>
              [{cheat.name}]
              <br/>
              ON={cheat.value}
            </Card.Footer>
          </Card>
        </Grid.Column>
      )) }
      { cheats.length > 0 && exportCallback && (
        <Grid.Column size="12">
          <Button color="info" onClick={() => exportCallback(cheats)}>Confirm Cheats and Export to Game</Button>
        </Grid.Column>
      ) }
    </Grid>
  );
}

export default CodeConverter;