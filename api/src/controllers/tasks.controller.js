import { pool } from '../db.js'

export const getTasks = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT tasks.*, CONCAT(first_name, " ", last_name) AS user_assigned FROM tasks LEFT JOIN users ON tasks.id_user = users.id_user')
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
    const [rows] = await pool.query('SELECT tasks.*, CONCAT(first_name, " ", last_name) AS user_assigned FROM tasks LEFT JOIN users ON tasks.id_user = users.id_user WHERE id_task = ?', [req.params.id])
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
  const { title, description, priority ,status, creation_date, expiration_date, id_user } = req.body
  try {
    const [rows] = await pool.query('INSERT INTO tasks(title, description, priority, status, creation_date, expiration_date, id_user) VALUES (?, ?, ?, ?, ?, ?, ?)', [title, description, priority, status, creation_date, expiration_date, id_user])
    res.send({
      id: rows.insertId,
      title, 
      description, 
      priority,
      status, 
      creation_date,
      expiration_date, 
      id_user
    })
    console.log('New task created successfully')
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message: 'Internal error'
    })
  }
}

export const updateTask = async (req, res) => {
  const { id } = req.params
  const { title, description, priority, status, creation_date, expiration_date, id_user } = req.body
  try {
    const [result] = await pool.query('UPDATE tasks SET title = IFNULL(?, title), description = IFNULL(?, description), priority = IFNULL(?, priority), status = IFNULL(?, status), creation_date = IFNULL(?, creation_date), expiration_date = IFNULL(?, expiration_date), id_user = IFNULL(?, id_user) WHERE id_task = ?', [title, description, priority, status, creation_date, expiration_date, id_user, id])
    if (result.affectedRows === 0) return res.status(404).json({
      message: 'Task not found'
    })
    const [rows] = await pool.query('SELECT * FROM tasks WHERE id_task = ?', [id])
    res.json(rows[0])
    console.log(`Task with id ${id} was updated successfully`)
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
    console.log(`Task with id ${req.params.id} was successfully deleted`)
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message: 'Internal error'
    })
  }
}