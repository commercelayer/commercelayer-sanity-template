#!/bin/bash
node_version=$(node -v);
if [ ${node_version:1:1} = 6 ]; then
  npm run test-dom
else
  npm test
fi
