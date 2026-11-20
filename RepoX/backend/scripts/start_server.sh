#!/bin/bash

# Simple server startup script for RepoX Backend
# This script only waits for database and starts the application (no fixture loading)

set -e

echo "🚀 Starting RepoX Backend..."

# Wait for database to be ready (optional - only if DATABASE_URL is set)
if [ -n "$DATABASE_URL" ]; then
    echo "⏳ Waiting for database to be ready..."
    python -c "
import time
import sys
import psycopg2
import os

database_url = os.getenv('DATABASE_URL')
if database_url:
    for attempt in range(30):
        try:
            conn = psycopg2.connect(database_url)
            conn.close()
            print('✅ Database is ready!')
            break
        except psycopg2.OperationalError:
            print(f'⏳ Database not ready yet (attempt {attempt + 1}/30), waiting...')
            time.sleep(2)
    else:
        print('❌ Database connection failed after 30 attempts')
        sys.exit(1)
else:
    print('⚡ No DATABASE_URL provided, skipping database check')
"
else
    echo "⚡ No DATABASE_URL provided, skipping database check"
fi

# Start the application
echo "🎯 Starting application server..."
exec uvicorn backend.app:app --host 0.0.0.0 --port 8000 --reload 