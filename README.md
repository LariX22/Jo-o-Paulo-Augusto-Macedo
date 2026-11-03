# Currículo virtual — João Paulo Augusto Macedo

Portfólio profissional estático desenvolvido com React e Vite. O conteúdo biográfico foi elaborado exclusivamente a partir do PDF **CURRÍCULO MASTER - JOÃO PAULO A. MACEDO.pdf**. O currículo executivo resumido está disponível para visualização e download; os dois documentos originais também estão preservados em `public/documentos/`.

## Executar localmente

Requisitos: Node.js 18 ou superior e npm.

```bash
npm install
npm run dev
```

Para validar a versão de produção localmente:

```bash
npm run build
npm run preview
```

## Publicar no GitHub

Crie um repositório no GitHub, adicione os arquivos deste diretório e envie para a branch principal. Os PDFs ficam versionados em `public/documentos/`; a aplicação não depende de backend, banco de dados ou variáveis de ambiente.

## Publicar no Render como Static Site

O arquivo `render.yaml` já define o serviço e as configurações de publicação. Para configurar pela interface do Render:

1. No Render, escolha **New + → Static Site** e conecte o repositório GitHub.
2. Use `npm install && npm run build` como **Build Command** e `dist` como **Publish Directory**.
3. Se a configuração não for importada do `render.yaml`, adicione a regra de rewrite `/*` → `/index.html` com status `200`.
4. Confirme a criação do serviço. Com a integração ao GitHub, os próximos pushes na branch vinculada geram novas publicações.

O deploy via Blueprint lê automaticamente o `render.yaml`. Atualize os dados em `src/data.js`, os estilos em `src/styles.css` e substitua os PDFs em `public/documentos/` quando necessário; mantenha os nomes dos arquivos ou atualize a referência em `src/App.jsx`.

## Estrutura

```text
src/
  App.jsx       Componentes e seções do currículo
  data.js       Conteúdo profissional documentado
  main.jsx      Inicialização React
  styles.css    Identidade visual responsiva
public/
  documentos/   PDFs master e executivo
index.html      Metadados e ponto de entrada
render.yaml     Configuração Render Static Site
vite.config.js  Configuração Vite
```
