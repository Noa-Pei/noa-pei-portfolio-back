FROM node:20

COPY . /noa-pei-portfolio-back
WORKDIR /noa-pei-portfolio-back

RUN npm ci
RUN npm run build

CMD node out/index.js