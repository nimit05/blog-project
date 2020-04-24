const ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

function getrandomstring (length) {
    let buff = []
     while(buff.length<length){
         const count = parseInt(Math.random()*(62))
         buff.push(ALPHA.charAt(count))
     }
   return   buff.join('')

}
module.exports = {getrandomstring}