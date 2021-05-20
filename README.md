# Descrição Desafio Final - Movinstagram

==============
[![Build Status](https://travis-ci.org/FabianaTavares/movieinstagram-front.svg?branch=main)](https://travis-ci.org/FabianaTavares/movieinstagram-front)

Bootcamp FrontEnd - IGTI 2020
O Desafio final poderia ser feito em qualquer dos três Frameworks: Angular, React ou Vue. Optei por começar com Angular, mas pretendo fazer com as outras duas também.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.0.

## Observação

Apesar de o curso fornecer o codigo fonte original aos alunos, procurei deixar o meu codigo, exibindo assim erros e acertos, coisas a melhorar, acho que transparência é um ponto importantíssimo para o profissional.

## Ambiente de Desenvolvimento

### Frontend & Backend

1. npm install para instalar as dependencias do projeto.
2. o Backend está no [repositório!](https://github.com/FabianaTavares/desafio-final-movinstagram-angular)

## Ambiente de Produção

Para visualizar o projeto rodando, basta acessar o [link do desafio!](https://fabi-igti-movinstagram-angular.web.app/)
OBS: Ainda estou estudando como o firebase pode ler o json backend, é um desafio novo.

## Docker Hub

Imagem ainda não disponível no docker hub.

## Objetivos do Desafio Movinstagram

Exercitar os seguintes conceitos trabalhados nos Módulos 01 a 04:

- Implementação de algoritmos com JavaScript.
- Criação de um app Front End que consuma um Back End.

## Enunciado

Criar uma aplicação web front end que simula uma espécie de "Instagram de filmes" cujos
usuários são "super-heróis". A aplicação deve conter as seguintes funcionalidades:

- O app deve ser feito com Angular, React ou Vue.
- O app deve consumir um back end fornecido pelo professor.
- O app deve conter um resumo com a quantidade de posts, curtidas e comentários.
- O app deve possibilitar a troca do usuário que vai visualizar a timeline. Isso vai
  determinar o usuário ativo. A timeline será sempre a do Superman, que deve ser o
  usuário ativo inicial.
- Implementação opcional (não será cobrada no questionário): O app deve permitir
  curtir/descurtir posts. A curtida/descurtida deverá refletir o usuário ativo.
- Implementação opcional (não será cobrada no questionário): O app deve permitir
  comentar posts com o usuário ativo.

- Exemplo de implementação do frontend:

![alt text](https://github.com/FabianaTavares/desafio-final-movinstagram-angular/blob/main/frontend/movie-intagram/src/assets/img/exemplo_implementacao_readme.PNG)

- Lembre-se de que as regras de interface ficam a critério do aluno, ou seja, **não será exigida a mesma interface da imagem acima.**
- O mais importante é a apresentação correta dos dados que estão vinculados entre
  si, ou seja, os comentários e curtidas corretamente vinculados a determinado post,
  por exemplo.
- As imagens das fotos (filmes) estão contidas no back end através de links.
- As imagens dos usuários (super-heróis) serão fornecidas pelo professor.
- Além disso, **todos os prints de tela desta documentação referem-se a dados gerados aleatoriamente que não serão necessariamente os mesmos que o aluno terá acesso para desenvolver sua aplicação.**

## Atividades

Os alunos deverão desempenhar as seguintes atividades:

## **Etapa 1 – Configuração do ambiente**

1. **Pré-requisitos –** O aluno já deve ter instalado o **Node.js** (recomenda-se a versão 14.x) e o **Yarn** (recomenda-se a versão 1.22.4 ou superior, desde que se mantenha a versão 1.x) em seu computador.
2. Instalar o **back end** da aplicação, que **será fornecido pelo professor**, conforme imagem abaixo:

![alt text](https://github.com/FabianaTavares/desafio-final-movinstagram-angular/blob/main/frontend/movie-intagram/src/assets/img/conteudo_backend.PNG)

- Arquivo **allPosts.json** – contém todos os dados necessários, que se subdividem em **posts, comments, likes e bestFriends. Observação importante:** Há uma ligação interna entre **posts, comments e likes,** que o aluno deve interpretar para implementar a aplicação front end. Estude os dados do back end e entenda esta ligação!
- Arquivo **package.json** – contém as dependências da aplicação (json-server) e o script de inicialização do backend.

3. Acesse a pasta raiz do back end e execute o comando **yarn** para instalar as dependências localmente. Em seguida, inicialize o back end com o comando **yarn start**. Isso vai gerar 4 URL's que deverão ser acessadas pelo front end, conforme imagem abaixo:

![alt text](https://github.com/FabianaTavares/desafio-final-movinstagram-angular/blob/main/frontend/movie-intagram/src/assets/img/inicializacao_backend.PNG)

4. Após inicializar o back end, teste o acesso aos seguintes links e estude os dados.

## **Etapa 2 – Implementação do Front End**

1. Defina a ferramenta de sua preferência (Angular, React ou Vue). De qualquer forma, é extremamente interessante e importante que você faça a implementação nas três ferramentas, como uma forma de estudo. Faça isso após o preenchimento do questionário do Desafio Final, se for o caso.
2. Crie o ambiente inicial com a ferramenta escolhida, conforme orientação das videoaulas dos módulos anteriores.
3. Faça a implementação do Front End. Deixo algumas dicas que valem tanto para Angular, React ou Vue.
   a. Na abertura da aplicação, consuma todo o back end e faça as transformações necessárias para vincular comments e likes aos posts. Enquanto isso ocorre, exiba algum feedback visual para o usuário.
   b. Componentize sua aplicação para facilitar a manutenção.
   c. Utilize a função v4 da biblioteca [uuid](https://github.com/uuidjs/uuid) para criar os id's dos comentários.
   d. Identifique visualmente o usuário ativo.

   ![alt text](https://github.com/FabianaTavares/desafio-final-movinstagram-angular/blob/main/frontend/movie-intagram/src/assets/img/usuario_ativo.PNG)

   e. Exiba quem curtiu determinado post através da prop title, presente na grande maioria das tags HTML. Essa prop é exibida quando passamos o mouse sobre o componente.

   ![alt text](https://github.com/FabianaTavares/desafio-final-movinstagram-angular/blob/main/frontend/movie-intagram/src/assets/img/proptitle_item_e.PNG)

   f. Certifique-se de que o comentário inserido seja feito pelo usuário ativo.

   ![alt text](https://github.com/FabianaTavares/desafio-final-movinstagram-angular/blob/main/frontend/movie-intagram/src/assets/img/item_f.PNG)

   g. Persista bem as regras de curtidas, ou seja, o mesmo usuário não pode curtir um post mais de uma vez. Faça o toggle, que curte/descurte o post conforme o seu estado atual (curtido fica descurtido e vice-versa). Estude como as curtidas (likes) estão dispostas no back end.

   ![alt text](https://github.com/FabianaTavares/desafio-final-movinstagram-angular/blob/main/frontend/movie-intagram/src/assets/img/item_g.PNG)

   h. Lembre-se mais uma vez de que os dados que serão fornecidos para vocês são aleatórios e não refletem os prints desse documento. Eu fiz um programa para gerar esses dados aleatoriamente. A cada nova oferta do bootcamp, novos dados aleatórios serão gerados e um novo questionário será elaborado.
   i. Vocês são responsáveis por criar a interface, layout, css, etc. da forma que preferirem. Não há nenhuma exigência ou regra quanto a isso.
   j. O questionário envolve perguntas que necessitam da implementação para serem respondidas.
   k. Espero que vocês tenham uma excelente experiência desenvolvendo o desafio, assim como eu obtive elaborando-o. Desejo sucesso a todos vocês!
