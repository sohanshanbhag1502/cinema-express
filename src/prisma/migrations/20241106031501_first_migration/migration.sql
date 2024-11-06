-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female');

-- CreateEnum
CREATE TYPE "AgeRating" AS ENUM ('U+', 'UA+', 'A+', 'S');

-- CreateEnum
CREATE TYPE "Resolution" AS ENUM ('4D', '3D', '2D');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('UPI', 'Credit Card', 'Debit Card', 'Net Banking');

-- CreateEnum
CREATE TYPE "CastRole" AS ENUM ('Director', 'Actor', 'Producer', 'MusicDirector', 'Editor');

-- CreateEnum
CREATE TYPE "City" AS ENUM ('Bengaluru', 'Chennai', 'Chandigarh', 'Delhi', 'Hyderabad', 'Pune', 'Mumbai', 'Kochi', 'Trivandrum');

-- CreateEnum
CREATE TYPE "Genre" AS ENUM ('Comedy', 'Drama', 'Action', 'Thriller', 'Horror', 'Romance', 'SciFi', 'Fantasy', 'Adventure', 'Mystery', 'Crime', 'Documentary', 'History', 'Animation', 'Fiction', 'Biography');

-- CreateEnum
CREATE TYPE "Language" AS ENUM ('English', 'Hindi', 'Telugu', 'Kannada', 'Tamil', 'Malayalam', 'Marathi');

-- CreateTable
CREATE TABLE "User" (
    "user_id" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phNum" CHAR(10) NOT NULL,
    "dob" DATE NOT NULL,
    "passwd" VARCHAR(255) NOT NULL,
    "gender" "Gender" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "user_id" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "passwd" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Theater" (
    "the_id" CHAR(5) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "city" "City" NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Theater_pkey" PRIMARY KEY ("the_id")
);

-- CreateTable
CREATE TABLE "Movie" (
    "movie_id" CHAR(5) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "duration" VARCHAR(10) NOT NULL,
    "ageRating" "AgeRating" NOT NULL,
    "pubYear" TIME NOT NULL,
    "rating" REAL NOT NULL,
    "ratingCount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("movie_id")
);

-- CreateTable
CREATE TABLE "Screen" (
    "screen_id" CHAR(5) NOT NULL,
    "the_id" CHAR(5) NOT NULL,
    "resolution" "Resolution" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Screen_pkey" PRIMARY KEY ("screen_id")
);

-- CreateTable
CREATE TABLE "BookedSeat" (
    "seatRow" CHAR(1) NOT NULL,
    "seatCol" CHAR(2) NOT NULL,
    "the_id" CHAR(5) NOT NULL,
    "movie_id" CHAR(5) NOT NULL,
    "book_id" CHAR(5) NOT NULL,
    "screenId" CHAR(5) NOT NULL,
    "bookedTime" TIMESTAMP NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BookedSeat_pkey" PRIMARY KEY ("seatRow","seatCol","the_id","movie_id","bookedTime")
);

-- CreateTable
CREATE TABLE "Payment" (
    "tran_id" INTEGER NOT NULL,
    "book_id" CHAR(5) NOT NULL,
    "amount" INTEGER NOT NULL,
    "method" "PaymentMethod" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("tran_id")
);

-- CreateTable
CREATE TABLE "HostMovie" (
    "the_id" CHAR(5) NOT NULL,
    "screen_id" CHAR(5) NOT NULL,
    "movie_id" CHAR(5) NOT NULL,
    "showtime" CHAR(8) NOT NULL,
    "cost" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HostMovie_pkey" PRIMARY KEY ("the_id","screen_id","movie_id","showtime")
);

-- CreateTable
CREATE TABLE "Booking" (
    "book_id" CHAR(5) NOT NULL,
    "movie_id" CHAR(5) NOT NULL,
    "the_id" CHAR(5) NOT NULL,
    "user_id" VARCHAR(255) NOT NULL,
    "showtime" CHAR(8) NOT NULL,
    "bookdate" DATE NOT NULL,
    "seats" TEXT NOT NULL,
    "screenId" CHAR(5) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("book_id")
);

-- CreateTable
CREATE TABLE "Cast" (
    "cast_id" CHAR(5) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "role" "CastRole" NOT NULL,
    "biolink" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cast_pkey" PRIMARY KEY ("cast_id")
);

-- CreateTable
CREATE TABLE "MovieCast" (
    "movie_id" CHAR(5) NOT NULL,
    "cast_id" CHAR(5) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MovieCast_pkey" PRIMARY KEY ("movie_id","cast_id")
);

-- CreateTable
CREATE TABLE "MovieGenre" (
    "movie_id" CHAR(5) NOT NULL,
    "genreName" "Genre" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MovieGenre_pkey" PRIMARY KEY ("movie_id","genreName")
);

-- CreateTable
CREATE TABLE "MovieLang" (
    "movie_id" CHAR(5) NOT NULL,
    "lang" "Language" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MovieLang_pkey" PRIMARY KEY ("movie_id","lang")
);

-- AddForeignKey
ALTER TABLE "Screen" ADD CONSTRAINT "Screen_the_id_fkey" FOREIGN KEY ("the_id") REFERENCES "Theater"("the_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookedSeat" ADD CONSTRAINT "BookedSeat_the_id_fkey" FOREIGN KEY ("the_id") REFERENCES "Theater"("the_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookedSeat" ADD CONSTRAINT "BookedSeat_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "Movie"("movie_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookedSeat" ADD CONSTRAINT "BookedSeat_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "Booking"("book_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookedSeat" ADD CONSTRAINT "BookedSeat_screenId_fkey" FOREIGN KEY ("screenId") REFERENCES "Screen"("screen_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "Booking"("book_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HostMovie" ADD CONSTRAINT "HostMovie_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "Movie"("movie_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HostMovie" ADD CONSTRAINT "HostMovie_screen_id_fkey" FOREIGN KEY ("screen_id") REFERENCES "Screen"("screen_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HostMovie" ADD CONSTRAINT "HostMovie_the_id_fkey" FOREIGN KEY ("the_id") REFERENCES "Theater"("the_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "Movie"("movie_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_the_id_fkey" FOREIGN KEY ("the_id") REFERENCES "Theater"("the_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_screenId_fkey" FOREIGN KEY ("screenId") REFERENCES "Screen"("screen_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieCast" ADD CONSTRAINT "MovieCast_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "Movie"("movie_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieCast" ADD CONSTRAINT "MovieCast_cast_id_fkey" FOREIGN KEY ("cast_id") REFERENCES "Cast"("cast_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieGenre" ADD CONSTRAINT "MovieGenre_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "Movie"("movie_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieLang" ADD CONSTRAINT "MovieLang_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "Movie"("movie_id") ON DELETE RESTRICT ON UPDATE CASCADE;
