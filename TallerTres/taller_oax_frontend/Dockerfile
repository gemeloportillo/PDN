FROM node:12-alpine

MAINTAINER Miguel Angel Portillo Bobadilla <miguel.portillo.pdn@gmail.com>

ADD . /frontEnd
WORKDIR /frontEnd

RUN yarn add global yarn \
&& yarn install \
&& yarn build \
&& yarn global add serve \
&& yarn cache clean

EXPOSE 5000

CMD ["serve", "-s", "build"]
