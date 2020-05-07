const env = require('../env')

exports.environment = {
    server: {port: process.env.SERVER_PORT || 3003},
    db: {url: process.env.DB_URL || 'mongodb://localhost/linkapi'},
    urlPipedrive: 'https://empresateste11.pipedrive.com/v1/deals?status=won&api_token=2957f556dc3b1b67ddfc4a9a89549c7b8d597de4',
    urlBling: 'https://bling.com.br/Api/v2/pedido/'
}