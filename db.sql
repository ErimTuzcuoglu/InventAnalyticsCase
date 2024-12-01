-- Create Database
CREATE DATABASE library;

-- Connect to the library database
\c library;

-- Create Books Table
CREATE TABLE public."Books" (
    id serial4 NOT NULL,
    "name" varchar(255) NOT NULL,
    "averageRating" float8 NULL DEFAULT 0,
    "createdAt" timestamptz NOT NULL,
    "updatedAt" timestamptz NOT NULL,
    CONSTRAINT "Books_pkey" PRIMARY KEY (id)
);

-- Create Users Table
CREATE TABLE public."Users" (
    id serial4 NOT NULL,
    "name" varchar(255) NOT NULL,
    "createdAt" timestamptz NOT NULL,
    "updatedAt" timestamptz NOT NULL,
    CONSTRAINT "Users_pkey" PRIMARY KEY (id)
);

-- Create BorrowedBooks Table
CREATE TABLE public."BorrowedBooks" (
    id serial4 NOT NULL,
    score float8 NULL,
    "createdAt" timestamptz NOT NULL,
    "updatedAt" timestamptz NOT NULL,
    "UserId" int4 NOT NULL,
    "BookId" int4 NOT NULL,
    CONSTRAINT "BorrowedBooks_pkey" PRIMARY KEY (id)
);

-- Add Foreign Key Constraints
ALTER TABLE public."BorrowedBooks"
    ADD CONSTRAINT "BorrowedBooks_BookId_fkey"
    FOREIGN KEY ("BookId") REFERENCES public."Books"(id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE public."BorrowedBooks"
    ADD CONSTRAINT "BorrowedBooks_UserId_fkey"
    FOREIGN KEY ("UserId") REFERENCES public."Users"(id) ON DELETE CASCADE ON UPDATE CASCADE;

-- Optional: If you want to remove the tables, uncomment the following:
-- DROP TABLE public."Books";
-- DROP TABLE public."Users";
-- DROP TABLE public."BorrowedBooks";

