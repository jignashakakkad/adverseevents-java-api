#!/bin/bash

if [ $TRAVIS_PULL_REQUEST == "false" ]
then
  # Wait for Connect to be ready before exiting
  while [ ! -f $SAUCE_CONNECT_READY_FILE ]; do
    echo "Waiting for sauce $SAUCE_CONNECT_READY_FILE"
    sleep .5
  done
fi
