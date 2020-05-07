
const pipedriveService = require('./pipedrive.service')
//const restifyErrors = require('restify-errors')
const blingModel = require('../bling/bling.model')
const axios = require('axios')
const environment = require('../../common/environment')

exports.getOpportunitiesWon = async (req, res, next) => {

    try {

        const result = await pipedriveService.urlPipedrive.get()

        const Opportunities = await result.data.data.map((res) => {
            let oportunity = {}
            oportunity.customer = res.person_id.name,
                oportunity.title = res.title,
                oportunity.value = res.value,
                oportunity.add_time = res.add_time,
                oportunity.update_time = res.update_time
            return oportunity
        })


        const postOpportunities = () => {
            for (let i = 0; i < Opportunities.length; i++) {

                const xmlOrder = `<?xml version="1.0" encoding="UTF-8"?>
                <pedido>
                <cliente>
                    <nome>${Opportunities[i].customer}</nome>
                </cliente>
                <transporte>
                    <volumes>
                        <volume>
                            <servico>SEDEX - CONTRATO</servico>
                            <codigoRastreamento></codigoRastreamento>
                        </volume>
                    </volumes>
                </transporte>
                <itens>
                    <item>
                        <codigo>001</codigo>
                        <descricao>Caneta 001</descricao>
                        <un>Pç</un>
                        <qtde>10</qtde>
                        <vlr_unit>1.68</vlr_unit>
                    </item>
                    <item>
                        <codigo>002</codigo>
                        <descricao>Caderno 002</descricao>
                        <un>Un</un>
                        <qtde>3</qtde>
                        <vlr_unit>3.75</vlr_unit>
                    </item>
                    <item>
                        <codigo>003</codigo>
                        <descricao>Teclado 003</descricao>
                        <un>Cx</un>
                        <qtde>7</qtde>
                        <vlr_unit>18.65</vlr_unit>
                    </item>
                </itens>
                <parcelas>
                    <parcela>
                        <data>01/09/2009</data>
                        <vlr>${Opportunities[i].value}</vlr>
                        <obs>Teste obs 1</obs>
                    </parcela>
                </parcelas>
                <vlr_frete>15</vlr_frete>
                <vlr_desconto>10</vlr_desconto>
                <obs>Testando o campo observações do pedido</obs>
                <obs_internas>Testando o campo observações internas do pedido</obs_internas>
            </pedido>`
                const config = {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                };
                axios.post(`${environment.environment.urlBling}=${encodeURI(xmlOrder)}`, config)
                    .then((res) => {
                        console.log(res.data)
                    })
                    .catch((error) => {
                        console.log(error)
                    })
                
               blingModel.OrderBling.create(Opportunities[i])
            }
        }

        postOpportunities()
        return res.json(Opportunities)
    } catch (error) {
        console.log(error)
    }
}