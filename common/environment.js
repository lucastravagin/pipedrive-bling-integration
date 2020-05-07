

exports.environment = {
    server: {port: process.env.SERVER_PORT || 4003},
    db: {url: process.env.DB_URL || 'mongodb://localhost/linkapi'},
    urlPipedrive: 'https://empresateste11.pipedrive.com/v1/deals?status=won&api_token=2957f556dc3b1b67ddfc4a9a89549c7b8d597de4',
    urlBling: 'https://bling.com.br/Api/v2/pedido/?apikey=db81d67d8ab1d3dbf0b205dda53326017f66f33d50245d1d7f4d0a838e58b5b6a2101ae4&xml'
}