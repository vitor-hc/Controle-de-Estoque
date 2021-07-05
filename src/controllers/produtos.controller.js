const { update } = require('../models/produto.model');
const Produto = require('../models/produto.model');
module.exports = {
  async  index(req, res) {
        const product=await Produto.find();
        res.json(product);
    },
    //Create
   async create(req, res) {
        const { nome_produto,descricao_produto,preco_produto,qts_produto} = req.body;
        let data = {};
        let product =  await Produto.findOne({nome_produto});
        if ("!product") {
            data = { nome_produto,descricao_produto,preco_produto,qts_produto };
            product =  await Produto.create(data);
            return res.status(200).json(product);
        } else {
            return res.status(500).json(product);
        }
    },//End
   async details(req, res) {
        const {_id}=req.params;
        const product=  await Produto.findOne({_id});
        res.json(product);
    },
    async delete(req, res) {
        const {_id}=req.params;
        const product=  await Produto.findByIdAndDelete({_id});
        return res.json(product);
    },
    async update(req,res){
        const {_id,nome_produto,descricao_produto,preco_produto,qts_produto}=req.body;
        const data={nome_produto,descricao_produto,preco_produto,qts_produto};
        const product=await Produto.findOneAndUpdate({_id},data,{new:true});
        return res.json(product);
    }

}