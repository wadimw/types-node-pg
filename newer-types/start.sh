#!/usr/bin/env bash
set -e

export NVM_DIR="$HOME/.nvm"
# shellcheck disable=SC1091
source "$NVM_DIR/nvm.sh"

# Build the code with Node.js 20
nvm use 20
pnpm clean
if ! pnpm build; then
    echo "Build failed successfully"
else
    echo "WARNING: Build passed unexpectedly"
fi

# Run the built code with Node.js 12
nvm use 12
for f in dist/**/*.js
do
    echo # Newline
    echo "=====Running $f====="
    node "$f" || true # Continue despite runtime errors
done
