import {getConnection} from "../database/database";

const getUsers = async (req, res) => {
    try{
        const connection = await getConnection();
        const result = await connection.query('SELECT * FROM usuario');
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
};

const getUser = async (req, res) => {
    try{
        const {id}=req.params;
        const connection = await getConnection();
        const result = await connection.query('SELECT * FROM usuario WHERE ID_Usuario = ?', id);
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
};

const getUserLogin = async (req, res) => {
    try{
        const { id, pass } = req.params; 
        const connection = await getConnection();
        const result = await connection.query('SELECT * FROM usuario WHERE ID_Usuario = ? AND Contrasena = ?', [id, pass]);
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
};

const setUser = async (req, res) => {
    try{
        const { ID_Usuario, Nombre, Contrasena, Correo, Saldo, Fecha_Activacion} = req.body;

        if(ID_Usuario == undefined || Nombre  == undefined || Contrasena  == undefined || Correo  == undefined || Saldo  == undefined || Fecha_Activacion  == undefined){
            res.status(400).json({message:"Bad Request. Please fill all field."});
        }

        const usuario = { ID_Usuario, Nombre, Contrasena, Correo, Saldo, Fecha_Activacion};
        const connection = await getConnection();
        await connection.query("INSERT INTO usuario SET ?", usuario);
        res.json({message: "Usuario Agregado" });

    } catch(error){
        res.status(500);
        res.send(error.message);
    }
};

const deleteUser = async (req, res) => {
    try{
        const {id}=req.params;
        const connection = await getConnection();
        result = await connection.query('DELETE FROM usuario WHERE ID_Usuario = ?', id);
        res.json({message: "Usuario Eliminado" });
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
};

const updateUser = async (req, res) => {
    try{
        const {id}=req.params;
        const { ID_Usuario, Nombre, Contrasena, Correo, Saldo, Fecha_Activacion} = req.body;
        const usuario = { ID_Usuario, Nombre, Contrasena, Correo, Saldo, Fecha_Activacion};

        if(ID_Usuario == undefined || Nombre  == undefined || Contrasena  == undefined || Correo  == undefined || Saldo  == undefined || Fecha_Activacion  == undefined){
            res.status(400).json({message:"Bad Request. Please fill all field."});
        }
    
        const connection = await getConnection();
        result = await connection.query('UPDATE usuario SET ? WHERE ID_Usuario = ?', [usuario, id]);
        res.json({message: "Usuario Actualizado" });

    }catch(error){
        res.status(500);
        res.send(error.message);
    }
};


const getTransacciones = async (req, res) => {
    try{
        const connection = await getConnection();
        const result = await connection.query('SELECT * FROM transacciones');
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
};

const getTransaccion = async (req, res) => {
    try{
        const {id}=req.params;
        const connection = await getConnection();
        const result = await connection.query('SELECT * FROM transacciones WHERE ID_Movimiento = ?', id);
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
};

const getTransaccionesUser = async (req, res) => {
    try{
        const {id}=req.params;
        const connection = await getConnection();
        const result = await connection.query('SELECT * FROM transacciones WHERE Usuario_origen_id = ? OR Usuario_destino_id = ?',  [id, id]);
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
};

const setTransaccion = async (req, res) => {
    try{
        const { ID_Movimiento, Usuario_origen_id, Usuario_destino_id, Tipo_Movimiento, Fecha_Movimiento, Saldo_Anterior, Saldo_Movimiento, Saldo_Disponible} = req.body;

        if(Usuario_origen_id  == undefined || Usuario_destino_id  == undefined || Tipo_Movimiento  == undefined || Fecha_Movimiento  == undefined || Saldo_Anterior  == undefined || Saldo_Movimiento  == undefined  || Saldo_Disponible  == undefined ){
            res.status(400).json({message:"Bad Request. Please fill all field."});
        }

        const transaccion = { ID_Movimiento, Usuario_origen_id, Usuario_destino_id, Tipo_Movimiento, Fecha_Movimiento, Saldo_Anterior, Saldo_Movimiento, Saldo_Disponible};
        const connection = await getConnection();
        await connection.query("INSERT INTO transacciones SET ?", transaccion);
        res.json({message: "Transaccio Agregado" });

    } catch(error){
        res.status(500);
        res.send(error.message);
    }
};

const deleteTransaccion = async (req, res) => {
    try{
        const {id}=req.params;
        const connection = await getConnection();
        result = await connection.query('DELETE FROM transacciones WHERE ID_Movimiento = ?', id);
        res.json({message: "Usuario Eliminado" });
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
};

const updateTransaccion = async (req, res) => {
    try{
        const {id}=req.params;
        const { ID_Movimiento, Usuario_origen_id, Usuario_destino_id, Tipo_Movimiento, Fecha_Movimiento, Saldo_Anterior, Saldo_Movimiento, Saldo_Disponible} = req.body;

        if(ID_Movimiento == undefined || Usuario_origen_id  == undefined || Usuario_destino_id  == undefined || Tipo_Movimiento  == undefined || Fecha_Movimiento  == undefined || Saldo_Anterior  == undefined || Saldo_Movimiento  == undefined  || Saldo_Disponible  == undefined ){
            res.status(400).json({message:"Bad Request. Please fill all field."});
        }

        const transaccion = { ID_Movimiento, Usuario_origen_id, Usuario_destino_id, Tipo_Movimiento, Fecha_Movimiento, Saldo_Anterior, Saldo_Movimiento, Saldo_Disponible};
            
        const connection = await getConnection();
        result = await connection.query('UPDATE transacciones SET ? WHERE ID_Movimiento = ?', [transaccion, id]);
        res.json({message: "Usuario Actualizado" });

    }catch(error){
        res.status(500);
        res.send(error.message);
    }
};

export const methods={
    getUsers,
    getUser,
    setUser,
    deleteUser,
    updateUser,
    getTransacciones,
    getTransaccion,
    setTransaccion,
    deleteTransaccion,
    updateTransaccion,
    getTransaccionesUser,
    getUserLogin
}