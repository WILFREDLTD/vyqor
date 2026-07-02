function getCopyrightYear(startYear?: number): string {
  const currentYear = new Date().getFullYear();
  if (!startYear || startYear >= currentYear) {
    return `© ${currentYear}`;
  }
  return `© ${startYear}–${currentYear}`;
}

export function copyRightNotice() {
  return getCopyrightYear();
}
