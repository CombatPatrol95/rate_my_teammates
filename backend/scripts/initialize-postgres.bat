@echo off
REM PostgreSQL initialization script for Rate My Teammates application
REM This script will create the database and user, then run the schema and data SQL scripts

REM Configuration
set DB_HOST=localhost
set DB_PORT=5432
set DB_NAME=ratemyteammates
set DB_USER=ratemyteammatesuser
set DB_PASSWORD=your_secure_password
set POSTGRES_ADMIN_USER=postgres
set POSTGRES_ADMIN_PASSWORD=postgres

REM Script directory
set SCRIPT_DIR=%~dp0
set SQL_DIR=%SCRIPT_DIR%\..\src\main\resources

echo Initializing PostgreSQL database for Rate My Teammates...

REM Create database and user
echo Creating database and user...
set PGPASSWORD=%POSTGRES_ADMIN_PASSWORD%
psql -h %DB_HOST% -p %DB_PORT% -U %POSTGRES_ADMIN_USER% -c "CREATE DATABASE %DB_NAME%;"
if %ERRORLEVEL% NEQ 0 (
    echo Failed to create database
    exit /b 1
)

psql -h %DB_HOST% -p %DB_PORT% -U %POSTGRES_ADMIN_USER% -c "CREATE USER %DB_USER% WITH ENCRYPTED PASSWORD '%DB_PASSWORD%';"
if %ERRORLEVEL% NEQ 0 (
    echo Failed to create user
    exit /b 1
)

psql -h %DB_HOST% -p %DB_PORT% -U %POSTGRES_ADMIN_USER% -c "GRANT ALL PRIVILEGES ON DATABASE %DB_NAME% TO %DB_USER%;"
if %ERRORLEVEL% NEQ 0 (
    echo Failed to grant privileges
    exit /b 1
)

REM Run schema script
echo Creating schema...
set PGPASSWORD=%DB_PASSWORD%
psql -h %DB_HOST% -p %DB_PORT% -U %DB_USER% -d %DB_NAME% -f "%SQL_DIR%\schema.sql"
if %ERRORLEVEL% NEQ 0 (
    echo Failed to create schema
    exit /b 1
)

REM Ask if data should be seeded
set /p SEED_DATA=Do you want to seed the database with sample data? (y/n) 
if /i "%SEED_DATA%"=="y" (
    echo Seeding database with sample data...
    psql -h %DB_HOST% -p %DB_PORT% -U %DB_USER% -d %DB_NAME% -f "%SQL_DIR%\data.sql"
    if %ERRORLEVEL% NEQ 0 (
        echo Failed to seed data
        exit /b 1
    )
)

echo PostgreSQL database initialization complete!
echo Database: %DB_NAME%
echo User: %DB_USER%
echo Use these credentials in your application.yml configuration. 