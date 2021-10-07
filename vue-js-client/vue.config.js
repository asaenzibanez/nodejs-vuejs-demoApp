/*
 * @File Name          : vue.config.js
 * @Description        : Vue config (port, vuetify)
 * @Author             : asaenz
 * @Last Modified By   : asaenz
 * @Last Modified On   : 7/10/2021  
 * @Modification Log   : 
 * Ver       Date            Author      		    Modification
 * 1.0    7/10/2021          asaenz            Initial Version
*/

module.exports = {
  devServer: {
    disableHostCheck: true,
    port: 8081,
    public: '0.0.0.0:8081'
  },
  publicPath: "/",

  transpileDependencies: [
    'vuetify'
  ]
}
