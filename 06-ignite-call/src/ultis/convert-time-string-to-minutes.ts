export function convertTimeStringToMinutes(timeString: string) {
  const [hours, minutes] = timeString.split(':').map(i => Number(i))
 
  return hours * 60 + minutes
}