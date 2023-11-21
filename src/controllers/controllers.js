import {getConnection} from "../database/database";

const getTablaDatos = async (req, res) => {
    const connection = await getConnection();
    const table =req.params.table;

    const sql_get='SELECT * from '+ table;
    connection.query(sql_get, (error,results,fields) => {
        if(error){
            throw error;
        }
        if(results.length > 0){
            res.json(results)
        }
        else{
            res.json([{"respuesta":"not results"}])
        }
    })
};

const getTablaDato = async (req, res) => {
    const connection = await getConnection();
    const id=req.params.id;
    const table=req.params.table;
    const sql_get= 'SELECT * from '+ table + ' WHERE Id = '+ id;
    connection.query(sql_get, (error,results,fields) => {
        if(error){
            throw error;
        }
        if(results.length > 0){
            res.json(results)
        }
        else{
            res.json([{"respuesta":"not results"}])
        }
    })
};

const postTablaId = async (req, res)=>{
    const tabla= req.params.table
    const sql_post= 'INSERT INTO '+ tabla +' SET ?'
    const connection = await getConnection();
    connection.query(sql_post,[req.body], error => {
        if(error){
            throw error;
        }
        else{
            res.send("Dato guardado");
        }
    })
};

const getUserLogin = async (req, res) => {
    try{
        const { id, pass } = req.params; 
        const connection = await getConnection();
        const result = await connection.query('SELECT * FROM usuarios WHERE Id = ? AND Contrasena = ?', [id, pass]);
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
};


const deleteTablaDato = async (req, res) => {
    const connection = await getConnection();
    const id=req.params.id;
    const table=req.params.table;
    const sql_get= 'DELETE FROM '+ table + ' WHERE Id = '+ id;
    connection.query(sql_get, (error,results,fields) => {
        if(error){
            throw error;
        }
        if(results.length > 0){
            res.json(results)
        }
        else{
            res.json([{"respuesta":"not results"}])
        }
    })
};

const updateTablaId = async (req, res) => {
    const { id } = req.params;
    const { table } = req.params;
    const sql_put = 'UPDATE ?? SET ? WHERE Id = ?'; 
    const connection = await getConnection();

    connection.query(sql_put, [table, req.body, id], error => {
        if (error) {
            throw error;
        } else {
            res.send("actualizado");
        }
    });
};



const getTransaccionesUser = async (req, res) => {
    try{
        const {id}=req.params;
        const connection = await getConnection();
        const result = await connection.query('SELECT * FROM transacciones WHERE Usuario_origen_id = ? OR Usuario_destino_id = ? ORDER BY Id DESC',  [id, id]);
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
};

const deleteTransaccionesUser = async (req, res) => {
    try{
        const {id}=req.params;
        const connection = await getConnection();

        // Eliminar transacciones
        const consultaEliminarTransacciones = 'DELETE FROM transacciones WHERE Usuario_origen_id = ? OR Usuario_destino_id = ?';
        const resultadoTransacciones = await connection.query(consultaEliminarTransacciones, [id, id]);

        // Eliminar usuario
        const consultaEliminarUsuario = 'DELETE FROM usuarios WHERE id = ?';
        const resultadoUsuario = await connection.query(consultaEliminarUsuario, [id]);

        res.json({resultadoTransacciones, resultadoUsuario});
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
};


export const methods={
    getTablaDatos,
    getTablaDato,
    postTablaId,
    deleteTablaDato,
    updateTablaId,
    getTransaccionesUser,
    getUserLogin,
    deleteTransaccionesUser
}