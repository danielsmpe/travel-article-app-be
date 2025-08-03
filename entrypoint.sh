#!/bin/sh

# Tunggu DB siap
echo "Menunggu database siap..."
until nc -z db 5432; do
  sleep 1
done
echo "Database Siap!"

# Jalankan migration
echo "Menjalankan migration..."
npm run migration:run

# Jalankan seeding
echo "Menjalankan seed..."
npm run seed

# Start aplikasi
echo "Menjalankan aplikasi NestJS..."
npm run start:prod
