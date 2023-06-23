-- LOGIN --

mysql - u root - p -- SHOW USERS --
SELECT *
FROM mysql.user;

-- CREATE USER --

CREATE USER
    'DaCoRLApiUser' @'localhost' IDENTIFIED BY 'DaCoRLApi_1.@Mysql';

-- GRANT ALL PRIVILEGES ON ALL DATABASES TO A USER CREATED --

GRANT ALL PRIVILEGES ON *.* TO 'DaCoRLApiUser'@'localhost';

FLUSH PRIVILEGES;

-- SHOW GRANTS --

SHOW GRANTS FOR 'DaCoRLApiUser'@'localhost';

-- REMOVE GRANTS --

REVOKE ALL PRIVILEGES, GRANT OPTION FROM 'DaCoAdmin'@'localhost';

-- DELETE USER --

DROP USER 'DaCoAdmin'@'localhost';

-- EXIT --

exit;

-- SHOW DATABASES --

SHOW DATABASES;

-- CREATE DATABASE --

CREATE DATABASE `rlapi_db`;

-- DELETE DATABASE --

DROP DATABASE 'databasename';

-- SELECT DATABASE --

USE DATABASE 'databasename';

-- CREATE TABLE --

-- SHOW TABLES --

SHOW TABLES;

-- DELETE/DROP TABLE --

DROP TABLE 'tablename';