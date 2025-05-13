# Spendify

**Spendify** é um aplicativo simples para controlar seus gastos e manter o acompanhamento das despesas de forma eficiente e prática. Com uma interface limpa e fácil de usar, você pode gerenciar seus pagamentos, visualizar gráficos de evolução financeira e mais!

## Funcionalidades

- **Controle de Gastos:** Registre e gerencie suas despesas com facilidade.
- **Evolução de Gastos:** Visualize gráficos de linha para acompanhar a evolução dos seus gastos ao longo do tempo.
- **Gestão de Status:** Marque os gastos como "pago" ou "pendente" e tenha controle completo sobre sua situação financeira.
- **Responsive Design:** A interface foi projetada para se adaptar perfeitamente a diferentes dispositivos.
- **Autenticação de Usuário:** Sistema de login seguro para garantir que seus dados estejam protegidos.
- **Banco de Dados PostgreSQL:** Armazenamento de dados robusto e escalável utilizando o NeonDB.

## Tecnologias Usadas

- **Frontend:**
  - Next.js
  - Tailwind CSS
  - React
  - Recharts (para gráficos)
- **Backend:**

  - Next.js
  - Prisma (ORM)
  - PostgreSQL (NeonDB)

- **Outros:**
  - JWT (JSON Web Token) para autenticação de usuários.
  - Zod para validação de formulários.

## Como Rodar Localmente

### Requisitos

- Node.js (versão 16.x ou superior)
- NPM ou Yarn
- Banco de Dados PostgreSQL (NeonDB)

### Passos

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/spendify.git
   cd spendify
   ```

2. Instale as dependências:

   Com `npm`:

   ```bash
   npm install
   ```

   Ou com `yarn`:

   ```bash
   yarn install
   ```

3. Crie um arquivo `.env` com as variáveis de ambiente necessárias. Exemplo:

   ```
   DATABASE_URL=your-database-connection-url
   JWT_SECRET=your-jwt-secret-key
   ```

4. Rode as migrações do Prisma para criar as tabelas no banco de dados:

   ```bash
   npx prisma migrate dev
   ```

5. Inicie o servidor:

   ```bash
   npm run dev
   ```

   Ou com `yarn`:

   ```bash
   yarn dev
   ```

6. Abra o navegador e acesse [http://localhost:3000](http://localhost:3000).

## Scripts

* **`npm run dev`**: Inicia o servidor de desenvolvimento.
* **`npm run build`**: Compila o projeto para produção.
* **`npm run start`**: Inicia o servidor em produção (após o build).

## Contribuindo

Se você deseja contribuir com o projeto, siga os passos abaixo:

1. Fork este repositório.
2. Crie uma branch com a sua feature (`git checkout -b feature/MinhaFeature`).
3. Comite suas mudanças (`git commit -am 'Adiciona uma nova feature'`).
4. Push para a branch (`git push origin feature/MinhaFeature`).
5. Crie um pull request.

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

