body, html {
  margin: 0;
  font-family: Arial, sans-serif;
  background-image: url('/background.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

.app {
  background-color: rgba(255, 255, 255, 0.8);
  min-height: 100vh;
}

.navbar {
  background-color: #2c3e50;
  color: white;
  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem;
}

.navbar a {
  color: white;
  margin-left: 20px;
  text-decoration: none;
}

.hero {
  text-align: center;
  padding: 3rem 2rem;
}

.hero h1 {
  margin-bottom: 20px;
  font-size: 2.5rem;
}

.search-box {
  margin: 20px auto;
  display: flex;
  justify-content: center;
  gap: 10px;
}

.search-box select, .search-box button {
  padding: 0.6rem;
  font-size: 1rem;
}

.results {
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.doctor-card {
  background: white;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
  margin: 10px;
  width: 250px;
  box-shadow: 0px 2px 6px rgba(0,0,0,0.1);
}
