import { pool } from '../db.js'

export const getUsers = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users')
    res.json(rows)
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message: 'Internal error'
    })
  }
}

export const getUser = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE id_user = ?', [req.params.id])
    if (rows.length === 0) return res.status(404).json({
      message: 'User not found'
    })
    res.json(rows[0])
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message: 'Internal error'
    })
  }
}

export const createUser = async (req, res) => {
  const { first_name, last_name, document, birthdate, phone_number, address } = req.body
  try {
    const [rows] = await pool.query('INSERT INTO users(first_name, last_name, document, birthdate, phone_number, address) VALUES (?, ?, ?, ?, ?, ?)', [first_name, last_name, document, birthdate, phone_number, address])
    res.send({
      id: rows.insertId,
      first_name, 
      last_name, 
      document, 
      birthdate, 
      phone_number, 
      address
    })
    console.log('New user created successfully')
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message: 'Internal error'
    })
  }
}

export const updateUser = async (req, res) => {
  const { id } = req.params
  const { first_name, last_name, document, birthdate, phone_number, address } = req.body
  try {
    const [result] = await pool.query('UPDATE users SET first_name = IFNULL(?, first_name), last_name = IFNULL(?, last_name), document = IFNULL(?, document), birthdate = IFNULL(?, birthdate), phone_number = IFNULL(?, phone_number), address = IFNULL(?, address) WHERE id_user = ?', [first_name, last_name, document, birthdate, phone_number, address, id])
    if (result.affectedRows === 0) return res.status(404).json({
      message: 'User not found'
    })
    const [rows] = await pool.query('SELECT * FROM users WHERE id_user = ?', [id])
    res.json(rows[0])
    console.log(`User with id ${id} was updated successfully`)
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message: 'Internal error'
    })
  }
}

export const deleteUser = async (req, res) => {
  const { id } = req.params
  try {
    const [result] = await pool.query('DELETE FROM users WHERE id_user = ?', [id])
    if (result.affectedRows === 0) return res.status(404).json({
      message: 'User not found'
    })
    res.sendStatus(204)
    console.log(`User with id ${id} was successfully deleted`)
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message: 'Internal error'
    })
  }
}

export const getUserNames = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id_user, CONCAT(first_name, " ", last_name) AS name_user FROM users')
    res.json(rows)
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message: 'Internal error'
    })
  }
}