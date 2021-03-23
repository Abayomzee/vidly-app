// import * as Sentry from "@sentry/browser";

function init() {
  // Sentry.init({
  //   dsn:
  //     "https://ab2e0ac5bb454e7397b65ba5f3e526d9@o386948.ingest.sentry.io/5221750",
  // });
}

function log(error) {
  console.error(error);
  // Sentry.captureException(error);
}

export default {
  init,
  log,
};
