# Template Base Front-end em React 18 + Vite

Este é um template base para um projeto frontend React com Vite.

## Começando

Estas instruções permitirão que você tenha uma cópia do projeto em execução em sua máquina local para fins de desenvolvimento e teste.

### Pré-requisitos

* Node.js
* npm

### Instalação

1. Crie o projeto usando o Vite
   ```sh
   npm create vite@latest nome-do-projeto -- --template template-react-vite-cagece
   ```
2. Navegue até o diretório do projeto
   ```sh
   cd nome-do-projeto
   ```
3. Selecione ou caso não tenha a versão necessária, instale a versão do node (Na primeira linha do arquivo Dockerfile encontra-se a versão do node necessária)
   ```sh
   nvm use {versão node}
   ```
    ou

   ```sh
   nvm install {versão node}
   ```
4. Sete o repositório de dependência da Cagece
   ```sh
   npm config set registry https://srvverdaccio.int.cagece.com.br/
   ```
5. Instale os pacotes NPM
   ```sh
   npm i
   ```

### Executando a aplicação

Para executar a aplicação em modo de desenvolvimento, use o seguinte comando:

```sh
npm run dev
```

Isso iniciará o servidor de desenvolvimento em http://localhost:5173.

## Variáveis de Ambiente

Este projeto usa variáveis de ambiente para configurar a aplicação. Você precisará criar um arquivo `.env.development` na raiz do projeto e adicionar as seguintes variáveis:

```
VITE_URL_BASENAME=/nomesistema-fe
VITE_NOME_EXIBICAO_SISTEMA=Nome do Sistema
```

## Scripts Disponíveis

No diretório do projeto, você pode executar:

### `npm run dev`

Executa o aplicativo no modo de desenvolvimento.
Abra [http://localhost:5173](http://localhost:5173) para visualizá-lo no navegador.

### `npm run build`

Compila o aplicativo para produção na pasta `dist`.
Ele agrupa corretamente o React no modo de produção e otimiza a compilação para o melhor desempenho.

### `npm run lint`

Verifica os arquivos do projeto.

### `npm run preview`

Visualiza a compilação de produção.

## Tecnologias e Frameworks utilizados

* [React](https://reactjs.org/)
* [Vite](https://vitejs.dev/)
* [TypeScript](https://www.typescriptlang.org/)
* [Tailwind CSS](https://tailwindcss.com/)
* [PrimeReact](https://primereact.org/)
* [PrimeIcons](https://primereact.org/icons/)
* [Zustand](https://zustand-demo.pmnd.rs/)
