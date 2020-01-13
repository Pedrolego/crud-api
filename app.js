var express = require ('express');
var app = express();
var bodyParser = require ('body-parser');
var mongoose = require ('mongoose');
var Livro = require ('./model/bookModel');

mongoose.connect(',{
     useNewUrlParser: true ,
     useUnifiedTopology: true 
});

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8000;

var router = express.Router();



/*Rotas da api */

router.get('/', function (req,res){
    res.json({message: 'YEAH! Seja Bem-Vindo a Nossa api Maneira'});
});




router.route('/books')
/* Primeiro Método : criar usuario : POST http://localhost/api/books*/

    .post(function(req,res){
        var book = new Livro();

        book.titulo = req.body.titulo;
        book.autor = req.body.autor;

        book.save(function(error){
            if (error)
                res.send(error);

            res.json({message: "Livro registrado"});
           
        
           
    });
})


    .get(function(req,res){
        
       Livro.find( function(err,livros){
            if(err)
                res.send(err);
            else
                return res.json(livros)
        });
    });


    router.route('/books/:book_id')
        
        .get ( function(req,res) {

            Livro.findById(req.params.book_id, function(error,livro){
                if(error)
                    res.send(error);
                else
                
                res.json(livro);

        }

            
         
        });

    })

        .put( function(req,res){
            

            Livro.findById(req.params.book_id, function(error,livro){

                livro.titulo = req.body.titulo;
                livro.autor = req.body.autor;

                if(error)
                    res.send(console.log(error));
                    else

                 livro.save(function(error){
                    livro.titulo = req.body.titulo;
                    livro.autor = req.body.autor;

                    if(error)
                        res.send(error);
                    
                    else

                        res.json({message:'Livro atualizado'});
                });
            });
         

        })

        .delete(function(req,res){
            Livro.deleteOne({
                _id: req.params.book_id
            },  function(error){
                if(error)
                    res.send(error);
                else

                res.json({message:"Livro Excluído com Sucesso!"})
            });
        });

       

    app.use('/api',router);

    app.listen(port);
        console.log('inciando a app na porta ' + port);

    
