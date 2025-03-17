#!/bin/bash

# PostgreSQL initialization script for Rate My Teammates application
# This script will create the database and user, then run the schema and data SQL scripts

# Configuration
DB_HOST=${DB_HOST:-localhost}
DB_PORT=${DB_PORT:-5432}
DB_NAME=${DB_NAME:-ratemyteammates}
DB_USER=${DB_USER:-ratemyteammatesuser}
DB_PASSWORD=${DB_PASSWORD:-your_secure_password}
POSTGRES_ADMIN_USER=${POSTGRES_ADMIN_USER:-postgres}
POSTGRES_ADMIN_PASSWORD=${POSTGRES_ADMIN_PASSWORD:-postgres}

# Script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
SQL_DIR="$SCRIPT_DIR/../src/main/resources"

echo "Initializing PostgreSQL database for Rate My Teammates..."

# Create database and user
echo "Creating database and user..."
PGPASSWORD=$POSTGRES_ADMIN_PASSWORD psql -h $DB_HOST -p $DB_PORT -U $POSTGRES_ADMIN_USER -c "CREATE DATABASE $DB_NAME;" || { echo "Failed to create database"; exit 1; }
PGPASSWORD=$POSTGRES_ADMIN_PASSWORD psql -h $DB_HOST -p $DB_PORT -U $POSTGRES_ADMIN_USER -c "CREATE USER $DB_USER WITH ENCRYPTED PASSWORD '$DB_PASSWORD';" || { echo "Failed to create user"; exit 1; }
PGPASSWORD=$POSTGRES_ADMIN_PASSWORD psql -h $DB_HOST -p $DB_PORT -U $POSTGRES_ADMIN_USER -c "GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;" || { echo "Failed to grant privileges"; exit 1; }

# Run schema script
echo "Creating schema..."
PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f "$SQL_DIR/schema.sql" || { echo "Failed to create schema"; exit 1; }

# Ask if data should be seeded
read -p "Do you want to seed the database with sample data? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]
then
    echo "Seeding database with sample data..."
    PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f "$SQL_DIR/data.sql" || { echo "Failed to seed data"; exit 1; }
fi

echo "PostgreSQL database initialization complete!"
echo "Database: $DB_NAME"
echo "User: $DB_USER"
echo "Use these credentials in your application.yml configuration." 