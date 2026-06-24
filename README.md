# Fixture - Mundial 2026
Proyecto para programación III de la carrera de Desarrollo de Software

![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-6.3.5-646CFF?style=flat&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.12-06B6D4?style=flat&logo=tailwindcss)
![Material UI](https://img.shields.io/badge/Material_UI-7.3.5-007FFF?style=flat&logo=mui)
![Flask](https://img.shields.io/badge/Flask-2.x-000000?style=flat&logo=flask)
![MySQL](https://img.shields.io/badge/MySQL-8.x-4479A1?style=flat&logo=mysql)

## Descripción General

El **Fixture - Mundial 2026** es una aplicación web desarrollada con arquitectura MVC. El frontend está construido en **React con TypeScript** y consume una **API REST** provista por el backend en **Flask**. El portal permite visualizar información sobre equipos, jugadores, fixture, estadios y posiciones clasificatorias del torneo.

## Metodología de trabajo - Sprints

Para el desarrollo de este proyecto, adoptamos una metodología ágil basada en Sprints, lo que nos permitió organizar el trabajo de manera eficiente, mantener un flujo constante de entregas y adaptarnos rápidamente a los cambios.

### Herramienta usa: Jira
[Jira](https://proyecto-mundialista.atlassian.net/jira/software/projects/SCRUM/summary)

## Tecnologías Utilizadas

### Frontend

| Tecnología       | Versión  | Uso                                      |
|------------------|----------|------------------------------------------|
| React            | 18.3.1   | Biblioteca principal de UI               |
| TypeScript       | 5.x      | Tipado estático sobre JavaScript         |
| Vite             | 6.3.5    | Bundler y servidor de desarrollo         |
| Tailwind CSS     | 4.1.12   | Estilos utilitarios con clases CSS       |
| Material UI      | 7.3.5    | Componentes de interfaz preconstruidos   |
| React Router     | 7.13.0   | Navegación entre vistas sin recarga      |
| Lucide React     | 0.487.0  | Librería de íconos SVG                   |
| flagcdn.com      | —        | CDN de banderas de países por código ISO |

### Backend 

| Tecnología | Uso                                       |
|------------|-------------------------------------------|
| Flask      | Framework web en Python para la API REST  |
| MySQL      | Base de datos relacional                  |
| API REST   | Comunicación con el frontend vía HTTP     |

#### Sistema de Autentificación
Auntenficacion de la pagina

##### Login
Formulario controlado con useState. Al enviar hace fetch POST a /api/login. Si la respuesta es exitosa, llama a login() y redirige al inicio.

##### Register
Formulario con username, email, password y confirmPassword. Valida que las contraseñas coincidan. Al registrarse, inicia sesión automáticamente.

#### Rutas Protegidas
En App.tsx, si el usuario no está autenticado e intenta acceder a una sección que no sea Home, Login o Register, es redirigido automáticamente al Login. Esta protección está actualmente comentada para facilitar el desarrollo y debe descomentarse antes de la entrega final.

#### Home
Banner con imagen de fondo y overlay oscuro. Botón "Ver Fixture".
4 tarjetas: Próximo Partido, Último Resultado, Selecciones y Goleadores.
Función getFlagImg() que busca el flagCode del equipo en el array teams y genera una etiqueta img con la URL de flagcdn.com.
Sección Partido Destacado con el primer partido del array matches.

#### Groups
Muestra los 12 grupos (A-L) con sus 4 selecciones cada uno.
Cada selección muestra su bandera real desde flagcdn.com, nombre y ranking FIFA.
Al hacer clic en un equipo navega a TeamDetail.

#### TeamDetail
Vista de detalle de una selección: bandera, nombre, confederación, DT, participaciones y mejor resultado.
Si el equipo tiene jugadores, los muestra en tarjetas. Al hacer clic en un jugador muestra sus estadísticas completas.

#### Fixtures
Lista de partidos con filtros por grupo (A-L) y fase (Fase de Grupos, Dieciseisavos, Octavos, Cuartos, Semifinal, Final).
Muestra banderas reales, marcador si el partido finalizó, y badge de estado (Programado / EN VIVO / Finalizado).

#### Results
Muestra partidos con status: 'finished'.
Lógica getWinner() para resaltar al ganador y mostrar badge verde.

#### Standings
Tabla de posiciones con botones de selección de grupo.
Muestra PJ, PG, PE, PP, GF, GC, DG y PTS.
Los dos primeros de cada grupo tienen fondo verde.

#### Stadiums
Grilla de 16 estadios sede con filtro por país (México, Canadá, EE.UU.).
Cada tarjeta muestra imagen real del estadio, ciudad, capacidad y partidos programados.

#### AdminPanel
Solo visible para usuarios con role: 'admin'.
Permite ver, crear, editar y eliminar usuarios (actualmente con datos mock).

# "El fulbo despierta una gran pasión en los argentinos y obviamente en nosotros. Asique hacer este proyecto fue gratificante"

## Gracias por visitar nuestra repositorio
## Ana, Ceci, Fer, Joel, Franco y Mati
