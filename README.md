# Nepturne-Blog-com-painel-administrativo-em-Node.js---com-CRUD
Um blog feito em Node.js com express - Com painel administrativo , editor de textos , login, cadastro,categorias e artigos de blog.
<img src="https://raw.githubusercontent.com/Nepturne/images_projects/main/blog.png" />
-----------------------------------------------------------------------------------------------------------------------------------
<img src="https://raw.githubusercontent.com/Nepturne/images_projects/main/blog2.png" />
-----------------------------------------------------------------------------------------------------------------------------------

Libs: bcryptjs ,body-parser,ejs,express,express-session,mysql2,sequelize,slugify.

-> Para iniciar o projeto:

1º) Efetue o clone para sua machine. Ao acessar a raiz do projeto dentro de Nepturne-Blog-com-painel-administrativo-em-Node.js---com-CRUD-main pelo terminal execute o comando: npm install.

2º) Crie um banco de dados no MySQL Workbench ou com a linha de comando conforme sua preferência porém com o nome: guiapress [ Nome do Banco de Dados ]

3º) Após o banco de dados estar criado entre no diretório do projeto baixado pelo cmd ou terminal com o comando cd(change directory), e execute : nodemon index.js.  Control+C (s) [ ENTER ] para parar o servidor.

4º) Dentro do projeto baixado vá até articles/Article.js e descomente a line 24, isto ira criar a tabela de acordo com o Model Article no banco de dados guiapress
//Article.sync({ force: true }); para => Article.sync({ force: true });

5º) Dentro do projeto baixado vá até categories/Category.js e descomente a line 15, isto ira criar a tabela de acordo com o Model Category no banco de dados guiapress
//Category.sync({ force: true }); para => Category.sync({ force: true });

Pronto, seu projeto está configurado.
Em seu navegador predileto acesse o app na URL: http:localhost:4000/ para testar. :D
