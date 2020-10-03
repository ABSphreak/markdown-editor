import React, { useEffect, useState } from 'react';
import Markdown from 'markdown-to-jsx';
import AceEditor from 'react-ace';
import styled from 'styled-components';
import 'ace-builds/src-noconflict/mode-markdown';
import 'ace-builds/src-noconflict/theme-dracula';
import './App.css';
const { ipcRenderer } = window.require('electron');

const Split = styled.div`
  display: flex;
  height: 100vh;
`;

const RenderedWindow = styled.div`
  background-color: #191324;
  width: 35%;
  padding: 20px;
  color: #fff;
  border-left: 1px solid #302b3a;
  width: 100%;
`;

function App() {
  const [loadedFile, setLoadedFile] = useState('');

  useEffect(() => {
    ipcRenderer.on('new-file', (event, fileContent) => {
      setLoadedFile(fileContent);
    });
  }, []);

  return (
    <div className="App">
      <Split>
        <AceEditor
          mode="markdown"
          theme="dracula"
          onChange={(newContent) => {
            setLoadedFile(newContent);
          }}
          name="markdown_editor"
          value={loadedFile}
        />
        <RenderedWindow>
          <Markdown>{loadedFile}</Markdown>
        </RenderedWindow>
      </Split>
    </div>
  );
}

export default App;
