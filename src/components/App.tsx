import React, { useState } from 'react';
import { EntityHighlighter } from './EntityHighlighter';
import { IEntity } from '~/interfaces/entity';
import { IStyleSheet } from '~/interfaces/style-sheet';

const App = () => {
  const [text, setText] = useState(
    'Venture first mover advantage learning curve market ecosystem funding stealth disruptive social proof scrum project growth hacking niche market user experience graphical user interface.'
  );
  const [entities, setEntities] = useState<IEntity[]>([
    { selectionStart: 160, selectionEnd: 184, label: 'very important' },
    { selectionStart: 144, selectionEnd: 159, label: 'very important' },
    { selectionStart: 62, selectionEnd: 69, label: 'important' },
    { selectionStart: 116, selectionEnd: 130, label: 'nonsense' },
    { selectionStart: 8, selectionEnd: 29, label: 'nonsense' },
  ]);

  return (
    <div style={styles.app}>
      <EntityHighlighter
        text={text}
        entities={entities}
        onTextChange={setText}
        onEntitiesChange={setEntities}
      />
    </div>
  );
};

const styles: IStyleSheet = {
  app: {
    textAlign: 'center',
    padding: '2em',
    width: '60%',
    margin: '0 auto',
    color: 'black',
    maxWidth: '750px',
    minWidth: '250px',
  },
  logo: {
    height: '5vmin',
  },
};

export default App;
