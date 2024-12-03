import { pool } from "../db.js"

export const createTasksTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS tasks (
      id_task INT NOT NULL AUTO_INCREMENT,
      title VARCHAR(40) DEFAULT NULL,
      description VARCHAR(120) DEFAULT NULL,
      priority VARCHAR(30) DEFAULT 'Baja',
      status VARCHAR(30) DEFAULT 'Pendiente',
      creation_date DATETIME DEFAULT CURRENT_TIMESTAMP,
      expiration_date DATE DEFAULT NULL,
      id_user INT,
      PRIMARY KEY(id_task),
      FOREIGN KEY(id_user) REFERENCES users(id_user)
      ON DELETE CASCADE
      ON UPDATE CASCADE
    );
  `
    const newQuery = `
      INSERT INTO tasks(title, description, priority, status, expiration_date, id_user) VALUES
      ('Tarea 1', 'Crear bdd', 'Alta', 'Completada', '2024-11-30', 1),
      ('Tarea 2', 'Crear backend', 'Baja', 'En curso', '2024-12-01', 1),
      ('Tarea 3', 'Crear frontend', 'Media', 'Pendiente', '2024-12-15', 1),
      ('Tarea 4', 'Comer', 'Alta', 'Pendiente', '2024-11-29', 2),
      ('Tarea 5', 'Dormir', 'Media', 'Pendiente', '2024-11-28', 3)
  `

  try {
    await pool.query(query)
    // await pool.query(newQuery)
  } catch (error) {
    console.error(error)
  }
}
