# Troubleshooting

### Behind a proxy

If you launch lodex behind a proxy, environment variables `http_proxy`, `https_proxy` (optionally `no_proxy`) are required.
Otherwise, you could get this error after `make docker-run-dev`:

```bash
npm http request GET https://registry.npmjs.org/pm2
npm info retry will retry, error on last attempt: Error: connect ETIMEDOUT
```

### Using ezmaster

If you are behind a proxy, and try to test your development version, pay attention to your environment variables: `http_proxy`, `https_proxy` and `no_proxy` have to be passed to docker.

```bash
docker build -t lodex:dev --build-arg http_proxy --build-arg https_proxy --build-arg no_proxy .
```

### Looking at the logs

The server's logs are within `logs/http.log`.

To look at it easily:

```bash
tail -f ./logs/http.log | jq
```
