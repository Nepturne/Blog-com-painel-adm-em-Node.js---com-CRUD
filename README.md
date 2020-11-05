# Nepturne-Blog-com-painel-administrativo-em-Node.js---com-CRUD
Um blog feito em Node.js com express - Com Login e Cadastro ,painel administrativo , editor de textos ,cadastro de categorias e artigos para o blog.


<img src="https://raw.githubusercontent.com/Nepturne/images_projects/main/blog.png" />
----------------------------------------------------------------------------------------------------------------------------------
<img src="https://raw.githubusercontent.com/Nepturne/images_projects/main/blog2.png" />
----------------------------------------------------------------------------------------------------------------------------------

Libs: bcryptjs ,body-parser,ejs,express,express-session,mysql2,sequelize,slugify.

----------------------------------------------------------------------------------------------------------------------------------
-> Para iniciar o projeto:

1º) Baixe o projeto, acesse a raiz pelo terminal ou cmd e execute o comando: npm install [ ENTER ] ~ Espere as dependencies serem baixadas.

2º) Crie um banco de dados no MySQL Workbench ou com a linha de comando conforme sua preferência porém com o nome: guiapress [ Nome do Banco de Dados ].

3º) Vá até a pasta do projeto no arquivo: database/database.js e altere a line 3 com as suas credenciais de usuário e senha do banco mysql, assim:
const connection = new Sequelize("guiapress", "//usuáriodobancomysql", "//senhadobancomysql", {
Exemplo: const connection = new Sequelize("guiapress", "root", "123456", {
Salve e prossiga.

4º) Dentro do projeto baixado vá até articles/Article.js e descomente a line 24, isto ira criar a tabela de acordo com o Model Article no banco de dados guiapress
//Article.sync({ force: true }); para => Article.sync({ force: true });

5º) Dentro do projeto baixado vá até categories/Category.js e descomente a line 15, isto ira criar a tabela de acordo com o Model Category no banco de dados guiapress
//Category.sync({ force: true }); para => Category.sync({ force: true });

6º) Entre no diretório do projeto baixado pelo cmd ou terminal com o comando cd(change directory), e execute 1 UMA ÚNICA VEZ: 
nodemon index.js [ ENTER ]  | espere conectar ao banco e criar as tabelas | Aperte Control+C (s)  para parar o servidor.

7º) Volte até articles/Article.js e categories/Category.js e comente as lines:
//Article.sync({ force: true });
e
//Category.sync({ force: true });
Para que não crie tabelas a cada reexecução do servidor com o nodemon.

-----------------------------------------------------------------------------------------------------------------------------------

Pronto, seu projeto está configurado.
Em seu navegador acesse o app na URL: http:localhost:4000/ para testar. :D
