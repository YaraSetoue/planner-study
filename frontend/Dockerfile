FROM node:20-alpine

WORKDIR /app

# Copie apenas os arquivos de dependências primeiro
COPY package*.json ./

RUN npm install

COPY . .
# Agora copie o restante do código

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]