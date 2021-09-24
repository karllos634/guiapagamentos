const express = require("express");
const MercadoPago = require("mercadopago");
const app = express();

MercadoPago.configure({
    sandbox: true,
    access_token: "TEST-1749793374061100-092412-bb18c418738bdcd0f515623c3782a576-577296668"
});

app.get("/", (req,res) => {
    res.send("Olá mundo!");
});

app.get("/pagar",async (req,res) => {

    var id = "" + Date.now();
    var emailDoPagador = "joaoguilherme@outlook.com";

    var dados = {
        items: [
            item = {
                id: "" + Date.now(),
                title: "2x video games;3x camisas",
                quantity: 1,
                currency_id: 'BRL',
                unit_price: parseFloat(150)
            }
        ],
        payer:{
            email: emailDoPagador
        },
        external_reference: id
    }

    try{
        var pagamento = await MercadoPago.preferences.create(dados);~
        console.log(pagamento);
        //Banco.SalvarPagamento({id: id, pagador: emailDoPagador});
        return res.redirect(pagamento.body.init_point);
    }catch(err){
        return res.send(err.message);
    }

});

app.post("/not",(req,res) => {
    console.log(req.query);
    res.send("OK!");
})

app.listen(80,(req,res) => {
    console.log("Servidor rodando!");
});