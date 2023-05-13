import { utilService } from "./util.service.js"



export const googleBookService = {
    query
}


function query(txt) {
    // axios request to google api
    const url = `https://www.googleapis.com/books/v1/volumes?printType=books&q=${txt}`
    return axios.get(url)
        .then(res => {
            let books = res.data.items
            let newBooks = []
            books.forEach(book => {
                let bookData = makeData(book)
                newBooks.push(bookData)
            })
            return newBooks
        })
}

function makeData({ volumeInfo, id }) {
    return {
        id,
        title: volumeInfo.title,
        subtitle: volumeInfo.subtitle,
        authors: volumeInfo.authors,
        publishedDate: volumeInfo.publishedDate.split('-')[0],
        description: volumeInfo.description,
        pageCount: volumeInfo.pageCount,
        categories: [],
        thumbnail: volumeInfo.imageLinks.thumbnail,
        language: volumeInfo.language,
        listPrice: {
            amount: utilService.getRandomIntInclusive(1, 300),
            currencyCode: 'USD',
            isOnSale: false
        }
    }
}
