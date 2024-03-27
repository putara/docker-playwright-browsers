# ARG UPSTREAM=18-bullseye
ARG UPSTREAM=18-buster
FROM node:${UPSTREAM}

ENV DEBIAN_FRONTEND=noninteractive \
    DEBCONF_NONINTERACTIVE_SEEN=true

RUN --mount=type=cache,target=/var/lib/apt/lists/ \
    --mount=type=cache,target=/var/cache/apt/ \
    echo '\033[1;36mInstalling prerequisites\033[0m' && \
    apt-get -qqy update && \
    apt-get -qqy --no-install-recommends install \
      apt-utils && \
    apt-get -qqy --no-install-recommends install \
      bzip2 \
      ca-certificates \
      tzdata \
      locales \
      sudo \
      unzip \
      p7zip-full \
      jq \
      nano \
      less \
      wget \
      curl \
      gnupg2 \
      pulseaudio \
      htop \
      neofetch \
      xauth \
      xvfb \
      xterm \
      x11vnc \
      fluxbox \
      feh \
      python3-numpy \
      libfontconfig \
      libfreetype6 \
      xfonts-cyrillic \
      xfonts-scalable \
      fonts-liberation \
      fonts-ipafont-gothic \
      fonts-wqy-zenhei \
      fonts-tlwg-loma-otf \
      libnss3 \
      libnspr4 \
      libatk1.0-0 \
      libatk-bridge2.0-0 \
      libcups2 \
      libatspi2.0-0 \
      libxcomposite1 \
      libgbm1 \
      libxkbcommon0 \
      && \
    apt-get -qyy clean

ARG NOVNC_VER=1.4.0
ARG WEBSOCKIFY_VER=0.11.0
RUN --mount=type=cache,target=/tmp/vnc/ \
    echo '\033[1;36mInstalling VNC server\033[0m' && \
    mkdir -p /opt/bin && \
    curl -sSLo "/tmp/vnc/noVNC.zip" "https://github.com/novnc/noVNC/archive/refs/tags/v${NOVNC_VER}.zip" && \
    7z x -o"/tmp/vnc/noVNC/" "/tmp/vnc/noVNC.zip" && \
    mv "/tmp/vnc/noVNC/noVNC-${NOVNC_VER}" /opt/bin/noVNC && \
    cp /opt/bin/noVNC/vnc.html /opt/bin/noVNC/index.html && \
    curl -sSLo "/tmp/vnc/websockify.zip" "https://github.com/novnc/websockify/archive/refs/tags/v${WEBSOCKIFY_VER}.zip" && \
    7z x -o"/tmp/vnc/websockify/" "/tmp/vnc/websockify.zip" && \
    rm -rf "/tmp/vnc/websockify/websockify-${WEBSOCKIFY_VER}/tests" && \
    mv "/tmp/vnc/websockify/websockify-${WEBSOCKIFY_VER}" /opt/bin/noVNC/utils/websockify

# TODO: upgrade to 3.x
ARG S6_OVL_VERSION=2.2.0.3
RUN echo '\033[1;36mInstalling S6 overlay\033[0m' && \
    curl -sSL "https://github.com/just-containers/s6-overlay/releases/download/v${S6_OVL_VERSION}/s6-overlay-amd64.tar.gz" | tar -zxf - -C /

ENV DBUS_SESSION_BUS_ADDRESS=/dev/null
RUN mkdir -p /tmp/.X11-unix && \
    chmod 1777 /tmp/.X11-unix && \
    chmod +x /dev/shm

# Service scripts
COPY ./s6/ /

# Setup Chrome
COPY ./chrome/setup /opt/bin/chrome-setup

RUN --mount=type=cache,target=/var/lib/apt/lists/ \
    --mount=type=cache,target=/var/cache/apt/ \
    echo '\033[1;36mInstalling Playwright Chrome\033[0m' && \
    apt-get update -qqy && \
    npm i -g playwright && \
    /opt/bin/chrome-setup && \
    apt-get -qyy clean

ENV SCREEN_WIDTH=1280
ENV SCREEN_HEIGHT=720
ENV SCREEN_DEPTH=24
ENV SCREEN_DPI=96
ENV DISPLAY_NUM=99
ENV DISPLAY=:99.0

ENV S6_LOGGING=0
ENV S6_KEEP_ENV=1
ENV S6_BEHAVIOUR_IF_STAGE2_FAILS=2

EXPOSE 5900
EXPOSE 7900
ENTRYPOINT ["/init"]
