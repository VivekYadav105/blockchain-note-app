import { EthProvider } from "./contexts/EthContext";
import NoteSection from "./components/NoteSection";
import Header from "./components/header";
import { Container } from "@mui/material";

function App() {
  return (
    <EthProvider>
      <Container maxWidth={'lg'}>
        <div id="App" style={{paddingTop:100}}>
          <Header/>
          <NoteSection/>
        </div>
      </Container>
    </EthProvider>
  );
}

export default App;
