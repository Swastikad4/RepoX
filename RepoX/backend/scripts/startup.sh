#!/bin/bash

# Startup script for RepoX Backend
# This script loads fixtures and starts the application

set -e

echo "🚀 Starting RepoX Backend..."

# Initialize database first (create database if not exists)
echo "🔧 Initializing database..."
cd /app && PYTHONPATH=/app python backend/db_setup.py init

# Wait for database to be ready
echo "⏳ Waiting for database to be ready..."
python -c "
import time
import sys
import psycopg2
from backend.config import DATABASE_URL

for attempt in range(30):
    try:
        conn = psycopg2.connect(DATABASE_URL)
        conn.close()
        print('✅ Database is ready!')
        break
    except psycopg2.OperationalError:
        print(f'⏳ Database not ready yet (attempt {attempt + 1}/30), waiting...')
        time.sleep(2)
else:
    print('❌ Database connection failed after 30 attempts')
    sys.exit(1)
"

# Load fixtures
echo "📦 Loading example fixtures..."
cd /app && PYTHONPATH=/app python backend/scripts/sync_fixtures.py

if [ $? -eq 0 ]; then
    echo "✅ Fixtures loaded successfully!"
else
    echo "⚠️  Some fixtures failed to load, but continuing..."
fi

# Start the application
echo "🎯 Starting application server..."
exec uvicorn backend.app:app --host 0.0.0.0 --port 8000 