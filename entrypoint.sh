#!/bin/sh
set -e

# Function to execute Prisma migration until it succeeds
execute_migration() {
  echo "Running database migrations..."
  until npx prisma migrate dev --name init; do
    echo "Migration failed, retrying in 5 seconds..."
    sleep 5
  done
  echo "Migration succeeded!"
}

# Call the function to execute the migration
execute_migration

# Execute the original CMD
exec "$@"
