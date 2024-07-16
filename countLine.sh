#!/bin/bash

# Directory to scan (default to current directory if not provided)
DIR=${1:-.}

# File types to include in the line count
FILE_TYPES=("*.ts")

echo "Calculating lines of code in directory: $DIR"
echo "Including file types: ${FILE_TYPES[*]}"

TOTAL_LINES=0

for FILE_TYPE in "${FILE_TYPES[@]}"; do
    echo "Processing file type: $FILE_TYPE"
    
    # Find all files of the current type and count lines
    LINES=$(find "$DIR" -name "$FILE_TYPE" -type f -exec wc -l {} + | awk '{total += $1} END {print total}')
    
    if [ -z "$LINES" ]; then
        LINES=0
    fi

    echo "Total lines for $FILE_TYPE: $LINES"
    TOTAL_LINES=$((TOTAL_LINES + LINES))
done

echo "Total lines of code: $TOTAL_LINES"
