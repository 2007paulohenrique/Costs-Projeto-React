# Costs

Este repositório contém o código do projeto React Costs, um aplicativo web para gerenciamento de projetos e seus serviços, desenvolvido no curso de React do professor Matheus Battisti, além de funções adicionais que não foram exploradas durante do curso. Grande parte do material aqui presente foi criado durante o trabalho no projeto Costs do curso de ReactJS ministrado pelo professor [Matheus Battisti](https://www.youtube.com/@MatheusBattisti), disponível na plataforma YouTube.

## Funcionalidades do Aplicativo

### Ações do Usuário 

1. **Cadastro de Projetos** - Um usuário pode criar projetos que possuam nome, orçamento e categoria.
2. **Exibição dos Projetos** - Um usuário pode consultar todos os projetos que criou e todas as suas informações.
3. **Remoção de Projetos** - Um usuário pode remover permanentemente os projetos que criou, assim como todos os dados relacionados a ele.
4. **Edição de Projetos** - Um usuário pode editar todos os dados dos projetos que criou.
5. **Cadastro de Serviços** - Um usuário pode criar serviços que possuam nome, custo e descrição para um projeto.
6. **Exibição dos serviços** - Um usuário pode acessar os serviços de um projeto que criou.
7. **Remoção de Serviços** - Um usuário pode remover os serviços de um projeto que criou.

### Validações

1. **Nome dos Projetos e Serviços** - Os nomes não poderão conter mais que 50 caracteres. Um projeto não pode ter o mesmo nome que outro já criado pelo usuário. Um serviço não pode ter o mesmo nome que outro pertencente ao mesmo projeto.
2. **Orçamento** - O orçamento de um projeto não admite valores negativos, assim como não admite um valor menor que o valor já gasto do projeto, no caso de uma edição. 
3. **Custo** - O valor do custo de um serviço não pode ser negativo nem maior que o valor disponível do projeto em que será atribuido.
4. **Campos Vazios** - No formulário do projeto, todos os campos deverão ser preenchidos, já no formulário de serviço, somente os campos de nome e custo deverão ser preenchidos.

### Avisos do Sistema

1. **Criação de Projetos e Serviços** - Um aviso será exibido na página quando um projeto ou serviço for criado com sucesso, assim como quando um projeto for editado.
2. **Remoçao de Projetos e serviços** - Um aviso será exibido na página quando um projeto ou serviço for removido com sucesso.
3. **Falha nas Validações** - Uma mensagem de erro será exibida ao usuário quando alguma validação nos formulários falhar, comunicando o motivo da falha e cancelando a criação de um novo projeto ou serviço.
4. **Orçamento e custo** - Quando o valor do custo de um serviço ou orçamento de um projeto for muito alto ou muito baixo uma mensagem de confirmação será exibida ao usuário.
5. **Tamanho da Descrição** - Uma mensagem de confirmação com um alerta será mostrado ao usuário quando a descrição de um serviço for muito longa.
6. **Remoção de Projetos e Serviços** - Uma mensagem de alerta será mostrada ao usuário antes da exclusão de um projeto ou serviço.

### Formatação automática 

1. **Nomes e Descrição** - Os valores inseridos nos campos de texto serão formatados para que não tenham espaços duplicados ou em seu início e fim, além de capitalizar a primeira letra dos seus textos.
2. **Orçamento e Custo** - Os valores numéricos serão formatados para terem duas casas decimais.  

## Principais Métodos, Funções e Hooks.

- **useState** - Permite adicionar e gerenciar o estado dentro de um componente funcional.
- **useEffect** - Lida com efeitos colaterais, como chamadas de APIs, manipulação de DOM, ou subscrições, executando funções após a renderização do componente.
- **fetch** - Função nativa do JavaScript que permite fazer requisições HTTP assíncronas para servidores e manipular os dados recebidos.
- **then** - Usado para executar uma função quando uma promisse é cumprida, nesse caso, a promisse retornada pelo método fetch.
- **catch** - Usado para capturar e tratar erros que ocorrem durante a execução de uma promisse, nesse caso, a promisse retornada pelo fetch.

## Tecnologias Utilizadas

- **HTML, CSS e JavaScript**: Tecnologias fundamentais para a criação de páginas web.
- **React, React Router e UUID**: Bibliotecas específicas do ecossistema React que adicionam funcionalidades e facilidades ao desenvolvimento de aplicações React.
- **JSON-Server** - Ferramenta que permite criar uma API REST falsa a partir de um arquivo JSON. Ele simula um servidor backend, permitindo operações CRUD.
- **UUID** - Identificador único universal que pode ser gerado para identificar de forma exclusiva objetos em sistemas distribuídos.
- **Node.js**: Ambiente de execução JavaScript do lado do servidor, permitindo a execução de código JavaScript fora do navegador.
- **npm (Node Package Manager)**: Gerenciador de pacotes padrão para Node.js, utilizado para instalar, gerenciar e manter bibliotecas e ferramentas JavaScript.

## Instalação

1. Clone o repositório do projeto executando o comando `git clone https://github.com/2007paulohenrique/ReactJS-Estudo.git` em seu terminal.
2. Navegue até o diretório do projeto executando `cd caminho_para_o_diretorio` no terminal.
3. Instale o [Node.js](https://nodejs.org/) caso ainda não o tenha instalado, dessa forma. O npm será instalado automaticamente junto com o Node.js.
4. Confirme a instalação do Node.js e do npm executando `node -v` e `npm -v`. Caso apareça suas versões, a instalação foi concluida com sucesso. 
5. Instale as dependências do projeto com o comando `npm install`.
6. Instale o React Router, JSON-Server e UUID com `npm install react-router-dom json-server uuid` no terminal.
7. Inicie o servidor com `npm run backend` no terminal.
8. Inicie o projeto com `npm start` e o acesse em um navegador web na URL `http://localhost:3000`. 

## Estrutura do repositório

### Raiz do projeto:
    
- **/node_modules** - Contém todas as dependências do projeto necessárias para utilizar o React e outras bibliotecas e pacotes.
- **/public** - Diretório contendo os arquivos estáticos da aplicação, incluindo o arquivo HTML principal.
- **/src** - Diretório onde estão localizados os componentes React, incluindo o componente App e os arquivos de estilo CSS.
- `db.json` - Banco de dados do projeto, podendo ser visto na porta 5000 do localhost.
- `.gitignore` - Arquivo que especifica quais diretórios e arquivos devem ser ignorados pelo sistema de controle de versão Git.
- `package.json` e `package-lock.json` - Arquivos que listam os scripts e as dependências do projeto, garantindo a instalação consistente dessas dependências através do npm.
- `README.md` - Arquivo que contém a descrição do projeto e instruções de uso.

### /public:

- `index.html` - Documento HTML principal, que fornece a estrutura inicial e os contêineres onde o React irá injetar e renderizar os componentes dinâmicos. 
- `manifest.json` - Arquivo de configuração que fornece ao navegador informações sobre a aplicação web.

### /src:

- **/components** - Componentes reutilizáveis da aplicação, incluindo os componentes das páginas e formulários.
- **/img** - Imagens que foram utilizadas na aplicação.
- `App.js` - Componente principal da aplicação React, atuando como o ponto de entrada para os componentes da interface do usuário e contendo as rotas e os componentes padrões de layout. 
- `index.js` - Arquivo principal que inicializa a aplicação React, fazendo a montagem do componente App na DOM, em uma div com o id root, presente no index.html.
- `index.css` - Folha de estilos global para a aplicação.

## Contato

Caso tenha dúvidas, entre em contato:

- Nome: Paulo Henrique Barbosa do Prado Pereira
- E-mail: pereirapaulo436@gmail.com
- LinkedIn: [Paulo Barbosa](https://www.linkedin.com/in/paulo-barbosa-61a860303/)
- GitHub: [2007paulohenrique](https://github.com/2007paulohenrique)