export function formatDate(date){
    const splittedDate = date.split('-')
    const day = splittedDate[2]
    const mounth = splittedDate[1]
    const year = splittedDate[0]
    const formatedDate = `${day}/${mounth}/${year}`

    return formatedDate
}