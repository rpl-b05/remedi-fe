export * from './capitalizeString'

export const formattedDateTime = (datetime: string) => {
  const originalDate = new Date(datetime)
  const gmtPlus7Offset = 7 * 60
  const localDate = new Date(originalDate.getTime() + gmtPlus7Offset)

  return localDate.toLocaleString('en-GB')
}
