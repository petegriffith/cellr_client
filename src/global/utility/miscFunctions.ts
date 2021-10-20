export const convertKnexDate = (knexDate: string | Date): Date | string => {
    const convertedDate = new Date(knexDate)
    return convertedDate
}