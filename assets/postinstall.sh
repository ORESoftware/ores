#!/usr/bin/env bash



mkdir -p "$HOME/.oresoftware/bin" || {
  echo "Could not create .oresoftware/bin dir in user home.";
  exit 1;
}


if [[ "$(uname -s)" == "Darwin" ]]; then
    curl --silent -o- https://raw.githubusercontent.com/oresoftware/realpath/master/assets/install.sh | bash || {
       echo "Could not install realpath on your system.";
       exit 1;
    }
fi
