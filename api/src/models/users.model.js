import { pool } from '../db.js'

export const createUsersTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id_user INT NOT NULL AUTO_INCREMENT,
      first_name VARCHAR(30) DEFAULT NULL,
      last_name VARCHAR(40) DEFAULT NULL,
      document INT DEFAULT NULL,
      birthdate DATE DEFAULT NULL,
      phone_number VARCHAR(20) DEFAULT NULL,
      address VARCHAR(50) DEFAULT NULL,
      PRIMARY KEY(id_user)
    )
  `
  // const newQuery = `
  //   INSERT INTO users(first_name, last_name, document, birthdate, phone_number, address) VALUES
  //   ('Ale', 'Montañez', 112233, '1999-04-13', '1199887766', 'Calle 123'),
  //   ('Wilson', 'Montañez', 110000, '2022-11-01', '1133332211', 'Calle 123'),
  //   ('Urmah', 'Montañez', 110001, '2018-06-01', '1100002211', 'Calle 123')
  // `
  try {
    await pool.query(query)
    // await pool.query(newQuery)
  } catch (error) {
    console.error(error)
  }
}