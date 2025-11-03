/**********************************************************************************************************************
 * Objetivo: Arquivo responsável pelas funções para criar a API de estados e cidades
 * Data: 24/09/2025
 * Autor: Kauan
 * Versão 1.0
 **********************************************************************************************************************/
// Import do arquivo contatos
const dadosWhatts = require('./contatos.js')
const MESSAGE_ERROR = {status : false, statuscode: 500, development: 'Kauan Antunes Lima'}

const getAllDados = function(){
let message = {status: true, statuscode: 200, development: 'Kauan Antunes Lima', contatos: []}

dadosWhatts.contatos['whats-users'].forEach(function(item){
    message.contatos.push(item.id)
    message.contatos.push(item.account)
    message.contatos.push(item.nickname)
    message.contatos.push(item['created-since'])
    message.contatos.push(item['profile-image'])
    message.contatos.push(item.number)
    message.contatos.push(item.background)
    message.contatos.push(item.contacts)
    
})
if(message.contatos.length > 0)
 return message
else
return MESSAGE_ERROR

//console.log(message)
}

const getDadosProfile = function(number){
let id = !isNaN(number)

let message = {status: true, statuscode: 200, development: 'Kauan Antunes Lima', contatos: id }

dadosWhatts.contatos['whats-users'].forEach(function(item){

    if(item.number == number){
        message.nome = item.account
        message.nick = item.nickname
        message.foto = item['profile-image']
        message.numero = item.number
        message.cor = item.background
        message.criacao = item['created-since']
    } 
 })
    if(number !== '')
    return message
    else
    return MESSAGE_ERROR
}

const getDadosContatos = function(number){
let id = !isNaN(number)

 let message = {status: true, statuscode: 200, development: 'Kauan Antunes Lima', nome: '', contatos: [] }

 dadosWhatts.contatos['whats-users'].forEach(function(item){

    if(item.number == number){
        message.nome = item.account
    
 item.contacts.forEach(function(contato){
    message.contatos.push({
        nome: contato.name,
        foto: contato.image,
        descricao: contato.description
               })
            })
        }
    })
    if(number !== '')
    return message
    else
    return MESSAGE_ERROR
    // console.log(message)
}

const getMensagens = function(number){
let numero = !isNaN(number)

let message = {status: true, statuscode: 200, development: 'Kauan Antunes Lima',nome: '', contatos: [] }

dadosWhatts.contatos['whats-users'].forEach(function(item){

    if(item.number == number){
        message.nome = item.account
    
item.contacts.forEach(function(contato){
                message.contatos.push({
                nome: contato.name,
                numero: contato.number,
                foto: contato.image,
                descricao: contato.description,
                mensagens: contato.messages,

             })
        })
    }
})
    if(number !== '')
    return message
    else
    return MESSAGE_ERROR
}

const getConversas = function(number1,  number2){
let message = {status: true, statuscode: 200, development: 'Kauan Antunes Lima',nomeDoUsuario:'', nomeDoContato: '', conversas: [] }

dadosWhatts.contatos['whats-users'].forEach(function(item){
    item.contacts.forEach(function(contacts){
    if(item.number == number1 && contacts.number == number2){
        message.nomeDoUsuario = item.account
        message.nomeDoContato = contacts.name

        let nomeDoContato = contacts.name

        contacts.messages.forEach(function(mensagens){
            if(mensagens.sender == nomeDoContato || mensagens.sender == "me"){
                       let conversas = {enviado_para: mensagens.sender,
                            conteudo: mensagens.content,
                            horario: mensagens.time
                    }
                    message.conversas.push(conversas)
                }
            })
        }
    })
})
    if(number1 !== '')
    return message
    else
    return MESSAGE_ERROR
}

const getFilter = function(number1,  number2, keyWord){
let message = {status: true, statuscode: 200, development: 'Kauan Antunes Lima',nomeDoUsuario:'', nomeDoContato: '', conversas: [] }

 dadosWhatts.contatos['whats-users'].forEach(function (item) {
        item.contacts.forEach(function (contacts) {
        if (item.number === number1 && contacts.number === number2) {
            message.nomeDoUsuario = item.account
            message.nomeDoContato = contacts.name
                    contacts.messages.forEach(function (mensagens) {
                        if(mensagens.content.toUpperCase().includes(keyWord.toUpperCase())){
                            let conversa = { enviado_para: mensagens.sender,
                                conteudo: mensagens.content,
                                horario: mensagens.time
                            }
                        message.conversas.push(conversa)
                        }
                    })
                }
            })
        })
    if(number1 !== '')
    return message
    else
    return MESSAGE_ERROR
//console.log(message)
}
module.exports = {
getAllDados,
getDadosProfile,
getDadosContatos,
getMensagens,
getConversas,
getFilter
}