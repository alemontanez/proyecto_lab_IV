import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { createUser } from "../api/usersApi"
import '../styles/Form.css'

export default function CreateUserForm() {

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm()

  const navigate = useNavigate()

  const onSubmit = (data) => {
    const newUser = { ...data }
    reset()
    createUser(newUser)
    alert('Usuario actualizado con éxito')
    navigate('/users')
  }

  return (
    <>
      <div className="form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Crear usuario</h1>
          <label htmlFor="first_name">Nombre</label>
          <input
            placeholder="Ingrese su nombre"
            type="text"
            {
            ...register('first_name', {
              required: {
                value: true,
                message: 'El nombre no puede estar vacío'
              },
              minLength: {
                value: 2,
                message: 'El nombre debe tener al menos 2 caracteres'
              },
              maxLength: {
                value: 30,
                message: 'El nombre no debe tener más de 40 caracteres'
              }
            })
            }
          />
          {
            errors.first_name && <span>{errors.first_name.message}</span>
          }

          <label htmlFor="last_name">Apellido</label>
          <input
            placeholder="Ingrese su apellido"
            type="text"
            {
            ...register('last_name', {
              required: {
                value: true,
                message: 'El apellido no puede estar vacío'
              },
              minLength: {
                value: 2,
                message: 'El apellido debe tener al menos 2 caracteres'
              },
              maxLength: {
                value: 40,
                message: 'El apellido no debe tener más de 40 caracteres'
              }
            })
            }
          />
          {
            errors.last_name && <span>{errors.last_name.message}</span>
          }

          <label htmlFor="document">Documento</label>
          <input
            placeholder="Ingrese su documento"
            type="text"
            {
            ...register('document', {
              required: {
                value: true,
                message: 'El documento no puede estar vacío'
              },
              minLength: {
                value: 4,
                message: 'El documento debe tener al menos 4 cifras'
              },
              maxLength: {
                value: 15,
                message: 'El documento no debe tener más de 15 cifras'
              },
              pattern: {
                value: /^\d{4,15}$/,
                message: 'Documento no válido'
              }
            })
            }
          />
          {
            errors.document && <span>{errors.document.message}</span>
          }

          <label htmlFor="birthdate">Fecha de nacimiento</label>
          <input
            type="date"
            {
            ...register('birthdate', {
              required: {
                value: true,
                message: 'La fecha de nacimiento es obligatoria'
              },
              validate: (value) => {
                if (new Date(value) <= new Date('1900-01-01') || new Date(value) > new Date()) {
                  return 'Fecha no válida';
                }
                return true;
              }
            })
            }
          />
          {
            errors.birthdate && <span>{errors.birthdate.message}</span>
          }

          <label htmlFor="phone_number">Teléfono</label>
          <input
            placeholder="Ingrese su teléfono"
            type="text"
            {
            ...register('phone_number', {
              required: {
                value: true,
                message: 'El teléfono no puede estar vacío'
              },
              minLength: {
                value: 6,
                message: 'El teléfono debe tener al menos 6 cifras'
              },
              maxLength: {
                value: 15,
                message: 'El teléfono no debe tener más de 15 cifras'
              },
              pattern: {
                value: /^\d{6,15}$/,
                message: 'Teléfono no válido, ingrese solo números'
              }
            })
            }
          />
          {
            errors.phone_number && <span>{errors.phone_number.message}</span>
          }

          <label htmlFor="address">Dirección</label>
          <input
            placeholder="Ingrese su dirección"
            type="text"
            {
            ...register('address', {
              required: {
                value: true,
                message: 'La dirección no puede estar vacío'
              },
              minLength: {
                value: 4,
                message: 'La dirección debe tener al menos 4 caracteres'
              },
              maxLength: {
                value: 50,
                message: 'La dirección no debe tener más de 50 caracteres'
              }
            })
            }
          />
          {
            errors.address && <span>{errors.address.message}</span>
          }

          <button>Crear usuario</button>

        </form>
      </div>
    </>
  )
}