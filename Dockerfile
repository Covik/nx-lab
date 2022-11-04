FROM node:18-bullseye-slim@sha256:0a621cdd7d66ad8976f4246ab0661e3b1dd0d397c1dd784ea01bf740bd1c2522
WORKDIR /src
ENV YARN_CACHE_FOLDER="/src/.yarn"
ENV PATH="/src/node_modules/.bin:${PATH}"
# avoid warnings like "tput: No value for $TERM and no -T specified"
ENV TERM="xterm"
RUN unlink /usr/local/bin/npm
RUN apt-get update && apt-get --no-install-recommends install -y \
  ca-certificates \
  curl \
  git \
  wget \
  && rm -rf /var/lib/apt/lists/* \
  && apt-get clean
