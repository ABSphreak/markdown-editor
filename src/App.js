import React, { useEffect, useState } from 'react';
import Markdown from 'markdown-to-jsx';
import AceEditor from 'react-ace';
import styled from 'styled-components';
import 'ace-builds/src-noconflict/mode-markdown';
import 'ace-builds/src-noconflict/theme-monokai';
import './App.css';
const { ipcRenderer } = window.require('electron');

const Split = styled.div`
  display: flex;
  height: 100vh;
`;

const EditorWindow = styled.div`
  height: 100vh;
`;

const RenderedWindow = styled.div`
  background-color: #001427;
  width: 35%;
  padding: 20px;
  color: #fff;
  border-left: 1px solid #ff7f51;
  width: 100%;
  overflow: auto;
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: #ff0054;
  }
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
        <EditorWindow>
          <AceEditor
            fontSize={18}
            width="50vw"
            height="100vh"
            mode="markdown"
            theme="monokai"
            onChange={(newContent) => {
              setLoadedFile(newContent);
            }}
            name="markdown_editor"
            value={loadedFile}
          />
        </EditorWindow>
        <RenderedWindow>
          <Markdown>{loadedFile}</Markdown>
        </RenderedWindow>
      </Split>
    </div>
  );
}

export default App;
