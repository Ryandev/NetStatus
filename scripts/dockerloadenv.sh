#!/bin/sh
set -euo pipefail

# Capture all environment variables starting with REACT_APP_ and make JSON string from them
ENV_JSON="$(jq --compact-output --null-input 'env | with_entries(select(.key | startswith("REACT_APP_")))')"

# Escape sed replacement's special characters: \, &, /.
# No need to escape newlines, because --compact-output already removed them.
# Inside of JSON strings newlines are already escaped.
ENV_JSON_ESCAPED="$(printf "%s" "${ENV_JSON}" | sed -e 's/[\&/]/\\&/g')"

HTML_PATH=/usr/share/nginx/html/index.html
HTML_PATH_TMP=/tmp/index.html

# Find the existing placeholder script tag & swap for our values
SCRIPT_EXISTING='window.env={}'
SCRIPT_NEW="window.env=${ENV_JSON_ESCAPED}"

sed "s/${SCRIPT_EXISTING}/${SCRIPT_NEW}/g" ${HTML_PATH} > ${HTML_PATH_TMP}

mv ${HTML_PATH_TMP} ${HTML_PATH}

exec "$@"
