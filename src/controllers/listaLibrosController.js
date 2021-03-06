const controller = {};
var searchText = null;

controller.getText = (req, res)=>{
    let  data_form = req.body;
    req.getConnection((err, conn) => {
        if(err) throw err;
        const query = conn.query('CALL Buscar_libro( ? );', data_form.titulo, (err, result) => {
            console.log("Body's request: ", data_form);
            if (data_form.titulo == '' || data_form.titulo == ' ') {
                searchText = null;
            } else {
                searchText =  data_form.titulo;
            }
          res.redirect('/');
        })
      })
};

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        if(err) throw err;
        console.log('DB conectada!');

        conn.query('CALL Buscar_Libro("'+ searchText +'");', function (err, result, fields) {
            console.log(result);
            res.render('libro_form', {
                data: result[0]
            });
        });
    });
};
module.exports = controller;

