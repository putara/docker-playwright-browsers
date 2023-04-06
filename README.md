# TL;DR

Yet another Docker setup for Playwright inspired by Selenium.

## Customise environment variables

| Variable | Default |
|----------|---------|
| `SCREEN_WIDTH` | `1280` |
| `SCREEN_HEIGHT` | `720` |
| `SCREEN_DEPTH` | `24` |
| `SCREEN_DPI` | `96` |
| `VNC_PASSWORD` | (not implemented yet) |
| `VNC_VIEW_ONLY` | - |
| `VNC_PORT` | `5900` |
| `NO_VNC_PORT` | `7900` |

## VNC access

Once connected, right click on the background, then select Playwright > Google Chrome to open Chrome.

### Using a standalone viewer

1. Install VNC viewer (e.g. [RealVNC viewer](https://www.realvnc.com/en/connect/download/viewer/) or [TightVNC viewer](https://www.tightvnc.com/download.php) on Windows)

2. Connect to `localhost:5900` without password

### Using a web browser

1. Navigate to `http://localhost:7900`

2. Click the Connect button

## TODO

- [ ] Support Firefox & Webkit (Safari)
