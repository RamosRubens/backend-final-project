# Projeto final - Staart 

Projeto Final da jornada de back-end da plataforma Staart. O projeto desenvolvido é uma API em que temos rotas para listagem de jornadas, cursos e aulas. As requisições serão feitas em rotas distintas e, para cada recurso (jornada, cursos e aulas) teremos uma rota específica.

## Instalação

**Requisitos obrigatórios:** Deve ter **NODE** e **NPM** instalados.

Após o download da aplicação deve ser realizado o comando:

```bash
cd backend-final-project
npm install
```

## Banco de Dados

Para configurar o banco de dados, será necessário criar as tabelas descritas a seguir. 

### **Configurando o MySQL e conectando à aplicação**

Partindo do principio de já ter o **MySQL** instalado.

Antes de criarmos tabelas e popularmos com dados, é necessário criar um novo banco de dados.

Com isso, basta criar um novo banco com o nome que você preferir. Vamos considerar o nome `staart_db` nesse exemplo.

Agora deve ser criado um arquivo **".env"** na raiz do diretório do seu projeto. Após criar o arquivo adicionar as seguintes variavéis:

```bash
PORT='3333' -> Porta de sua preferência a ser utilizada pela sua aplicação
DB_URL='mysql://"String de conexão para o seu banco"'
```

### **Executando Migrations e Seeds**

Agora que você definiu corretamente o banco de dados com a sua aplicação e está com ele sendo executado na sua máquina, iremos criar as tabelas do banco e, em seguida, iremos popular as tabelas com dados.

O processo de criação de tabelas aqui ocorre por meio de um processo chamado **migrations**. Isso nada mais é que um meio de versionar o banco de dados e manter um histórico de alterações para cada mudança de tabelas, criação de tabelas, etc.

Para executar as **migrations** e criar todas as tabelas que serão usadas, basta executar o seguinte comando a partir do projeto dentro do VS Code:

```bash
npm run migration:run
```

Se o comando for executado com sucesso, uma mensagem de sucesso aparecerá no terminal

Outra forma de garantir que deu certo é olhando o banco de dados a partir do cliente MySQL para conferir se existem tabelas criadas.

As seguintes tabelas deverão existir:

- `courses` (ex: select * from courses)
- `journeys`
- `journeys_courses`
- `lessons`
- `knex_migrations`
- `knex_migrations_lock`

Com as tabelas criadas, iremos agora para o processo chamado **seeds** que nada mais é do que “semear”, que nesse contexto significa “semear os dados” no banco, ou seja, popular as tabelas criadas anteriormente com os dados que serão utilizados.

Para isso, basta executar o comando:

```bash
npm run seed:run
```

Se o comando for executado com sucesso, uma mensagem de sucesso aparecerá no terminal

Outra forma de garantir que deu certo é olhando o banco de dados a partir do cliente MySQL para conferir se as tabelas agora possuem dados.

Após isso, mate seu terminal e abra novamente antes de executar outros comandos.

## Para iniciar o servidor

Para iniciar o servidor deve ser executado o seguinte comando:

```bash
npm run dev
```

## Endpoints 

- **`/journeys`**
    
    Essa será a rota de listagem de jornadas disponíveis.
    
       
- **`/courses/:journeyId`**
    
    O objetivo da rota de cursos é retornar uma listagem de todos os cursos disponíveis em uma jornada específica.
    
- **`/course/:courseId/lessons`**
    
    A rota será responsável pela exibição das informações de aulas para um curso específico.

- **Rota dinâmica v1**
    
    **`/resource?resourceName=param&identifier=param`**
    
    Rota que recebe query params e pode retornar qualquer um dos três recursos baseado no parâmetro que for enviado na requisição.
    
    Por exemplo: 
    
    - Se a rota recebe um query param chamado `resourceName` com valor `journeys`, então deve ser retornada uma listagem de jornadas semelhante ao que temos no endpoint de journey.

    - Se a rota recebe um query param chamado `resourceName` com valor `courses`, obrigatoriamente ela precisa receber também um outro query param chamado `identifier` com o valor sendo o identificador de uma jornada.
    O retorno dessa requisição será uma listagem de cursos que possuam o `journeyId` igual ao identificador recebido pela rota através da requisição. O retorno é semelhante ao que temos no endpoint de course.
    - Se a rota recebe um query param chamado `resourceName` com valor `lessons`, obrigatoriamente ela precisa receber também um outro query param chamado `identifier` com o valor sendo o identificador de um curso.
    O retorno dessa requisição será uma listagem de aulas que pertençam a um curso cujo identificador seja igual ao `identifier` recebido através da requisição. O retorno é semelhante ao que temos no endpoint de course/lessons
    
        
- **Rota dinâmica v2**


Rota do tipo **POST** que lista jornadas ou cursos ou lições ou toda a estrutura aninhada. 

Essa rota recebe via `body`, um parâmetro chamado `listType` que pode ser uma opção dentre as quatro disponíveis:

```jsx
{
	“listType”: ""
}

// valores possíveis "journeys", "courses", "lessons", "all"
```

- Se o valor for `"journeys"`, então a rota deve retornar uma listagem das jornadas disponíveis;
- Se o valor for `"courses"`, então a rota deve retornar uma listagem dos cursos disponíveis dentre todas as jornadas;
- Se o valor for `"lessons"`, então a rota deve retornar uma listagem das aulas disponíveis dentre todos os cursos;
- Por último, se o valor for `"all"`, então a rota deve retornar uma estrutura aninhada de todos os dados salvos no banco
