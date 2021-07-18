import React,{useState,useEffect}from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import MenuAdmin from '../../../components/menu-admin';
import Footer from '../../../components/footer-admin';



import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SaveIcon from '@material-ui/icons/Save';
import api from '../../../services/api';

import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {display: 'flex',},
  title: {flexGrow: 1,},
  appBarSpacer: theme.mixins.toolbar,
  content: {flexGrow: 1,height: '100vh',overflow: 'auto',},
  container: {paddingTop: theme.spacing(2),paddingBottom: theme.spacing(4),},
  paper: {padding: 35,display: 'flex',overflow: 'auto',flexDirection: 'column',},
  formControl:{width:'100%'},
  btnSuccess:{ backgroundColor:"green",color:"#fff","&:hover":{backgroundColor:"#12b912"}}
}));

export default function UsuarioCadastrar() {
  const classes = useStyles();
  const [codigo , setCodigo] = useState('');
  const [nome , setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco , setPreco] = useState('');
  const [quantidade , setQuantidade] = useState('');

  const { idProduto } = useParams();


  useEffect(() => {
    async function getProduto(){
      var response = await api.get('/api/produtos.details/'+idProduto);
      setCodigo(response.data.cod_produto)
      setNome(response.data.nome_produto);
      setDescricao(response.data.descricao_produto);
      setPreco(response.data.preco_produto);
      setQuantidade(response.data.qtd_produto);
    }

    getProduto();
  },[])

  async function handleSubmit(){

    const data = {
      cod_produto:codigo,
      nome_produto:nome,
      descricao_produto:descricao,
      preco_produto:preco,
      qtd_produto:quantidade,
    _id:idProduto}

    if(codigo!==''&&nome!==''&&descricao!==''&&preco!==''&&quantidade!==''){
        const response = await api.put('/api/produtos/',data);

        if(response.status===200){
          window.location.href='/admin/produtos'
        }else{
          alert('Erro ao atualizar o Produto!');
        }
      }else{
        alert('Por favor, preencha todos os dados!');
      }

     

  }
  
  return (
    <div className={classes.root}>
      
      <MenuAdmin title={'PRODUTOS'}/>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
            <Button style={{marginBottom:10,marginRight:5}} variant="contained" href={'/admin/produtos'}><ArrowBackIcon /> Voltar</Button>
            <Button style={{marginBottom:10}} variant="contained" color="primary" href={'/admin/produtos/cadastrar'}>
              <AddIcon />
              Cadastrar
            </Button>
              <Paper className={classes.paper}>
                <h2>Atualização de Produtos</h2>
                <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                    <TextField
                      required
                      id="codigo"
                      name="codigo"
                      label="Codigo"
                      fullWidth
                      autoComplete="codigo"
                      value={codigo}
                      onChange={e => setCodigo(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      required
                      id="nome"
                      name="nome"
                      label="Nome do Produto"
                      fullWidth
                      autoComplete="nome"
                      value={nome}
                      onChange={e => setNome(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="descricao"
                      name="descricao"
                      label="Descrição"
                      fullWidth
                      autoComplete="descricao"
                      value={descricao}
                      onChange={e => setDescricao(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="preco"
                      name="preco"
                      label="Preço"
                      fullWidth
                      autoComplete="preco"
                      value={preco}
                      onChange={e => setPreco(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="qtd"
                      name="qtd"
                      label="Quantidade"
                      fullWidth
                      autoComplete="qtd"
                      value={quantidade}
                      onChange={e => setQuantidade(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                  <Button variant="contained"  onClick={handleSubmit} className={classes.btnSuccess}>
                    <SaveIcon /> Salvar
                  </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            
          </Grid>
          <Box pt={4}>
            <Footer />
          </Box>
        </Container>
      </main>
    </div>
  );
}