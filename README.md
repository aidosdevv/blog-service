<div>

<p>1)in terminal:  cd backend<br>
    npm i express pg cors helmet bcrypt jsonwebtoken express-rate-limit
</p>
<br>
<p>2)new terminal: cd frondend<br>
    npm i 
    npm i react-router-dom-axios
</p>

<p>CREATE TABLE users(
  id primary key,
  username VARCHAR(100),
  password TEXT)</p>

<p>
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT,
  image TEXT,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
</p>
</div>