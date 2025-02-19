ARG UPSTREAM=22-bookworm
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
      x11-utils \
      libfontconfig1 \
      libfreetype6 \
      xfonts-scalable \
      && \
    apt-get -qyy clean

ARG NOVNC_VER=1.5.0
ARG WEBSOCKIFY_VER=0.13.0
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

ARG S6_OVL_VERSION=3.2.0.2
RUN echo '\033[1;36mInstalling S6 overlay\033[0m' && \
    curl -sSL "https://github.com/just-containers/s6-overlay/releases/download/v${S6_OVL_VERSION}/s6-overlay-noarch.tar.xz" | tar -Jxpf - -C / && \
    curl -sSL "https://github.com/just-containers/s6-overlay/releases/download/v${S6_OVL_VERSION}/s6-overlay-x86_64.tar.xz" | tar -Jxpf - -C /

ENV DBUS_SESSION_BUS_ADDRESS=/dev/null
RUN mkdir -p /tmp/.X11-unix && \
    chmod 1777 /tmp/.X11-unix && \
    chmod +x /dev/shm

# Setup Chrome
COPY ./chrome/setup /opt/bin/chrome-setup

RUN --mount=type=cache,target=/var/lib/apt/lists/ \
    --mount=type=cache,target=/var/cache/apt/ \
    echo '\033[1;36mInstalling Playwright Chrome\033[0m' && \
    apt-get update -qqy && \
    npm i -g playwright && \
    /opt/bin/chrome-setup && \
    apt-get -qyy clean

# Service scripts
COPY ./s6/ /etc/s6-overlay/s6-rc.d/

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
