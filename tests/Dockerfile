ARG TAG=latest
FROM quay.io/putara/docker-playwright-chrome:$TAG

COPY ./playwright /tmp/playwright
WORKDIR /tmp/playwright
RUN echo '\033[1;36mInstalling NPM dependencies\033[0m' && \
    npm i

CMD [ "sh", "-c", "npm run $TEST_RUNNER" ]
