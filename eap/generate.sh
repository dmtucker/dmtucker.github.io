#!/usr/bin/env sh

usage="usage: $(basename "$0") [file ...]"
[ $# -lt 1 ] && echo "$usage"

for filename in $@
do
    eap=$(echo "$filename" | cut -d'.' -f1)
    for ext in md rst pdf odt docx html
    do
        printf "$filename -> $eap.$ext ..."
        pandoc -s "$filename" -o "$eap.$ext" --wrap=none || exit 1
        echo ' done'
    done
done
