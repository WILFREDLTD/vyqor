-- CreateTable
CREATE TABLE "Consultation" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "selectedDate" TIMESTAMP(3) NOT NULL,
    "selectedTime" TEXT NOT NULL,
    "additionalNotes" TEXT,
    "googleMeetLink" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Consultation_pkey" PRIMARY KEY ("id")
);
