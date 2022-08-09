#!/bin/bash

CWD=$(dirname "$0")
JSDOM_XHR=node_modules/jsdom/lib/jsdom/living/xhr/XMLHttpRequest-impl.js
JSDOM_XHR_FULL=$CWD/$JSDOM_XHR
JSDOM_XHR_CPY=$JSDOM_XHR_FULL.swp

touch $JSDOM_XHR_CPY

sed 's/require.resolve(".\/xhr-sync-worker.js")/require.resolve("jsdom\/lib\/jsdom\/living\/xhr\/xhr-sync-worker.js")/' \
	< $JSDOM_XHR_FULL \
	> $JSDOM_XHR_CPY

mv $JSDOM_XHR_CPY $JSDOM_XHR_FULL
