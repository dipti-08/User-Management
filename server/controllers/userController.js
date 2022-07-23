const mysql  = require('mysql');

// Creating connection pool
const pool = mysql.createPool({
    connectionLimit: 100,
    host           : 'localhost',
    user           : 'root',
    password       : 'toor',
    database       : 'user_management'
});




// View User
exports.view = (req,res) => {

    pool.getConnection((err,connection) => {
        if(err) throw err;
        console.log('Connecting to the database...');
        console.log('Connected as ID ' + connection.threadId);

        // Use the connection
        connection.query('SELECT * FROM USER WHERE STATUS <> "removed"',(err,rows) => {
            // When done with the connection, release it
            connection.release();

            if(!err){
                let removedUser = req.query.removed;
                res.render('home',{rows, removedUser});
            }
            else{
                console.log(err);
            }

            //console.log('The data from User table : \n',rows);
        });
    
    });

};

// Find user by search
exports.find = (req,res) => {
    pool.getConnection((err,connection) => {
        if(err) throw err;
        console.log('Connecting to the database...');
        console.log('Connected as ID ' + connection.threadId);

        let searchTerm = req.body.search
        // Use the connection
        connection.query('SELECT * FROM USER WHERE FIRST_NAME LIKE ? OR LAST_NAME LIKE ? ',['%' + searchTerm + '%','%' + searchTerm + '%'],(err,rows) => {
            // When done with the connection, release it
            connection.release();

            if(!err){
                res.render('home',{rows});
            }
            else{
                console.log(err);
            }

            //console.log('The data from User table : \n',rows);
        });
    
    }); 
};

// Add new user
exports.form = (req,res) => {
     res.render('add-user');

};

exports.create = (req,res) => {
    const {first_name,last_name,email,phone,comments} = req.body;    

    pool.getConnection((err,connection) => {
        if(err) throw err;
        console.log('Connecting to the database...');
        console.log('Connected as ID ' + connection.threadId);

        // Use the connection
        connection.query('INSERT INTO USER SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ? ',[first_name,last_name,email,phone,comments],(err,rows) => {
            // When done with the connection, release it
            connection.release();

            if(!err){
                res.render('add-user',{ alert : 'User added Successfully.' });
            }
            else{
                console.log(err);
            }
        });
    
    });
};

// Edit User
exports.edit = (req,res) => {
    
    pool.getConnection((err,connection) => {
        if(err) throw err;
        console.log('Connecting to the database...');
        console.log('Connected as ID ' + connection.threadId);

        // Use the connection
        connection.query('SELECT * FROM USER WHERE id = ? ',[req.params.id],(err,rows) => {
            // When done with the connection, release it
            connection.release();

            if(!err){
                res.render('edit-user',{rows});
            }
            else{
                console.log(err);
            }
            console.log('The data from User table : \n',rows);
        });
    
    });
};

// Modify User data
exports.modify = (req,res) => {
    
    const {first_name,last_name,email,phone,comments} = req.body;
    pool.getConnection((err,connection) => {
        if(err) throw err;
        console.log('Connecting to the database...');
        console.log('Connected as ID ' + connection.threadId);

        // Use the connection
        connection.query('UPDATE USER SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ? WHERE id = ? ',[first_name,last_name,email,phone,comments,req.params.id],(err,rows) => {
            // When done with the connection, release it
            connection.release();

            if(!err){
                pool.getConnection((err,connection) => {
                    if(err) throw err;
                    console.log('Connecting to the database...');
                    console.log('Connected as ID ' + connection.threadId);
            
                    // Use the connection
                    connection.query('SELECT * FROM USER WHERE id = ? ',[req.params.id],(err,rows) => {
                        // When done with the connection, release it
                        connection.release();
            
                        if(!err){
                            res.render('edit-user',{rows, alert : `${first_name} has been updated Successfully! `});
                        }
                        else{
                            console.log(err);
                        }
                        console.log('The data from User table : \n',rows);
                    });
                
                });
            }
            else{
                console.log(err);
            }
            console.log('The data from User table : \n',rows);
        });
    
    });

};

// Delete User
exports.delete = (req,res) => {
    // pool.getConnection((err,connection) => {
    //     if(err) throw err;
    //     console.log('Connecting to the database...');
    //     console.log('Connected as ID ' + connection.threadId);

    //     // Use the connection
    //     connection.query('DELETE FROM USER WHERE id = ? ',[req.params.id],(err) => {
    //         // When done with the connection, release it
    //         connection.release();

    //         if(!err){
    //             res.redirect('/');
    //         }
    //         else{
    //             console.log(err);
    //         }
    //     });
    
    // });
    pool.getConnection((err,connection) => {
        if(err) throw err;
        console.log('Connecting to the database...');
        console.log('Connected as ID ' + connection.threadId);

        // Use the connection
        connection.query('UPDATE USER SET status = ? WHERE id = ? ',['removed',req.params.id],(err,rows) => {
            // When done with the connection, release it
            connection.release();

            if(!err){
                let removedUser = encodeURIComponent('User successeflly removed.');
                res.redirect('/?removed=' + removedUser);
            }
            else{
                console.log(err);
            }
        });
    
    });
};

// View User Detail
exports.viewUser = (req,res) =>
{
    pool.getConnection((err,connection) => {
        if(err) throw err;
        console.log('Connecting to the database...');
        console.log('Connected as ID ' + connection.threadId);

        // Use the connection
        connection.query('SELECT * FROM USER WHERE id = ? ',[req.params.id],(err,rows) => {
            // When done with the connection, release it
            connection.release();

            if(!err){
                res.render('view-user',{rows});
            }
            else{
                console.log(err);
            }

            //console.log('The data from User table : \n',rows);
        });
    
    });
};