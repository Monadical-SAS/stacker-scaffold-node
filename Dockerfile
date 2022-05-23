FROM node:17 as deps

# unnecessary at the moment to have a separate deps but we may want to add some things here

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

FROM deps

COPY --from=deps /app /app

EXPOSE 3000
CMD [ "yarn", "dev_and_autoinstall" ]
