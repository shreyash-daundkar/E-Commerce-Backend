#!/bin/sh
set -e

# Function to execute Prisma migration with a retry limit
execute_migration() {
  echo "Running database migrations..."
  local retries=10
  local count=0

  until npx prisma migrate dev --name init; do
    count=$((count + 1))
    if [ $count -ge $retries ]; then
      echo "Migration failed after $retries attempts, exiting."
      exit 1
    fi
    echo "Migration failed, retrying in 5 seconds... ($count/$retries)"
    sleep 5
  done
  echo "Migration succeeded!"
}

# Call the function to execute the migration
execute_migration

# Execute the original CMD
exec "$@"
