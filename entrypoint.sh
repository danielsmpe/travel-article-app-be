#!/bin/sh

if [ -n "$RAILWAY_ENVIRONMENT" ] || [ "$SKIP_WAIT_FOR_DB" = "true" ]; then
  echo "Running in Railway (skip wait-for-db)"
else
  echo "Menunggu database siap di host db:5432..."
  until nc -z db 5432; do
    sleep 1
  done
  echo "Database siap!"
fi

echo "Menjalankan migration..."
npm run migration:run

echo "Menjalankan seed..."
npm run seed

echo "Menjalankan aplikasi NestJS..."
npm run start:prod
