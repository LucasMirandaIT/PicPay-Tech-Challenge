import "./App.css";

function App() {
  const title = "Desafio Picpay Front-end"
  return (
    <div style={{ padding: "1%" }}>
      <h1>{title}</h1>
      <p>Seja muito bem vindos ao nosso teste.</p>
      <p style={{ marginBottom: "1.5em" }}>
        Antes de iniciar, leia o Readme com atenção e certifique-se que você
        tenha acesso ao layout proposto no Figma.
      </p>
      <ul>
        <li style={{ marginBottom: "1em" }}>
          <span>
            Não esqueça de subir a API, para maiores informações leia o readme.
          </span>
        </li>
        <li style={{ marginBottom: "1em" }}>
          <span>
            No Figma existem algumas orientações de layout e components e no
            Readme existem algumas dicas legais para você utilizar no teste.
          </span>
        </li>
        <li style={{ marginBottom: "1em" }}>
          <span>
            Qualquer dúvida, pergunte para os Recruiters, eles irão te auxiliar
            caso tenha algum problema.
          </span>
        </li>
        <li>
          <span>Boa sorte sorte e dê o seu máximo :)</span>
        </li>
      </ul>
    </div>
  );
}

export default App;
