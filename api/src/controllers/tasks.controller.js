import { pool } from '../db.js'

export const getTasks = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM tasks')
    res.json(rows)
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message: 'Internal error'
    })
  }
}

export const getTask = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM tasks WHERE id_task = ?', [req.params.id])
    if (rows.length === 0) return res.status(404).json({
      message: 'Task not found'
    })
    res.json(rows[0])
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message: 'Internal error'
    })
  }
}

export const createTask = async (req, res) => {
  const { title, description, status, creation_date, expiration_date, id_user } = req.body
  try {
    const [rows] = await pool.query('INSERT INTO tasks(title, description, status, creation_date, expiration_date, id_user) VALUES (?, ?, ?, ?, ?, ?)', [title, description, status, creation_date, expiration_date, id_user])
    res.send({
      id: rows.insertId,
      title, 
      description, 
      status, 
      creation_date,
      expiration_date, 
      id_user
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message: 'Internal error'
    })
  }
}

export const updateTask = async (req, res) => {
  const { id } = req.params
  const { title, description, status, creation_date, expiration_date, id_user } = req.body
  try {
    const [result] = await pool.query('UPDATE tasks SET title = IFNULL(?, title), description = IFNULL(?, description), status = IFNULL(?, status), creation_date = IFNULL(?, creation_date), expiration_date = IFNULL(?, expiration_date), id_user = IFNULL(?, id_user) WHERE id_task = ?', [title, description, status, creation_date, expiration_date, id_user, id])
    if (result.affectedRows === 0) return res.status(404).json({
      message: 'Task not found'
    })
    const [rows] = await pool.query('SELECT * FROM tasks WHERE id_task = ?', [id])
    res.json(rows[0])
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message: 'Internal error'
    })
  }
}
export const deleteTask = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM tasks WHERE id_task = ?', [req.params.id])
    if (result.affectedRows === 0) return res.status(404).json({
      message: 'Task not found'
    })
    res.sendStatus(204)
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message: 'Internal error'
    })
  }
}